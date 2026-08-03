/**
 * WUFPA-018 — SiteHeader / PrimaryNav interaction.
 *
 * Two independent behaviours, each progressive enhancement over markup that
 * is already a real <nav> of real <a> elements. Mobile navigation is a
 * separate concern, handled by its own component and script
 * (MobileNav.astro / src/scripts/mobile-nav.ts, WUFPA-019).
 *
 * 1. Header compact-on-scroll. An IntersectionObserver watching a 1px
 *    sentinel at the top of <body> — never a scroll event listener
 *    (docs/14 section 11.3 and src/scripts/reveal.ts's own precedent: "the
 *    prototype's unthrottled scroll listener ran on every scroll event").
 *
 * 2. Mega-panel triggers (About, Programmes). Opens on click/Enter/Space
 *    AND on pointer hover — hover must never be the ONLY route in, which is
 *    the X28 class of failure docs/08 section 3 names explicitly. Escape
 *    closes and returns focus to the trigger; focus leaving the panel
 *    closes it; opening one panel closes any other that is open.
 */

let headerObserver: IntersectionObserver | null = null;

function initCompactHeader(): void {
  headerObserver?.disconnect();
  headerObserver = null;

  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const sentinel = document.getElementById('scroll-sentinel');
  if (!header || !sentinel || !('IntersectionObserver' in window)) return;

  headerObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      header.classList.toggle('is-compact', !entry.isIntersecting);
    },
    { rootMargin: '-80px 0px 0px 0px', threshold: 0 },
  );

  headerObserver.observe(sentinel);
}

let panelTeardown: (() => void) | null = null;

function initPanels(): void {
  panelTeardown?.();
  panelTeardown = null;

  const triggers = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-nav-trigger]'),
  );
  if (triggers.length === 0) return;

  function panelFor(trigger: HTMLButtonElement): HTMLElement | null {
    const id = trigger.getAttribute('aria-controls');
    return id ? document.getElementById(id) : null;
  }

  /* `hidden` stays the accessibility switch; `.is-open` only drives the
     transition. They are set in opposite orders on the way in and the way out
     because a transition needs the element rendered before it can animate, and
     needs to finish animating before it is un-rendered. */
  const OPEN_CLASS = 'is-open';

  function closePanel(trigger: HTMLButtonElement): void {
    const panel = panelFor(trigger);
    trigger.setAttribute('aria-expanded', 'false');
    if (!panel) return;

    panel.classList.remove(OPEN_CLASS);

    /* Hide only once the fade-out has run. Under reduced motion — where the
       transition is `none` — transitionend never fires, so the duration is
       read back from the element and a zero-length one hides immediately. */
    const duration = Number.parseFloat(getComputedStyle(panel).transitionDuration) || 0;
    if (duration === 0) {
      panel.setAttribute('hidden', '');
      return;
    }

    panel.addEventListener(
      'transitionend',
      () => {
        // Re-check: the panel may have been reopened during the fade.
        if (!panel.classList.contains(OPEN_CLASS)) panel.setAttribute('hidden', '');
      },
      { once: true },
    );
  }

  function openPanel(trigger: HTMLButtonElement): void {
    // Only one panel open at a time.
    for (const other of triggers) {
      if (other !== trigger) closePanel(other);
    }
    const panel = panelFor(trigger);
    trigger.setAttribute('aria-expanded', 'true');
    if (!panel) return;

    panel.removeAttribute('hidden');
    /* Next frame, so the browser has painted the hidden-but-rendered start
       state and has something to transition FROM. Setting both in the same
       frame produces no animation at all. */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => panel.classList.add(OPEN_CLASS));
    });
  }

  function isOpen(trigger: HTMLButtonElement): boolean {
    return trigger.getAttribute('aria-expanded') === 'true';
  }

  for (const trigger of triggers) {
    trigger.addEventListener('click', () => {
      if (isOpen(trigger)) closePanel(trigger);
      else openPanel(trigger);
    });

    // Hover is an ADDITIONAL route, not the only one — click/Enter/Space
    // above already work without this.
    const item = trigger.closest('li');
    item?.addEventListener('mouseenter', () => openPanel(trigger));
    item?.addEventListener('mouseleave', () => closePanel(trigger));

    // Escape closes regardless of whether focus is on the trigger itself or
    // has moved into the panel (tabbed onto one of its links) — listening
    // only on the trigger would miss the second case.
    const panel = panelFor(trigger);
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen(trigger)) {
        closePanel(trigger);
        trigger.focus();
      }
    };
    trigger.addEventListener('keydown', onEscape);
    panel?.addEventListener('keydown', onEscape);
  }

  // Focus leaving every trigger and every panel closes whichever is open.
  const onFocusIn = (event: FocusEvent) => {
    const target = event.target as Node;
    for (const trigger of triggers) {
      const panel = panelFor(trigger);
      const withinTrigger = trigger.contains(target);
      const withinPanel = panel?.contains(target) ?? false;
      if (!withinTrigger && !withinPanel && isOpen(trigger)) {
        closePanel(trigger);
      }
    }
  };
  document.addEventListener('focusin', onFocusIn);

  /* This one listener is on `document`, which survives a view transition —
     the triggers it closes over do not. Removed before the next page wires
     its own, or each navigation would leave another copy scanning a stale
     set of triggers on every focus change. */
  panelTeardown = () => document.removeEventListener('focusin', onFocusIn);
}

/* THE COST OF PERSISTING THE HEADER. `transition:persist` keeps the header's
   DOM node across navigations, which is what stops it flashing and keeps its
   listeners alive — but it also means the `aria-current="page"` markers Astro
   computed on the server for the FIRST page are still there on the tenth. The
   "you are here" cue would point at wherever the visitor entered the site, for
   the rest of their session, in the accessibility tree as well as visually.
 *
 * So it is recomputed here, using the same rule PrimaryNav.astro and
 * MobileNav.astro use at build time: exact match for "/", prefix match
 * otherwise. Sub-links inside the mega-panels match exactly only — a panel
 * link to /about/history/ should not light up while reading /about/legal/. */
function syncCurrentPage(): void {
  const path = window.location.pathname;

  const isSection = (href: string): boolean =>
    href === '/' ? path === '/' : path === href || path.startsWith(href);

  for (const link of document.querySelectorAll<HTMLElement>('[data-nav-current]')) {
    const href = link.getAttribute('href') ?? link.dataset.navHref ?? '';
    const exact = link.dataset.navCurrent === 'exact';
    const active = exact ? path === href : isSection(href);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
}

function init(): void {
  syncCurrentPage();
  initCompactHeader();
  initPanels();
}

/* Fires on the initial load and after every view transition — see the note in
   reveal.ts. Both halves of `init` disconnect their previous observers and
   listeners first, so re-running is safe. */
document.addEventListener('astro:page-load', init);

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

function initCompactHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const sentinel = document.getElementById('scroll-sentinel');
  if (!header || !sentinel || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      header.classList.toggle('is-compact', !entry.isIntersecting);
    },
    { rootMargin: '-80px 0px 0px 0px', threshold: 0 },
  );

  observer.observe(sentinel);
}

function initPanels(): void {
  const triggers = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-nav-trigger]'),
  );
  if (triggers.length === 0) return;

  function panelFor(trigger: HTMLButtonElement): HTMLElement | null {
    const id = trigger.getAttribute('aria-controls');
    return id ? document.getElementById(id) : null;
  }

  function closePanel(trigger: HTMLButtonElement): void {
    const panel = panelFor(trigger);
    trigger.setAttribute('aria-expanded', 'false');
    panel?.setAttribute('hidden', '');
  }

  function openPanel(trigger: HTMLButtonElement): void {
    // Only one panel open at a time.
    for (const other of triggers) {
      if (other !== trigger) closePanel(other);
    }
    const panel = panelFor(trigger);
    trigger.setAttribute('aria-expanded', 'true');
    panel?.removeAttribute('hidden');
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
  document.addEventListener('focusin', (event) => {
    const target = event.target as Node;
    for (const trigger of triggers) {
      const panel = panelFor(trigger);
      const withinTrigger = trigger.contains(target);
      const withinPanel = panel?.contains(target) ?? false;
      if (!withinTrigger && !withinPanel && isOpen(trigger)) {
        closePanel(trigger);
      }
    }
  });
}

function init(): void {
  initCompactHeader();
  initPanels();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

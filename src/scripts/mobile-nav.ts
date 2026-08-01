/**
 * WUFPA-019 — MobileNav: trigger toggle, focus trap, scroll lock, Escape.
 *
 * PROGRESSIVE ENHANCEMENT, explicitly staged — matching src/scripts/
 * reveal.ts's own pattern ("opts in to hiding... only AFTER successfully
 * attaching"). The panel ships visible, in-flow and without dialog
 * semantics; the trigger ships `hidden`. Only once this script has found
 * BOTH elements does it:
 *
 *   1. promote the panel to a real dialog (role, aria-modal, hidden), and
 *   2. reveal the trigger, and
 *   3. add `.js-mobile-nav` to <html>, which is what MobileNav.astro's CSS
 *      gates the full-screen overlay styling on.
 *
 * If this script fails to load, throws, or the browser is one that never
 * runs it, the visitor still gets the complete navigation — just as a plain
 * always-visible list rather than a toggleable dialog. That is strictly
 * better than a hamburger trigger that opens nothing, which is the exact
 * X22 failure this component exists to fix (docs/08 section 4).
 */

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function initMobileNav(): void {
  const trigger = document.querySelector<HTMLButtonElement>('[data-mobile-trigger]');
  const panel = document.querySelector<HTMLElement>('[data-mobile-panel]');
  const closeButton = document.querySelector<HTMLButtonElement>('[data-mobile-close]');
  const iconOpen = document.querySelector<HTMLElement>('[data-mobile-icon-open]');
  const iconClose = document.querySelector<HTMLElement>('[data-mobile-icon-close]');
  const label = document.querySelector<HTMLElement>('[data-mobile-trigger-label]');
  if (!trigger || !panel) return;

  // Promote panel → dialog and reveal the trigger. Everything after this
  // point assumes the promoted state.
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('hidden', '');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.removeAttribute('hidden');
  closeButton?.removeAttribute('hidden');
  document.documentElement.classList.add('js-mobile-nav');

  let lastFocused: HTMLElement | null = null;

  function focusableIn(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null, // visible only
    );
  }

  // Locks background scroll WITHOUT the layout shift that `overflow: hidden`
  // alone causes when the scrollbar disappears and page content reflows
  // sideways into the space it occupied — compensated with padding equal to
  // the scrollbar's own width (docs/08 section 4).
  function lockScroll(): void {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  function unlockScroll(): void {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  function trapFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    const focusable = focusableIn(panel as HTMLElement);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  function onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    trapFocus(event);
  }

  function setOpen(open: boolean): void {
    trigger?.setAttribute('aria-expanded', String(open));
    iconOpen?.toggleAttribute('hidden', open);
    iconClose?.toggleAttribute('hidden', !open);
    if (label) label.textContent = open ? 'Close menu' : 'Open menu';

    // The open panel is `position: fixed; inset: 0` at --z-modal, which
    // paints over the sticky header (--z-sticky) the trigger lives in — so
    // the trigger is still in the DOM and still reachable by keyboard, but
    // is not visible or tappable while the panel covers it. A first version
    // of this component left it visible-but-covered, which meant there was
    // no way to close the menu by touch once opened (caught by testing the
    // real rendered page, not the built HTML). Hiding it while open avoids
    // two overlapping "close" controls existing at once; the panel's own
    // `data-mobile-close` button takes over that role for as long as the
    // trigger is unreachable.
    trigger?.toggleAttribute('hidden', open);

    if (open) {
      lastFocused = document.activeElement as HTMLElement;
      panel?.removeAttribute('hidden');
      lockScroll();
      document.addEventListener('keydown', onKeydown);

      // Move focus into the dialog. The close button, not the panel itself
      // or the first link — a screen-reader or keyboard user should land
      // somewhere that both orients them (this is the dialog they just
      // opened) and lets them leave immediately without tabbing through
      // the whole menu first.
      closeButton?.focus();
    } else {
      panel?.setAttribute('hidden', '');
      unlockScroll();
      document.removeEventListener('keydown', onKeydown);
      (lastFocused ?? trigger)?.focus();
    }
  }

  trigger.addEventListener('click', () => {
    setOpen(trigger.getAttribute('aria-expanded') !== 'true');
  });

  closeButton?.addEventListener('click', () => setOpen(false));

  // Selecting a nav link only unwinds the open state via navigation — which
  // never fires for a link to the page already showing (e.g. tapping "About
  // WUFPA" while on /about/), leaving the dialog open, scroll locked and
  // focus trapped with no route back except Escape or the close button.
  // Closing explicitly on every link click, same-page or not, is what the
  // "close after selecting a navigation link" requirement actually needs.
  panel.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]');
    if (link) {
      setOpen(false);
      return;
    }
    // The dialog is intentionally full-bleed (docs/08 section 4) — there is
    // no page visible behind it to tap. Its own unoccupied background (i.e.
    // a click that lands on the panel or scroll region themselves, not on
    // any interactive content inside them) stands in for the "tap outside"
    // gesture a backdrop would otherwise provide.
    if (target === panel || target === (panel.querySelector('[data-mobile-scroll]') as Node)) {
      setOpen(false);
    }
  });

  // A page restored from bfcache (browser Back/Forward) can resurrect this
  // module's closure with the dialog mid-open: `overflow: hidden` and the
  // Escape listener from before the navigation are still live, but the user
  // has no way to invoke `setOpen` again because the click that navigated
  // away never ran it. Forcing closed on every restore guarantees scroll and
  // focus are never left in a locked state the user can't escape.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) setOpen(false);
  });

  // Crossing into the desktop layout (PrimaryNav's own --bp-lg, 64rem) while
  // this dialog is open would otherwise leave it fixed, full-screen and
  // scroll-locked behind/over the now-visible desktop nav, with no control
  // left on screen able to close it — a resize-triggered trap.
  const desktopQuery = window.matchMedia('(min-width: 64rem)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileNav, { once: true });
} else {
  initMobileNav();
}

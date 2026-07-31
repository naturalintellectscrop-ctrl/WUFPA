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

    if (open) {
      lastFocused = document.activeElement as HTMLElement;
      panel?.removeAttribute('hidden');
      lockScroll();
      document.addEventListener('keydown', onKeydown);

      // Move focus into the dialog. The first link, not the panel itself —
      // a screen-reader user hears the dialog's aria-label on the way in,
      // then lands directly on something operable.
      const focusable = focusableIn(panel as HTMLElement);
      focusable[0]?.focus();
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileNav, { once: true });
} else {
  initMobileNav();
}

/**
 * WUFPA-068 — Scroll reveal as PROGRESSIVE ENHANCEMENT.
 *
 * Content is visible by default. This script opts in to the animation by
 * adding `.js-reveal` to <html> — and only AFTER its IntersectionObserver has
 * successfully attached. If the script fails to load, throws, or the browser
 * lacks IntersectionObserver, nothing is ever hidden.
 *
 * The prototype did the inverse: 21 elements were set to opacity:0 in CSS and
 * revealed by JavaScript, leaving the page blank below the hero whenever the
 * script failed, was blocked, or had simply not run yet on a slow connection.
 * For this audience that is most of the time.
 *
 * IntersectionObserver, not a scroll handler — the prototype's unthrottled
 * scroll listener ran on every scroll event.
 */

const REVEAL_SELECTOR = '.reveal';

export function initReveal(): void {
  // Respect the user's setting before doing anything at all.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  if (targets.length === 0) return;

  // Only now is it safe to let CSS hide anything.
  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        // Reveal once, then stop observing. Nothing re-animates on scroll-up.
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );

  targets.forEach((el, index) => {
    // Stagger, capped at 5 items so a long list never becomes a queue.
    if (index < 5) {
      el.style.transitionDelay = `${index * 60}ms`;
    }
    observer.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal, { once: true });
} else {
  initReveal();
}

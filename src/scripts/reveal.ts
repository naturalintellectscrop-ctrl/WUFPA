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

/**
 * Reads the --stagger token instead of hard-coding its value.
 *
 * WUFPA-067 defined --stagger: 60ms and this file then wrote `60` by hand, so
 * the token had no consumer and changing it would have changed nothing — the
 * exact drift the token system exists to prevent (R6).
 */
function staggerMs(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--stagger').trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? (raw.endsWith('ms') ? parsed : parsed * 1000) : 60;
}

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

  /* Stagger is counted WITHIN A PARENT, not across the document.
     A global index gives the fourth band on a long page a 180ms delay it has
     not earned — it enters the viewport alone, seconds after the first, and
     the delay reads as lag rather than as sequence. Staggering only among
     siblings means the delay expresses the one thing it should: that these
     items arrived together and are related. That is motion communicating
     hierarchy (docs/21 section 5) rather than decorating a scroll. */
  const step = staggerMs();
  const seenPerParent = new Map<Element, number>();

  targets.forEach((el) => {
    const parent = el.parentElement;
    if (parent) {
      const index = seenPerParent.get(parent) ?? 0;
      seenPerParent.set(parent, index + 1);
      // Capped at 5 so a long list never becomes a queue.
      if (index > 0 && index < 5) {
        const delay = `${index * step}ms`;
        /* `reveal--letter` transitions its CHILDREN, not itself — the clip
           lives on the wrapper so the type can rise out from under it. Setting
           the delay on the wrapper would therefore delay nothing at all. */
        if (el.classList.contains('reveal--letter')) {
          for (const child of Array.from(el.children)) {
            (child as HTMLElement).style.transitionDelay = delay;
          }
        } else {
          el.style.transitionDelay = delay;
        }
      }
    }
    observer.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal, { once: true });
} else {
  initReveal();
}

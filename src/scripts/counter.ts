/**
 * Count-up for Ledger's genuinely numeric figures.
 *
 * PROGRESSIVE ENHANCEMENT, same contract as reveal.ts: the server-rendered
 * figure is already "0" (see Ledger.astro), so if this script fails to load
 * or throws, the fix is worse than the problem it causes only if nothing
 * else corrects it. It does not: reveal.ts still adds `.is-visible` to
 * `.ledger`'s ancestor `.reveal` wrappers independently, but the raw digit
 * has no fallback of its own here — so this script sets the true value
 * immediately, synchronously, before doing anything animated, and the
 * animation only ever improves on that baseline.
 *
 * Counts once, when the ledger scrolls into view, using the same
 * IntersectionObserver pattern as reveal.ts rather than a duplicate one.
 * `prefers-reduced-motion` skips the animation and jumps straight to the
 * final figure, which is the one thing Ledger's original "no count-up"
 * comment was actually protecting against: a number a reader with motion
 * sensitivity cannot ever see settle.
 */

const COUNT_MS = 1400;

function animateFigure(el: HTMLElement, target: number, reduceMotion: boolean): void {
  if (reduceMotion || target === 0) {
    el.textContent = String(target);
    return;
  }

  const start = performance.now();
  const startValue = 0;

  function tick(now: number): void {
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / COUNT_MS);
    // Ease-out cubic: fast at first, settling into the final value rather
    // than arriving at a constant rate, which reads as mechanical.
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(startValue + (target - startValue) * eased);
    el.textContent = String(value);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = String(target);
  }

  requestAnimationFrame(tick);
}

let observer: IntersectionObserver | null = null;

export function initCounters(): void {
  observer?.disconnect();
  observer = null;

  const targets = document.querySelectorAll<HTMLElement>('[data-ledger-figure]');
  if (targets.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window)) {
    // No observer available: show the real values immediately rather than
    // leave every figure reading "0" forever.
    targets.forEach((el) => {
      const target = Number.parseInt(el.dataset.ledgerFigure ?? '0', 10);
      el.textContent = String(target);
    });
    return;
  }

  const active = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const target = Number.parseInt(el.dataset.ledgerFigure ?? '0', 10);
        animateFigure(el, target, reduceMotion);
        active.unobserve(el);
      }
    },
    { threshold: 0.4 },
  );
  observer = active;

  targets.forEach((el) => active.observe(el));
}

document.addEventListener('astro:page-load', initCounters);

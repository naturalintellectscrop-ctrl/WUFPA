/**
 * Scroll-linked parallax — the depth cue this site did not have.
 *
 * Every piece of motion on WUFPA until now fired once on entry and then
 * stopped: reveal.ts fades a band in and unobserves it. Nothing responded to
 * scrolling as a continuous act, which is the difference between a page that
 * animates and a page that feels like it has depth.
 *
 * DELIBERATELY SMALL. Parallax reads as cinematic at a few percent and as a
 * broken page at twenty. The default travel is 6% of the element's own height.
 *
 * NO LIBRARY. This is a single lerp against getBoundingClientRect on a passive
 * listener with a requestAnimationFrame throttle. The site's JavaScript budget
 * is 100 KB compressed and currently sits near 3 KB; pulling in a motion
 * library to compute one interpolation would spend a meaningful fraction of
 * that on arithmetic three lines long.
 *
 * UNDER REDUCED MOTION THIS IS NOT A SMALLER EFFECT, IT IS NO EFFECT. No
 * listener is attached and no transform is ever written. Scroll-linked
 * movement is precisely the vestibular trigger that setting exists to
 * suppress — halving the distance would still move the image.
 *
 * The inner element is scaled to cover its own travel. A parallaxed image with
 * no overscale drags a visible gap in behind it as it moves.
 */

const SELECTOR = '[data-parallax]';

/* Torn down and rebuilt on every view transition. These are window- and
   document-level listeners, so without an explicit teardown each navigation
   would add another set on top of the last — by the fifth page five copies of
   the same scroll handler would run on every frame. */
let teardown: (() => void) | null = null;

export function initParallax(): void {
  teardown?.();
  teardown = null;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const wrappers = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  if (wrappers.length === 0) return;

  /* Each wrapper's first element child is what moves. The image itself is
     nested inside <picture>, so transforming the child rather than the image
     keeps this working regardless of how the markup nests. */
  const targets = wrappers
    .map((wrapper) => {
      const inner = wrapper.firstElementChild;
      if (!(inner instanceof HTMLElement)) return null;
      const raw = Number.parseFloat(wrapper.dataset.parallax ?? '');
      const offset = Number.isFinite(raw) && raw > 0 ? raw : 6;
      inner.style.willChange = 'transform';
      return { wrapper, inner, offset, scale: 1 + offset / 50 };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  if (targets.length === 0) return;

  /* Only elements actually on screen are measured. Without this every
     parallaxed element on a long page runs its math on every frame, including
     the ones several screens away. */
  const visible = new Set<HTMLElement>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target as HTMLElement);
        else visible.delete(entry.target as HTMLElement);
      }
      update();
    },
    { rootMargin: '10% 0px' },
  );

  for (const { wrapper } of targets) observer.observe(wrapper);

  let queued = false;

  function update(): void {
    queued = false;
    const viewport = window.innerHeight;

    for (const { wrapper, inner, offset, scale } of targets) {
      if (!visible.has(wrapper)) continue;

      const rect = wrapper.getBoundingClientRect();
      /* 0 as the wrapper's top reaches the viewport's bottom, 1 as its bottom
         reaches the viewport's top. */
      const total = viewport + rect.height;
      const traveled = viewport - rect.top;
      const progress = Math.min(1, Math.max(0, traveled / total));
      const y = -offset + progress * offset * 2;
      inner.style.transform = `translate3d(0, ${y.toFixed(3)}%, 0) scale(${scale})`;
    }
  }

  function onScroll(): void {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  teardown = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    observer.disconnect();
    /* The transform is left as-is deliberately: these elements are about to be
       replaced by the incoming page's own, and clearing it would make the
       outgoing frame jump during the transition. */
  };
}

/* Re-attaches after every view transition — see the note in reveal.ts. The
   listeners this adds are removed by the teardown below before each
   navigation, so they never accumulate across pages. */
document.addEventListener('astro:page-load', initParallax);

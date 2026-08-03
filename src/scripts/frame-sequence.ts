/**
 * FrameSequence autoplay — a continuous forward marquee, mirrored by a row of
 * dots, that pauses on hover, focus-within, or a manual toggle.
 *
 * TRUE INFINITE SCROLL, NOT WRAP-AROUND. An earlier version advanced frame by
 * frame and, on reaching the last one, jumped `scrollLeft` back to zero —
 * which is a visible reset, not a loop: the strip visibly snapped backward
 * once every cycle, which reads as the animation stopping and restarting, not
 * as continuous movement. FrameSequence.astro now renders the frames twice
 * (the second copy `aria-hidden`, `tabindex="-1"`, invisible to assistive
 * tech and the tab order). This script scrolls forward through both copies on
 * a `requestAnimationFrame` loop and, the instant it crosses into the second
 * copy, silently subtracts one copy's width from `scrollLeft` — landing on
 * the pixel-identical position in the first copy with no seam and no visible
 * jump, so the strip appears to scroll forever in one direction.
 *
 * PROGRESSIVE ENHANCEMENT, same contract as reveal.ts and mobile-nav.ts: the
 * pause/play button and the dots both ship `hidden` in the markup, and stay
 * that way if this script fails to load, throws, or `prefers-reduced-motion`
 * is set. With no JavaScript, the strip is exactly what it always was: a
 * plain scroll-snap region, nothing moving on its own, WCAG 2.2.2 satisfied
 * by there being nothing to satisfy it against.
 *
 * With JavaScript on, WCAG 2.2.2 is satisfied three independent ways rather
 * than one: the pause/play button is real, focusable, and always visible
 * (never a hover-only reveal a touch user could not reach); the marquee also
 * pauses on `:hover` and `:focus-within`; and it never starts at all when the
 * user has asked for reduced motion.
 */

/** Pixels per second. Slow enough to read captions in passing, never a blur. */
const SPEED_PX_PER_S = 36;

let teardown: (() => void) | null = null;

function initFrameSequences(): void {
  teardown?.();
  teardown = null;

  const wraps = document.querySelectorAll<HTMLElement>('[data-frame-sequence]');
  if (wraps.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const teardowns: (() => void)[] = [];

  wraps.forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-strip-track]');
    const cells = Array.from(wrap.querySelectorAll<HTMLElement>('[data-frame-cell]'));
    const originalOl = wrap.querySelector<HTMLElement>('[data-strip-original]');
    const cloneOl = wrap.querySelector<HTMLElement>('[data-strip-clone]');
    const playPause = wrap.querySelector<HTMLButtonElement>('[data-strip-playpause]');
    const dotsList = wrap.querySelector<HTMLElement>('[data-strip-dots]');
    const dots = Array.from(wrap.querySelectorAll<HTMLButtonElement>('[data-strip-dot]'));
    const iconPause = wrap.querySelector<HTMLElement>('[data-strip-icon-pause]');
    const iconPlay = wrap.querySelector<HTMLElement>('[data-strip-icon-play]');
    const label = wrap.querySelector<HTMLElement>('[data-strip-playpause-label]');
    if (!track || !originalOl || !cloneOl || cells.length === 0 || !playPause || !dotsList) return;

    playPause.removeAttribute('hidden');
    dotsList.removeAttribute('hidden');

    // The width of one full copy of the track, gap to the clone included —
    // this is exactly how far `scrollLeft` travels before the loop point.
    function loopWidth(): number {
      return cloneOl.offsetLeft - originalOl.offsetLeft;
    }

    let playing = !prefersReducedMotion;
    let rafId: number | null = null;
    let lastTime: number | null = null;
    // Autoplay pauses when the pointer or focus is inside the strip. `holds`
    // counts both reasons independently so hovering off while still focused
    // (or vice versa) does not resume a marquee the other condition still
    // wants paused.
    let holds = 0;
    let currentDot = 0;

    function nearestCellIndex(): number {
      const trackLeft = track!.getBoundingClientRect().left;
      let closest = 0;
      let closestDistance = Infinity;
      cells.forEach((cell, i) => {
        const distance = Math.abs(cell.getBoundingClientRect().left - trackLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      });
      return closest;
    }

    function setActiveDot(index: number): void {
      if (index === currentDot) return;
      currentDot = index;
      dots.forEach((dot, i) => {
        if (i === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }

    function frame(time: number): void {
      if (lastTime === null) lastTime = time;
      const deltaMs = time - lastTime;
      lastTime = time;

      if (playing && holds === 0 && track) {
        track.scrollLeft += (SPEED_PX_PER_S * deltaMs) / 1000;
        const width = loopWidth();
        if (width > 0 && track.scrollLeft >= width) {
          track.scrollLeft -= width;
        }
        setActiveDot(nearestCellIndex());
      }

      rafId = requestAnimationFrame(frame);
    }

    function start(): void {
      if (rafId !== null) return;
      lastTime = null;
      rafId = requestAnimationFrame(frame);
    }

    function stop(): void {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function setPlaying(next: boolean): void {
      playing = next;
      // Scroll-snap fights continuous programmatic scrolling (see the CSS
      // comment on .strip.is-marquee), so it is only switched off while the
      // marquee is actually moving, and restored the moment it pauses so a
      // reader who takes over with touch or trackpad gets the normal
      // snap-to-frame behaviour back.
      track?.classList.toggle('is-marquee', playing);
      iconPause?.toggleAttribute('hidden', !playing);
      iconPlay?.toggleAttribute('hidden', playing);
      playPause?.setAttribute('aria-pressed', String(!playing));
      if (label) label.textContent = playing ? 'Pause auto-scroll' : 'Resume auto-scroll';
    }

    function addHold(): void {
      holds += 1;
    }

    function releaseHold(): void {
      holds = Math.max(0, holds - 1);
    }

    playPause.addEventListener('click', () => setPlaying(!playing));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const cell = cells[i];
        if (cell && track) {
          const trackRect = track.getBoundingClientRect();
          const cellRect = cell.getBoundingClientRect();
          track.scrollTo({
            left: cellRect.left - trackRect.left + track.scrollLeft,
            behavior: 'smooth',
          });
        }
        setActiveDot(i);
        // Selecting a dot is an explicit request to look at that frame —
        // resuming the marquee immediately would move it again before the
        // reader has had a chance to. Treated as a manual pause, same as the
        // button.
        setPlaying(false);
      });
    });

    wrap.addEventListener('pointerenter', addHold);
    wrap.addEventListener('pointerleave', releaseHold);
    wrap.addEventListener('focusin', addHold);
    wrap.addEventListener('focusout', (event) => {
      // Only release once focus has actually left the whole strip, not moved
      // from one dot to the next inside it.
      if (!wrap.contains(event.relatedTarget as Node)) releaseHold();
    });

    setActiveDot(0);
    setPlaying(playing);
    start();

    teardowns.push(stop);
  });

  teardown = () => {
    teardowns.forEach((fn) => fn());
  };
}

document.addEventListener('astro:page-load', initFrameSequences);

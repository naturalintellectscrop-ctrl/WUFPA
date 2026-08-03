/**
 * FrameSequence autoplay — advances the strip on a timer, mirrors position
 * with a row of dots, and pauses on hover, focus-within, or a manual toggle.
 *
 * PROGRESSIVE ENHANCEMENT, same contract as reveal.ts and mobile-nav.ts: the
 * pause/play button and the dots both ship `hidden` in the markup, and stay
 * that way if this script fails to load, throws, or `prefers-reduced-motion`
 * is set. With no JavaScript, the strip is exactly what it always was — a
 * plain scroll-snap region, nothing moving on its own, WCAG 2.2.2 satisfied
 * by there being nothing to satisfy it against.
 *
 * With JavaScript on, WCAG 2.2.2 is satisfied three independent ways rather
 * than one: the pause/play button is real, focusable, and always visible
 * (never a hover-only reveal a touch user could not reach); the timer also
 * pauses on `:hover` and `:focus-within`; and it never starts at all when the
 * user has asked for reduced motion.
 */

const ADVANCE_MS = 4200;

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
    const playPause = wrap.querySelector<HTMLButtonElement>('[data-strip-playpause]');
    const dotsList = wrap.querySelector<HTMLElement>('[data-strip-dots]');
    const dots = Array.from(wrap.querySelectorAll<HTMLButtonElement>('[data-strip-dot]'));
    const iconPause = wrap.querySelector<HTMLElement>('[data-strip-icon-pause]');
    const iconPlay = wrap.querySelector<HTMLElement>('[data-strip-icon-play]');
    const label = wrap.querySelector<HTMLElement>('[data-strip-playpause-label]');
    if (!track || cells.length === 0 || !playPause || !dotsList) return;

    // Reveal the controls only now that both the elements and the browser
    // support what they need — same "only after it can actually work"
    // contract MobileNav's trigger uses.
    playPause.removeAttribute('hidden');
    dotsList.removeAttribute('hidden');

    let current = 0;
    let playing = !prefersReducedMotion;
    let timer: ReturnType<typeof setInterval> | null = null;
    // Autoplay pauses when the pointer or focus is inside the strip.
    // `holds` counts BOTH reasons independently so hovering off while still
    // focused (or vice versa) does not resume a timer the other condition
    // still wants paused.
    let holds = 0;

    function setActiveDot(index: number): void {
      dots.forEach((dot, i) => {
        dot.toggleAttribute('aria-current', i === index);
        if (i === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }

    function scrollToIndex(index: number, behavior: ScrollBehavior = 'smooth'): void {
      const cell = cells[index];
      if (!cell || !track) return;
      const trackRect = track.getBoundingClientRect();
      const cellRect = cell.getBoundingClientRect();
      const offset = cellRect.left - trackRect.left + track.scrollLeft;
      track.scrollTo({ left: offset, behavior });
    }

    function goTo(index: number, behavior: ScrollBehavior = 'smooth'): void {
      current = ((index % cells.length) + cells.length) % cells.length;
      scrollToIndex(current, behavior);
      setActiveDot(current);
    }

    function setPlaying(next: boolean): void {
      playing = next;
      iconPause?.toggleAttribute('hidden', !playing);
      iconPlay?.toggleAttribute('hidden', playing);
      playPause?.setAttribute('aria-pressed', String(!playing));
      if (label) label.textContent = playing ? 'Pause auto-scroll' : 'Resume auto-scroll';
      if (playing) startTimer();
      else stopTimer();
    }

    function startTimer(): void {
      stopTimer();
      if (!playing || holds > 0) return;
      timer = setInterval(() => goTo(current + 1), ADVANCE_MS);
    }

    function stopTimer(): void {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    }

    function addHold(): void {
      holds += 1;
      stopTimer();
    }

    function releaseHold(): void {
      holds = Math.max(0, holds - 1);
      if (holds === 0) startTimer();
    }

    playPause.addEventListener('click', () => setPlaying(!playing));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goTo(i);
        // Selecting a dot is an explicit request to look at that frame —
        // resuming the timer immediately would move it again before the
        // reader has had a chance to. Treated as a manual pause, same as
        // the button.
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

    // Manual scrolling (touch, trackpad, arrow keys) updates which dot is lit
    // without fighting the reader — it does not resume or pause the timer by
    // itself, it only keeps the dots honest about where the strip actually is.
    let scrollSettle: ReturnType<typeof setTimeout> | null = null;
    track.addEventListener('scroll', () => {
      if (scrollSettle) clearTimeout(scrollSettle);
      scrollSettle = setTimeout(() => {
        const trackRect = track.getBoundingClientRect();
        let closest = 0;
        let closestDistance = Infinity;
        cells.forEach((cell, i) => {
          const distance = Math.abs(cell.getBoundingClientRect().left - trackRect.left);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
          }
        });
        current = closest;
        setActiveDot(current);
      }, 120);
    });

    setActiveDot(0);
    if (playing) startTimer();
    else setPlaying(false);

    teardowns.push(() => {
      stopTimer();
      if (scrollSettle) clearTimeout(scrollSettle);
    });
  });

  teardown = () => {
    teardowns.forEach((fn) => fn());
  };
}

document.addEventListener('astro:page-load', initFrameSequences);

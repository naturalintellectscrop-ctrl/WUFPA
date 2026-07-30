/**
 * EVENT STATUS — derived from the date at build time, never typed by a human.
 *
 * THE PROBLEM THIS SOLVES
 *
 * The Awards Gala scheduled for 13 December 2025 is the live example: a page
 * describing a past date as "upcoming" tells every visitor that nobody
 * maintains the site. That single impression undoes the credibility the rest
 * of the site is built to establish.
 *
 * So status is a FUNCTION of the date, not a field. There is no way to write
 * `status: upcoming` into frontmatter and have it stick after the date passes
 * — `content.config.ts` does not define such a field. The site rebuilds daily
 * (docs/18), so an event moves from upcoming to past with nobody doing
 * anything.
 *
 * `postponed` and `cancelled` ARE explicit, because they are not derivable
 * from a date. A cancelled event keeps its page — deleting it breaks inbound
 * links, and the record matters.
 *
 * ONE DERIVATION, TWO CONSUMERS: the visible page and the Event JSON-LD both
 * read `derive()`, so the badge a human sees and the `eventStatus` a crawler
 * reads cannot disagree. Structured data that contradicts the page is the
 * most common manual-action trigger (docs/16 section 4.3).
 *
 * Source: docs/09 section 9.2
 */

/** What the reader sees. */
export type EventPhase = 'upcoming' | 'past' | 'postponed' | 'cancelled' | 'undated';

/** What schema.org is told. Narrower — schema has no "undated". */
export type SchemaStatus = 'scheduled' | 'postponed' | 'cancelled';

export interface EventDates {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  dateUncertain?: boolean | undefined;
  override?: 'postponed' | 'cancelled' | undefined;
}

export interface EventStatus {
  phase: EventPhase;
  /** Badge text, or null where no badge should render. */
  badge: string | null;
  /** For `eventSchema()`. */
  schemaStatus: SchemaStatus;
  /** True when the copy around it should read in the past tense. */
  isPast: boolean;
}

/**
 * Derive an event's status.
 *
 * `now` is injectable so the logic is testable and so a single build stamps
 * every event against one instant — deriving per-event from `new Date()` could
 * straddle midnight in a long build and produce an internally inconsistent
 * page set.
 */
export function derive(event: EventDates, now: Date = new Date()): EventStatus {
  // An explicit override wins over the date: a postponed event may still have
  // a future start date on file, and it is still postponed.
  if (event.override === 'cancelled') {
    return {
      phase: 'cancelled',
      badge: 'Cancelled',
      schemaStatus: 'cancelled',
      // Retained for the record, so it reads as something that did not happen.
      isPast: true,
    };
  }

  if (event.override === 'postponed') {
    return {
      phase: 'postponed',
      badge: 'Postponed',
      schemaStatus: 'postponed',
      isPast: false,
    };
  }

  // No usable date. Never guess one — `dateUncertain` is a legitimate state
  // for the historical record, where only a year or nothing is known.
  if (!event.startDate || event.dateUncertain) {
    return {
      phase: 'undated',
      badge: null,
      schemaStatus: 'scheduled',
      isPast: true,
    };
  }

  // An event runs until the END of its last day. Comparing against the start
  // instant would file a three-day festival as "past" on its opening morning.
  const finishes = event.endDate ?? event.startDate;
  const endOfDay = new Date(finishes);
  endOfDay.setHours(23, 59, 59, 999);

  const isPast = endOfDay.getTime() < now.getTime();

  return {
    phase: isPast ? 'past' : 'upcoming',
    badge: isPast ? null : 'Upcoming',
    schemaStatus: 'scheduled',
    isPast,
  };
}

/**
 * Format an event's date range for display.
 *
 * Returns `dateNote` verbatim where there is no date — "Date not recorded" is
 * the honest output, and inventing precision is the failure mode this whole
 * module exists to prevent.
 *
 * en-GB formatting: "4 September 2017", unambiguous internationally, unlike
 * 04/09/2017 (docs/02 section 12.2).
 */
export function formatDates(
  event: EventDates & { dateNote?: string | undefined },
): string {
  if (!event.startDate || event.dateUncertain) {
    return event.dateNote ?? 'Date not recorded';
  }

  const long = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (!event.endDate || event.endDate.getTime() === event.startDate.getTime()) {
    return long.format(event.startDate);
  }

  const sameMonth =
    event.startDate.getMonth() === event.endDate.getMonth() &&
    event.startDate.getFullYear() === event.endDate.getFullYear();

  // "28–30 November 2023" rather than "28 November 2023 – 30 November 2023".
  if (sameMonth) {
    return `${event.startDate.getDate()}–${long.format(event.endDate)}`;
  }

  return `${long.format(event.startDate)} – ${long.format(event.endDate)}`;
}

/** `datetime` for <time>. Null where there is no date to encode. */
export function machineDate(date: Date | undefined): string | null {
  if (!date) return null;
  return date.toISOString().slice(0, 10);
}

/**
 * Sort events for display: upcoming soonest-first, past most-recent-first.
 *
 * Two different orderings because they answer two different questions —
 * "what can I attend?" versus "what has WUFPA done?". Undated events sort
 * last; they are archive material, not a schedule.
 */
export function sortForDisplay<T extends EventDates>(events: T[], now: Date = new Date()): {
  upcoming: T[];
  past: T[];
} {
  const upcoming: T[] = [];
  const past: T[] = [];

  for (const event of events) {
    const status = derive(event, now);
    if (status.phase === 'upcoming' || status.phase === 'postponed') upcoming.push(event);
    else past.push(event);
  }

  upcoming.sort((a, b) => (a.startDate?.getTime() ?? 0) - (b.startDate?.getTime() ?? 0));
  past.sort((a, b) => (b.startDate?.getTime() ?? 0) - (a.startDate?.getTime() ?? 0));

  return { upcoming, past };
}

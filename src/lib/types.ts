/**
 * Shared component types.
 *
 * Centralised here rather than exported from .astro files: Astro's frontmatter
 * is transformed by esbuild, which does not reliably handle type-only exports
 * from a component. Keeping them in lib/ also means a page can import a type
 * without importing the component that renders it.
 */

/* ── Layout primitives (WUFPA-015) ────────────────────────────────────── */

/**
 * A step on the spacing scale (primitives.css, --space-0 .. --space-10).
 *
 * Typed as a union rather than `number` so a primitive cannot be handed a
 * value off the scale — R6 ("no styling value outside the token system")
 * enforced by the compiler instead of by review.
 */
export type SpaceToken = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Aspect ratio for Frame. Named ratios only — an arbitrary string would let a
 * caller invent a ratio the design system does not have. `auto` opts out of
 * cropping entirely, which is the correct choice for group photographs, where
 * a square crop cuts people out of their own picture (docs/07 section 10.3).
 */
export type FrameRatio = 'wide' | 'landscape' | 'portrait' | 'square' | 'auto';

/* ── Navigation ───────────────────────────────────────────────────────── */

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * A top-level PrimaryNav entry.
 *
 * `children` present → rendered as a mega-panel trigger (docs/08 section 3).
 * Absent → a direct link. Five items is the ceiling
 * (docs/05 section 3.1) — a sixth means something belongs one level down.
 */
export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

/** A SiteFooter link column (docs/05 section 3.4). */
export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

/* ── Content ──────────────────────────────────────────────────────────── */

export interface Stat {
  figure: string;
  label: string;
  /** Source tag, e.g. "[P1]". Retained for auditability; not rendered. */
  source?: string;
}

export interface Fact {
  label: string;
  value?: string;
  /** Shown in place of a missing value, e.g. "Not recorded". */
  pending?: string;
}

export interface TimelineEntry {
  /** Machine-readable date or year. Omit entirely where unknown. */
  date?: string;
  /** Human label, e.g. "November 2023". Absence routes the entry to the
   *  "Date not recorded" group rather than a guessed position. */
  dateLabel?: string;
  title: string;
  description?: string;
  source?: string;
}

/* ── People ───────────────────────────────────────────────────────────── */

export type ConsentState = 'granted' | 'pending' | 'refused';

export interface PersonRole {
  title: string;
  termStart?: number;
  termEnd?: number;
}

/**
 * A governance roster row.
 *
 * There is deliberately no telephone or email field. The supplied roster
 * carries ~60 personal mobile numbers and Uganda's Data Protection and Privacy
 * Act, 2019 applies — omitting the field from the type means no component can
 * render one even by accident (docs/11 section 6).
 */
export interface RosterRow {
  name: string;
  role: string;
  district?: string;
  /** False while a spelling is unconfirmed (Q1); the row is withheld. */
  nameConfirmed?: boolean;
  consent?: ConsentState;
}

/* ── Forms ────────────────────────────────────────────────────────────── */

export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';

export interface FormError {
  fieldId: string;
  message: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

/* ── Media ────────────────────────────────────────────────────────────── */

export interface ImageRef {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
}

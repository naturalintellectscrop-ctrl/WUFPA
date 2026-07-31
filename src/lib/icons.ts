/**
 * Icon paths.
 *
 * Derived from Lucide (ISC licence) and inlined at build, so only the icons
 * actually used ever ship. docs/14 section 11.1: no dependency without a
 * written reason — a whole icon package is not justified by ten icons.
 *
 * Icons support text; they never replace it (docs/03 section 9).
 */

export type IconName =
  | 'arrow-right'
  | 'chevron-down'
  | 'chevron-right'
  | 'external'
  | 'close'
  | 'menu'
  | 'search'
  | 'alert'
  | 'check'
  | 'info';

export const ICON_PATHS: Record<IconName, string> = {
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  external:
    '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
};

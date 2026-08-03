/**
 * Per-format encoder quality.
 *
 * THE BUG THIS FIXES. Every image component passed `quality={50}`, a single
 * number Astro then applied to AVIF, WebP and JPEG alike. 50 is a sensible
 * AVIF value and a bad JPEG one: the formats are not on a shared scale, and
 * the same number means very different things to each encoder.
 *
 * Measured on the Tooro workshop photograph at 1280px wide, PSNR against the
 * unencoded resize:
 *
 *   avif q50   217 KB   32.46 dB
 *   webp q50   180 KB   29.29 dB
 *   jpeg q50   177 KB   27.07 dB   <- visibly degraded
 *   webp q78   262 KB   31.60 dB
 *   jpeg q80   308 KB   30.11 dB
 *
 * Below roughly 30 dB, compression artefacts become visible on faces and in
 * smooth gradients: skies, walls, skin. This archive is almost entirely
 * group photographs of people, which is the worst case for that failure: the
 * blocking lands on the faces that are the whole point of the picture.
 *
 * A visitor on Chrome or Firefox got AVIF at 32.46 dB and saw nothing wrong.
 * A visitor on an older Safari or any browser falling through to the JPEG got
 * 27.07 dB. The site looked fine to whoever checked it and degraded for
 * everyone else, which is exactly how a single-number simplification hides.
 *
 * THE VALUES BELOW ARE docs/12 SECTION 5.5'S OWN TARGETS. That document
 * already specified ~50 AVIF, ~78 WebP, ~80 JPEG per format; the components
 * were simply not able to express it, so the AVIF number was applied to all
 * three and the divergence written off in a comment as a "deliberate
 * simplification". It was not deliberate on the part of the documentation.
 *
 * NOTE ON RESOLUTION. Raising these numbers improves the ENCODING of each
 * derivative. It cannot add detail that is not in the source: 44 of the 72
 * supplied photographs are under 1280px wide and the smallest is 226x299.
 * Those are served at their own intrinsic width and no larger: enlarging
 * them would produce a bigger, blurrier image, not a sharper one, which is
 * what scripts/check-no-upscale.mjs exists to prevent.
 */
export const IMAGE_QUALITY = {
  avif: 50,
  webp: 78,
  jpeg: 80,
} as const;

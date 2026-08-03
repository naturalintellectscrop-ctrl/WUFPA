import sharpService from 'astro/assets/services/sharp';
import type { LocalImageService } from 'astro';
import { IMAGE_QUALITY } from './image-quality';

/**
 * A thin wrapper over Astro's built-in sharp service that applies a quality
 * value PER OUTPUT FORMAT.
 *
 * WHY THIS IS NEEDED. Astro's `<Picture>` takes one `quality` for the whole
 * element and passes it unchanged to every format it emits. AVIF, WebP and
 * JPEG do not share a quality scale, so a single number cannot be correct for
 * all three — and the number the site was using (50) was chosen for AVIF,
 * which left JPEG at roughly 27 dB PSNR. That is below the ~30 dB threshold
 * where compression artefacts become visible on faces, which is most of what
 * this archive contains. See src/lib/image-quality.ts for the measurements.
 *
 * The alternative was to hand-roll `<picture>` markup with a `getImage()` call
 * per format in every component. That would mean reimplementing srcset
 * generation, and getting it subtly wrong somewhere, in order to change one
 * number. Overriding the transform is the smaller surface.
 *
 * WHAT THIS DOES NOT DO. It does not resize anything. Width ladders, the
 * no-upscale clamp and `withoutEnlargement` all remain exactly as the built-in
 * service handles them — this only intercepts the quality value on its way to
 * the encoder. A component that explicitly passes a quality still wins, so a
 * caller can opt out for one image without editing this file.
 */
const service: LocalImageService = {
  ...sharpService,

  transform(inputBuffer, transform, config) {
    const format = transform.format as keyof typeof IMAGE_QUALITY | undefined;

    /* An explicit non-numeric quality (Astro's 'low' | 'mid' | 'high' | 'max'
       presets) is a deliberate choice by the caller and is passed through
       untouched. Only the default case is corrected. */
    const alreadyChosen = typeof transform.quality === 'number';

    if (!alreadyChosen && format && format in IMAGE_QUALITY) {
      return sharpService.transform(
        inputBuffer,
        { ...transform, quality: IMAGE_QUALITY[format] },
        config,
      );
    }

    return sharpService.transform(inputBuffer, transform, config);
  },
};

export default service;

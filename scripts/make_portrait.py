"""
Turns Anvi's photo into the cut-out portrait used in the hero and the footer.

Usage (from the project folder):
    python scripts/make_portrait.py "..\\Anvi final.png"
    python scripts/make_portrait.py "..\\Anvi final.png" 0.72     # keep the top 72% of the figure

Writes public/images/anvi-panchal.webp, 820 px wide, with a transparent background,
cropped from the top of the head to about mid-torso, with the bottom edge faded out.
No EXIF or other metadata is kept.

Needs: pip install pillow numpy scipy
Only if the photo still has its background: pip install "rembg[cpu]"
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps
from scipy import ndimage

src = Path(sys.argv[1])
keep = float(sys.argv[2]) if len(sys.argv) > 2 else 0.72
out = Path(__file__).resolve().parent.parent / "public" / "images" / "anvi-panchal.webp"

im = ImageOps.exif_transpose(Image.open(src)).convert("RGBA")
alpha = np.array(im)[:, :, 3]
already_cut = (alpha < 16).mean() > 0.05

if not already_cut:
    from rembg import new_session, remove

    im = remove(
        im,
        session=new_session("isnet-general-use"),
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=15,
        alpha_matting_erode_size=8,
    ).convert("RGBA")
    # Keep only the largest shape, then tighten the edge a little so no halo is left.
    a = np.array(im)[:, :, 3]
    labels, n = ndimage.label(a > 24)
    if n > 1:
        sizes = ndimage.sum(np.ones_like(a), labels, range(1, n + 1))
        a = np.where(labels == (int(np.argmax(sizes)) + 1), a, 0).astype(np.uint8)
    a_img = Image.fromarray(a).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.0))
    im.putalpha(a_img)

# Crop to the figure, from the top of the head down to `keep` of its height.
a = np.array(im)[:, :, 3]
ys, xs = np.where(a > 24)
top, bottom, left, right = ys.min(), ys.max(), xs.min(), xs.max()
height = bottom - top
crop_bottom = top + int(height * keep) if keep < 1 else bottom
pad = int(height * 0.02)
im = im.crop((max(0, left - pad), max(0, top - pad), min(im.width, right + pad), min(im.height, crop_bottom)))

# Resize to 820 px wide.
w = 820
im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)

# Fade out the bottom 8%, so the portrait sits softly on the section below.
a = np.array(im)[:, :, 3].astype(np.float32)
fade = max(1, int(im.height * 0.08))
ramp = np.linspace(1, 0, fade)[:, None]
a[-fade:, :] *= ramp
im.putalpha(Image.fromarray(a.clip(0, 255).astype(np.uint8)))

out.parent.mkdir(parents=True, exist_ok=True)
im.save(out, "WEBP", quality=90, method=6)
print(f"Saved {out} at {im.width} x {im.height}. Use these as the width and height attributes of the portrait images.")

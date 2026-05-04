# Image Formatting

Modern web development is about balancing visual quality with performance. Using next-gen image formats is one of the most effective ways to **reduce page weight**, improve **Largest Contentful Paint (LCP)**, and **save user bandwidth**.

<br>

## Format comparison

| Format | Extension | Strength | Browser support / Notes |
| --- | --- | --- | --- |
| **AVIF** | `.avif` | Highest compression ratio; HDR support | High (Chrome, Firefox, Safari) |
| **WebP** | `.webp` | Excellent balance of speed and size | Universal |
| **JPEG XL** | `.jxl` | Progressive loading; lossless JPEG transcoding | Emerging (Safari, Chrome) |
| **JPEG / PNG** | `.jpg` / `.png` | Universal compatibility | Legacy fallback |

<br>

## Formats

### AVIF (AV1 Image File Format)

AVIF offers the most significant file-size savings — often **50% smaller than JPEG** at the same visual quality.

- **Best for:** High-quality photography, hero banners, and complex graphics where file size is the priority.
- **Cons:** Higher CPU usage for encoding/decoding; no progressive rendering (loads top-to-bottom or all at once).

<br>

### WebP

WebP is the industry workhorse. It supports lossy and lossless compression, as well as alpha transparency.

- **Best for:** General UI elements, product thumbnails, and replacing transparent PNGs.
- **Cons:** Better than JPEG, but typically outperformed by AVIF in high-detail scenarios.

<br>

### JPEG XL (JXL)

The newest standard, designed to eventually replace all previous formats.

- **Best for:** Large image libraries (thanks to lossless JPEG transcoding) and responsive web design (thanks to superior progressive loading).
- **New tech:** It can shrink existing JPEGs by ~35% with **no generation loss**, and you can reconstruct the original JPEG bit-for-bit if needed.

<br>

## Implementation methods

### 1. Managed image CDNs

Services like **Jetpack (Photon)**, **Cloudflare Polish**, and **Optimole** handle everything at the edge.

- **How it works:** You upload a standard JPEG. When a user visits your site, the CDN detects their browser. If they support AVIF, the CDN converts the image on the fly and serves it.
- **Best for:** Larger sites that don't want to store five different copies of every image on their own server.

<br>

### 2. Optimisation plugins

For "set it and forget it" local optimisation, these are the current leaders:

- **Imagify** — Simple UI; supports WebP and AVIF.
- **ShortPixel** — Excellent compression and supports `<picture>` tag rewriting.
- **EWWW Image Optimizer** — Best for high-volume sites and server-level optimisation.

<br>

## Image compression

Optimising your images is essential for modern websites. Heavy, uncompressed images are one of the biggest causes of slow load times and a poor user experience.

WordPress offers plugins like **EWWW Image Optimizer**, **Smush**, **ShortPixel**, and **Imagify** — but we prefer to compress images **before** they ever reach the database. Tools like [TinyPNG↗](https://tinypng.com/) and [Squoosh↗](https://squoosh.app/) significantly reduce file sizes while preserving visual quality.

<img width="730" height="483" alt="image" src="https://github.com/user-attachments/assets/7ef3f41c-0861-45bf-a4df-2a02826fc92b" />

<br>

## Best-practice reminders

- **Don't over-compress** — AVIF is so efficient that a quality setting of **70–80** in WordPress is usually enough.
- **Keep your originals** — Always keep your original JPEGs/PNGs. If you ever disable a conversion plugin, you'll need them to regenerate your library.
- **Use Fetch Priority** — For your **LCP (hero) image**, use the *Fetch Priority* setting in the WordPress Block Editor (Advanced tab) to make sure it loads before other assets.

There are many more advanced image features in WordPress (like *dominant color placeholders*), but these next-gen format strategies are the most common ways to gain real performance improvements.

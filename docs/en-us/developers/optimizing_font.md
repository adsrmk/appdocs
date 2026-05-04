# Optimised Font Delivery

In 2026, web fonts are no longer the "performance killers" they once were — provided you use modern techniques. Poor font implementation typically causes two major issues: **FOIT (Flash of Invisible Text)** and **CLS (Cumulative Layout Shift)**.

<br>

## Use WOFF2 only

Forget `.ttf`, `.otf`, and the original `.woff`. **WOFF2** is the only format you should serve today. It uses Brotli compression internally and is roughly **30% smaller** than its predecessor.

```css
@font-face {
  font-family: 'Inter';
  src: url('fonts/inter-bold.woff2') format('woff2'); /* [!code focus] */
  font-weight: 700;
  font-display: swap;
}
```

<br>

## Avoid FOIT with `font-display`

The `font-display` property controls how the browser behaves while a font file is still downloading.

| Value | Behaviour | Best for |
| --- | --- | --- |
| **`swap`** | Shows the system font immediately, then swaps once the custom font loads. | General body text (prioritises readability). |
| **`fallback`** | Brief invisibility (~100 ms), then system font, then swap. | A balanced trade-off between UX and performance. |
| **`optional`** | If the font isn't ready within ~100 ms, the browser never swaps. | Best for performance and CLS — prevents layout jank. |
| **`block`** | Hides the text until the font is ready (up to 3 s). | Avoid — unless the font is an icon set. |

<br>

## Self-host your fonts

Google Fonts is convenient, but **self-hosting** is now the standard for high-performance sites — for a few reasons:

- **No extra DNS lookup** — You don't need a preconnect to `fonts.gstatic.com`, which reduces external requests and slightly improves load times.
- **Predictability** — You fully control the caching behaviour, allowing long-lived headers like `Cache-Control: immutable` for faster repeat visits.
- **Privacy** — Fonts are served from your own domain, eliminating third-party requests and potential tracking. This makes your site more GDPR- and CCPA-friendly.

<div class="tip custom-block" style="padding-top: 8px">
Use the <a href="https://gwfh.mranftl.com/fonts">Google Webfonts Helper↗</a> to easily download font files and generate the required CSS — a quick and correct way to self-host any Google Font.
</div>

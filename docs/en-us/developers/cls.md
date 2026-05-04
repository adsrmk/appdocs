# CLS

**Cumulative Layout Shift (CLS)** measures how much elements on a page move around unexpectedly while loading. It quantifies "visual jitter" — for example, when you're about to click a link, but an ad suddenly loads at the top and pushes the link down, causing you to click the wrong thing.

Unlike LCP or INP, CLS isn't measured in seconds. It's a score calculated from the "impact fraction" and "distance fraction" of shifting elements on the page.

<img width="932" height="344" alt="cls_061" src="https://github.com/user-attachments/assets/dca11dd8-fded-4e51-87a2-d472e9a03c22" />

<br>

## Common causes of shifting

- **Images without dimensions** — The browser doesn't reserve space, so text jumps once the image loads.
- **Ads and embeds** — Dynamic content that pops into the layout late.
- **Web fonts** — Text "jumps" when a custom font swaps in over a fallback font.
- **Injected content** — Banners or forms added via JavaScript above existing content.

<br>

## How to reduce CLS

- **Set explicit dimensions** — Always include `width` and `height` attributes on `<img>` and `<video>` elements.
- **Reserve space for ads** — Use CSS placeholders (`min-height`) for dynamic containers so they don't push the layout.
- **Optimise fonts** — Use `font-display: swap` or preload key fonts to minimise visual shifts.
- **Avoid top injections** — Only add new UI elements *below* the current viewport, unless triggered by a user action.

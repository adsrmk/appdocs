# LCP and FCP

**First Contentful Paint (FCP)** and **Largest Contentful Paint (LCP)** are two of the most important paint metrics for measuring perceived performance. FCP marks the *start* of the loading experience, while LCP marks the moment the *main* content is ready.

<br>

## First Contentful Paint (FCP)

FCP is the moment the user first sees **any** part of the page's content on screen. It's the critical first impression — the point where the screen goes from a blank white page to something that confirms the page is loading.

FCP measures the time until the browser renders the first piece of content: text, an image, an SVG, or a non-white canvas element. A fast FCP reassures the user that things are happening, reducing the chance they abandon the page.

<br>

### FCP performance thresholds

These thresholds are measured at the **75th percentile** of page loads.

| Rating | FCP score | User perception |
| --- | --- | --- |
| **Good** | **≤ 1.8 s** | The page is loading quickly. |
| Needs improvement | 1.8 – 3.0 s | The page is loading, but could be faster. |
| Poor | > 3.0 s | The page is loading slowly, causing frustration. |

<br>

### How to optimise FCP

Improving FCP comes down to minimising the time it takes for the browser to start rendering the first content — in other words, streamlining the **critical rendering path**.

| Strategy | What it does | How to do it |
| --- | --- | --- |
| **Eliminate render-blocking resources** | The browser has to download and process CSS and JavaScript before rendering. | Use `async` or `defer` for non-critical scripts, inline critical CSS, and use media queries for non-critical CSS. |
| **Reduce server response time (TTFB)** | The time it takes for the server to send the first byte of content. | Optimise server-side code, use a CDN, and implement caching. |
| **Preconnect to required origins** | Establish early connections to important third-party origins. | Use `<link rel="preconnect">` for domains that host critical assets (fonts, APIs). |
| **Minimise critical request depth** | Reduce dependencies that must load before the main content renders. | Lower the number of critical files and keep them small. |

<br>

## Largest Contentful Paint (LCP)

While FCP is the first paint, **LCP** is the moment the page's *main content* has loaded. It reports the render time of the largest image, text block, or video element visible in the viewport — a strong proxy for **perceived load speed**, since it marks the point when the user can meaningfully engage with the page.

<br>

### LCP performance thresholds

A fast LCP matters for user satisfaction and is also a Google ranking factor.

| Rating | LCP score | User perception |
| --- | --- | --- |
| **Good** | **≤ 2.5 s** | The page is fully loaded and ready to use. |
| Needs improvement | 2.5 – 4.0 s | The main content takes noticeable time to appear. |
| Poor | > 4.0 s | The page feels broken or extremely slow. |

<br>

### Which elements count for LCP?

The LCP element is determined dynamically during page load and is always one of these types:

- `<img>` elements
- `<image>` elements inside an `<svg>`
- Block-level elements with a CSS background image loaded via `url()`
- Block-level text elements (`<h1>`, `<p>`, etc.) containing text nodes
- `<video>` elements (using the poster image load time)

<br>

## FCP vs LCP

Both metrics measure "paint", but they serve different purposes. FCP is about the **start** of the loading experience; LCP is about the **completion** of the main loading experience.

| Feature | **FCP** | **LCP** |
| --- | --- | --- |
| **What it measures** | Time until the first piece of content appears | Time until the largest content element appears |
| **User question** | "Is this page loading?" | "Is the main content here yet?" |
| **Goal threshold** | **≤ 1.8 s** | **≤ 2.5 s** |
| **Optimisation focus** | Eliminate render-blocking resources | Prioritise loading and rendering the single largest element |
| **Relationship** | Always occurs *before* LCP | A more meaningful measure of perceived load completion |

<br>

A fast **FCP** manages the user's initial anxiety, and a fast **LCP** confirms the page is ready to use. A truly immersive experience is one where the gap between FCP and LCP is minimal — a seamless transition from "loading" to "ready".

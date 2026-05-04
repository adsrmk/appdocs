# Link Preloading

Link preloading is a performance technique that tells the browser to download a resource — *like a script, stylesheet, or image* — as early as possible because it will be needed soon. Initiating the fetch earlier in the page lifecycle can significantly reduce **Largest Contentful Paint (LCP)** and improve the overall user experience.

There are several ways to "hint" to the browser about what to fetch or prepare. The right choice depends on **when** and **where** the resource will be used.

<br>

## Available directives

| Directive | Purpose |
| --- | --- |
| **`preload`** | High-priority fetch for the **current** page. |
| **`prefetch`** | Low-priority fetch for the **next** navigation. |
| **`preconnect`** | Establishes a connection (DNS + TCP + TLS) to a domain. |
| **`dns-prefetch`** | Resolves the DNS for a domain only. |

<br>

## 1. `rel="preload"`

Use `preload` for **critical assets** that the browser's discovery scanner might otherwise miss — for example, fonts defined inside CSS, or CSS background images.

```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

### Key attributes

- **`as`** *(required)* — Tells the browser the resource type, so it can apply the right priority and security headers. Common values: `script`, `style`, `font`, `image`, `fetch`.
- **`crossorigin`** *(required for fonts)* — Even on the same domain, fonts must be fetched using anonymous CORS mode.
- **`type`** *(optional)* — Lets the browser skip formats it doesn't support (e.g. `type="image/webp"`).

<br>

## 2. `rel="prefetch"`

Use `prefetch` for resources you'll likely need on the **next** page a user visits. The browser downloads them at low priority while idle.

```html
<link rel="prefetch" href="/next-page-assets/hero-image.jpg">
```

<div class="warning custom-block" style="padding-top: 8px">
Don't use <code>prefetch</code> for critical current-page assets — it competes for bandwidth with more urgent resources and may slow things down.
</div>

<br>

## 3. `rel="preconnect"`

`preconnect` lets the browser set up early connections **before** an HTTP request is actually sent. This eliminates the round-trip latency of DNS lookups, TCP handshakes, and TLS negotiations.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.example.com" crossorigin>
```

### When to use it

- **Third-party fonts** — Connecting to Google Fonts or Adobe Fonts.
- **CDN assets** — When you know you'll need images or scripts from a specific edge domain.
- **Streaming media** — Preparing the connection for a video player.

<br>

There are more advanced options if you want to dig deeper into link preloading. You can learn more on [web.dev↗](https://web.dev/articles/preload-critical-assets).

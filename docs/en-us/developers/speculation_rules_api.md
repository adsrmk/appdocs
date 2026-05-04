# Speculation Rules API

The **Speculation Rules API** is a JSON-based configuration that lets developers programmatically tell the browser to **prefetch** (download resources) or **prerender** (render the entire page in the background) specific URLs.

Unlike older link preloading, this API gives you granular control over *eagerness* and supports full-page rendering — making page transitions feel truly instant.

<div class="warning custom-block" style="padding-top: 8px">
The Speculation Rules API is currently only supported in <b>Chromium-based browsers</b> (Chrome, Edge, Opera). Other browsers such as Safari and Firefox ignore these rules completely.
</div>

<br>

## Basic implementation

The simplest way to use the API is by providing a list of specific URLs you want the browser to prepare ahead of time.

```html [/public_html/wp-content/themes/your-theme/header.php]
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": ["/page1", "/page2", "/page3"],
      "eagerness": "eager"
    }
  ]
}
</script>
```

<br>

### Key concepts

| Action | Description |
| --- | --- |
| **`prefetch`** | Downloads the HTML and assets into the cache. |
| **`prerender`** | Downloads the page, executes JavaScript, and builds the DOM in an invisible tab. |

<br>

**Eagerness levels:**

- **`immediate`** — As soon as the rule is parsed.
- **`eager`** — On any slight hint of intent (like the mouse moving toward a link).
- **`moderate`** — On `pointerdown` — the moment the user clicks, before they release.
- **`conservative`** — Only on hover or mouse down.

<br>

## Document-based rules

Instead of listing every URL manually, you can use **Document Rules**. This tells the browser to automatically speculate on links it finds in the HTML that match certain patterns.

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "document",
      "where": {
        "and": [
          { "href_matches": "/*" },
          { "not": { "href_matches": ["/logout", "/admin/*", "*/wp-admin/*"] } },
          { "not": { "selector_matches": ".my_button" } }
        ]
      },
      "eagerness": "moderate"
    }
  ]
}
</script>
```

- **`href_matches`** — Uses glob patterns to include or exclude paths.
- **`selector_matches`** — Excludes specific links based on CSS selectors — useful for preventing things like the logout button from being "clicked" in the background.

<br>

## Where to deploy the rules

You can place the rules directly in your HTML as an **inline script** — either in the `<head>` or near the end of the `<body>`.

<div class="tip custom-block" style="padding-top: 8px">
Placing the script near the end of the <code>&lt;body&gt;</code> avoids blocking initial rendering, while still activating as soon as the user starts interacting with the page.
</div>

For more advanced setups (or when you don't have direct access to the HTML template, like in some CMS environments), you can also deliver the rules through an HTTP response header — `Speculation-Rules` — pointing to a JSON file.

# Indexing

As a developer, you have precise tools to control how search engine bots (like Googlebot) crawl and index your website. Just creating content isn't enough — you also need to actively guide search engines so they focus on **high-value pages** and ignore irrelevant ones. This saves crawl budget and prevents messy search results.

There are three main tools available, each with its own purpose:

1. **`robots.txt`** — Broad instructions for which areas bots should crawl.
2. **`<meta name="robots">`** — Per-page indexing instructions inside HTML.
3. **`X-Robots-Tag`** — HTTP header for files that aren't HTML (PDFs, images, etc.).

<br>

## 1. The `robots.txt` file

`robots.txt` is a plain text file at your domain's root (`yourdomain.com/robots.txt`) that compliant bots check before crawling. It provides **broad** instructions for which sections of your site they should skip.

**Best for:**

- Blocking access to backend areas (`/wp-admin/`)
- Preventing crawling of files that don't need indexing (`/wp-includes/`, `/wp-content/plugins/`)
- Blocking internal search results (`Disallow: /?s=`)

<div class="warning custom-block" style="padding-top: 8px">
<code>robots.txt</code> is a <b>directive, not a firewall</b>. Malicious bots will ignore it. If a disallowed page is linked from elsewhere on the web, Google may still index it (without its content) and show it in search results as <i>"No information is available for this page."</i> To truly hide a page from search, use the <code>noindex</code> meta tag instead.
</div>

<br>

**Recommended `robots.txt` for WordPress:**

```text [/public_html/robots.txt]
User-agent: *
# Disallow crawling of backend and non-public asset folders
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/themes/

# Allow the AJAX endpoint, used by some frontend functionality
Allow: /wp-admin/admin-ajax.php

# Disallow internal search results to prevent crawl waste
Disallow: /?s=
Disallow: /search/

# Specify your sitemap location
Sitemap: https://www.yourdomain.com/sitemap_index.xml
```

<br>

## 2. The `<meta name="robots">` tag

The meta robots tag is an HTML element placed in the `<head>` of a specific page. It gives crawlers explicit instructions on how to treat that one URL — a far more reliable way than `robots.txt` to keep specific content out of search results.

### Key directives

- **`index`** — Allow the page to be indexed (default).
- **`noindex`** — Do not show this page in search results. The most important directive for controlling indexing.
- **`follow`** — Allow crawlers to follow links on this page (default).
- **`nofollow`** — Don't follow any links on this page. Useful to prevent passing link equity.

### Common combinations

- **`noindex, follow`** — "Don't index this page, but you can follow its links to find other good pages." The most common combination for low-value pages like paginated archives, author pages on single-author blogs, or "Thank You" pages.
- **`noindex, nofollow`** — "Don't index this page, and don't trust any of its links." Useful for pages with user-generated content you don't want to endorse.

<br>

### Implementation in WordPress

You can add the tag programmatically. For example, to `noindex` all paginated archive pages after page 1:

```php [/public_html/wp-content/themes/your-theme/functions.php]
/**
 * Add a 'noindex, follow' meta tag to paginated archives.
 */
add_action('wp_head', 'noindex_paginated_archives');

function noindex_paginated_archives() {
    // is_paged() checks if we're on page 2 or later of an archive
    if ( is_paged() ) {
        echo '<meta name="robots" content="noindex,follow" />';
    }
}
```

<br>

## 3. The `X-Robots-Tag` HTTP header

`X-Robots-Tag` works exactly like the meta robots tag, but is sent as part of the HTTP response header — so it works for **non-HTML resources** where you can't embed a `<meta>` tag. This makes it the right tool for files like PDFs, images, or office documents.

### Implementation

You can configure `X-Robots-Tag` at the server level (`.htaccess` for Apache or `nginx.conf` for Nginx), or programmatically via PHP.

**Example — block PDFs from being indexed:**

```php [/public_html/wp-content/themes/your-theme/functions.php]
/**
 * Add an X-Robots-Tag HTTP header to block PDF indexing.
 */
add_action('template_redirect', 'block_pdf_indexing');

function block_pdf_indexing() {
    // Check if the current request is for a PDF file
    if ( is_attachment() && strpos( get_post_mime_type(), 'application/pdf' ) !== false ) {
        header('X-Robots-Tag: noindex,nofollow');
    }
}
```

<br>

## Quick reference

| Task | `robots.txt` | `<meta name="robots">` | `X-Robots-Tag` |
| --- | :---: | :---: | :---: |
| Block crawling of a whole directory (e.g. `/wp-admin/`) | **Yes** | No | No |
| Prevent a single page from appearing in search results | No | **Yes** | Yes |
| Prevent a PDF or image file from being indexed | No | No | **Yes** |
| Save crawl budget on low-value sections | **Yes** | Yes | Yes |

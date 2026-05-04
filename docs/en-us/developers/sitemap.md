# XML Sitemaps in WordPress

An **XML sitemap** is a file that lists all the important URLs on your website, acting as a roadmap for search engine crawlers. It tells them which pages you consider important, when they were last updated, and how often they change.

Since WordPress 5.5, the platform automatically generates a basic sitemap — but developers often need to customise the output for optimal SEO performance.

<img width="997" height="559" alt="image" src="https://github.com/user-attachments/assets/7d8fd573-efb0-4030-a3df-7221c93b3723" />

<br>

## Why the default sitemap isn't always enough

The default WordPress sitemap is a solid starting point, but it has a few limitations:

- **Too inclusive** — Every public post, page, category, and tag is included by default. This can cause search engines to index *thin content* pages (for example, a tag used on only one post).
- **No media information** — The default sitemap doesn't include image or video metadata, which is a missed opportunity for ranking in image and video search.
- **Limited control** — Customisation options are minimal and require code.

A well-managed sitemap strategy focuses crawlers on high-value content, saves crawl budget, and prevents low-quality pages from being indexed.

<br>

## Customising the core sitemap

You can control the core sitemap programmatically using filters in your theme's `functions.php` or a custom plugin.

<br>

### 1. Exclude an entire post type

If you have a custom post type that shouldn't be indexed (e.g. `internal_docs`), you can remove it from the sitemap entirely.

```php [/public_html/wp-content/themes/your-theme/functions.php]
/**
 * Exclude a specific post type from the XML sitemap.
 */
add_filter( 'wp_sitemaps_post_types', 'exclude_post_type_from_sitemap' );

function exclude_post_type_from_sitemap( $post_types ) {
    // 'my_secret_cpt' is the name of the custom post type
    unset( $post_types['my_secret_cpt'] );
    return $post_types;
}
```

<br>

### 2. Exclude a specific post by ID

Useful for pages like "Thank You" that should stay public but not be indexed.

```php [/public_html/wp-content/themes/your-theme/functions.php]
/**
 * Exclude a specific post or page by its ID from the sitemap.
 */
add_filter( 'wp_sitemaps_posts_query_args', 'exclude_specific_post_from_sitemap', 10, 2 );

function exclude_specific_post_from_sitemap( $args, $post_type ) {
    // Exclude post with ID 123
    $args['post__not_in'] = isset( $args['post__not_in'] ) ? $args['post__not_in'] : [];
    $args['post__not_in'][] = 123;

    // To exclude multiple posts/pages:
    // $args['post__not_in'] = array_merge( $args['post__not_in'], [ 123, 456, 789 ] );

    return $args;
}
```

<br>

### 3. Disable the core sitemap entirely

If you use a dedicated SEO plugin (such as **Yoast SEO** or **Rank Math**), you should disable the core sitemap to avoid conflicts.

<div class="tip custom-block" style="padding-top: 8px">
WordPress' core sitemap works, but for serious SEO work we recommend disabling it and using a <b>dedicated SEO plugin</b> like Yoast SEO, Rank Math, or SEOPress instead. These offer a much better UI for excluding content, automatic generation of image and video sitemaps, and tighter integration with other SEO features.
</div>

```php [/public_html/wp-content/themes/your-theme/functions.php]
/**
 * Disable the core WordPress XML sitemap.
 * Recommended when using a dedicated SEO plugin.
 */
add_filter( 'wp_sitemaps_enabled', '__return_false' );
```

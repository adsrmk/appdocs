# Dequeue Scripts and Styles

By default, WordPress loads several styles and scripts that your site may not actually use. These extra assets **slow down your page load** unnecessarily. You can prevent WordPress from loading them by **dequeuing** them.

<br>

## Example: dequeue Gutenberg

Gutenberg is WordPress's built-in block editor. Many users don't need it on the front-end — especially when they rely on a page builder instead.

Add the following code to your active theme's `functions.php`:

```php [/public_html/wp-content/themes/your-theme/functions.php]
function dequeue_gutenberg_assets() {
    // Styles
    wp_dequeue_style('wp-block-library');         // Core block styles
    wp_dequeue_style('wp-block-library-theme');   // Theme block styles
    wp_dequeue_style('wc-block-style');           // WooCommerce block styles (if used)

    // Scripts
    wp_dequeue_script('wp-block-library');        // Core block scripts
    wp_dequeue_script('wp-editor');               // Editor scripts
}
add_action('wp_enqueue_scripts', 'dequeue_gutenberg_assets', 100);
```

<br>

## How it works

- **`wp_dequeue_style()` and `wp_dequeue_script()`** — Tell WordPress *not* to load specific CSS or JS files on the front-end.
- **Priority `100`** — Ensures this code runs *after* all scripts and styles have been enqueued, so they can be safely removed.
- **Result** — Smaller page payload, faster load times, and fewer unused assets sent to your visitors — especially if you're not using Gutenberg.

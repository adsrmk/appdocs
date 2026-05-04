# Obfuscate WordPress Files & Version

WordPress exposes its version number in several places — the site header, RSS feeds, and asset URLs. Attackers use this information to target known vulnerabilities. The snippets below hide that information without affecting functionality.

<div class="info custom-block" style="padding-top: 8px">
Add the snippets below to your active theme's <code>functions.php</code> file, directly under the opening <code>&lt;?php</code> tag.
</div>

<br>

## Remove version from header & RSS feeds

By default, WordPress adds its version number to the site header and RSS feeds. Removing it makes it harder for attackers to identify your WordPress version.

```php [/public_html/wp-content/themes/your-theme/functions.php]
// Remove WordPress version from header
remove_action('wp_head', 'wp_generator');

// Remove version from RSS feeds
function remove_wp_version_rss() {
    return '';
}
add_filter('the_generator', 'remove_wp_version_rss');
```

<br>

## Remove version from styles & scripts

WordPress appends its version number to CSS and JavaScript files as a query string (e.g. `style.css?ver=6.5`). While this helps with caching, it also exposes your version to potential attackers.

The snippet below removes version strings from all enqueued CSS and JS files:

```php [/public_html/wp-content/themes/your-theme/functions.php]
// Remove version query strings from static files
function remove_cssjs_ver($src) {
    if (strpos($src, 'ver=') !== false) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('style_loader_src', 'remove_cssjs_ver', 10, 2);
add_filter('script_loader_src', 'remove_cssjs_ver', 10, 2);
```

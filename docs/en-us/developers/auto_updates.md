# Automatic Updates

Keeping WordPress core, themes, and plugins up-to-date is one of the most important security practices for any website. Most successful attacks exploit **known vulnerabilities** in outdated software — issues that usually already have patches available. Relying on a human to log in and click "update" is unreliable. Automating it ensures updates are applied consistently and on time.

<br>

## Option 1 — Automatic updates via wp-config

<div class="warning custom-block" style="padding-top: 8px">
Updating <b>theme files</b> also overwrites <code>functions.php</code>. If you've added custom features or modifications, make sure to <b>back up</b> the file (or copy its contents) before enabling automatic updates. Otherwise, all your custom code will be lost!
</div>

<br>

You can enable automatic updates by adding the right settings to your `wp-config.php` and `functions.php` files. This ensures WordPress core, themes, and plugins update automatically — no manual intervention required.

**1. Enable automatic core updates** — Add this to `wp-config.php`:

```php [/public_html/wp-config.php]
/**
 * WordPress Automatic Update Configuration
 */

// Enable automatic updates for WordPress core
define( 'WP_AUTO_UPDATE_CORE', true );
```

<br>

**2. Enable automatic plugin and theme updates** — Add this to your active theme's `functions.php`:

```php [/public_html/wp-content/themes/your-theme/functions.php]
// Apply all minor and security updates to plugins
add_filter( 'auto_update_plugin', '__return_true' );

// Apply all minor and security updates to themes
add_filter( 'auto_update_theme', '__return_true' );
```

<br>

## Option 2 — Automatic updates via OS Cloud panel

You can also enable automatic updates directly from the **OS Cloud** panel. This option gives you **selective control** — enable updates per plugin or theme rather than across the board.

<br>

<img width="612" height="271" alt="image" src="https://github.com/user-attachments/assets/080d11d1-e004-414b-b2a4-a1e749b69c1b" />

<br>

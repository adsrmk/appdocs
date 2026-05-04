# Disable File Editing

WordPress includes a built-in code editor that lets you edit theme and plugin files directly from the admin dashboard. While convenient, it's also a major security risk — if an attacker gains access to your dashboard, they can inject malicious code straight into your site.

We recommend disabling this editor by adding the following line to your `wp-config.php` file:

```php [/public_html/wp-config.php]
// Disallow file editing from the WordPress dashboard
define( 'DISALLOW_FILE_EDIT', true );
```

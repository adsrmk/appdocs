# Obfuscate WordPress Structure

You can hide WordPress's default folder structure for extra protection against automated scanners and basic attacks. This changes the directories and structural paths WordPress uses.

<div class="warning custom-block" style="padding-top: 8px">
This is <b>not a security feature</b> on its own. It only obscures WordPress-specific paths and fingerprints. Proper security measures — updates, firewalls, authentication hardening, etc. — are still required.
</div>

<br>

## Rewrite the `wp-content` directory

You can rewrite the `wp-content` directory to any path you like. Add the following to your `wp-config.php` and replace `/assets` with your preferred directory:

```php [/public_html/wp-config.php]
define('WP_CONTENT_DIR', dirname(__FILE__) . '/assets');
define('WP_CONTENT_URL', '/assets');
```

<br>

### Rewrite the plugins directory

You can also rewrite the `/plugins` directory. Make sure the path matches the directory you defined above (`assets/...`):

```php [/public_html/wp-config.php]
define('WP_PLUGIN_DIR', dirname(__FILE__) . '/assets/lib');
define('WP_PLUGIN_URL', '/assets/lib');
```

<br>

### Move the uploads directory

To move the uploads directory to a custom path:

```php [/public_html/wp-config.php]
define('UPLOADS', 'assets/img');
```

<div class="warning custom-block" style="padding-top: 8px">
If you change these directories, make sure the actual folders on disk are renamed to match — otherwise WordPress won't be able to locate them.
</div>

<img width="1187" height="357" alt="image" src="https://github.com/user-attachments/assets/13c075ec-0f5c-4de4-b621-899b19ced371" />

<br>

**Example mapping:**

| Default | New path |
| --- | --- |
| `wp-content` | `/assets` |
| `plugins` | `/assets/lib` |
| `themes` | `/assets/core` |
| `uploads` | `/assets/img` |

<br>

### (Optional) Disable month/year upload folders

To stop WordPress from creating folders like `/2026/03/` inside `uploads`:

1. Log in to the WordPress admin panel.
2. Go to **Settings → Media**.
3. Disable **Organize my uploads into month- and year-based folders**.
4. Save changes.

<br>

<img width="589" height="208" alt="image" src="https://github.com/user-attachments/assets/cbc7c590-c504-4abd-b0f4-e5b3170c50a2" />

<br>

## Rename the theme directory

WordPress doesn't provide a constant to change the theme directory. Instead, you can do it through a **MU (Must-Use) plugin**.

1. Inside your `wp-content` directory (or your renamed equivalent), create a new folder called `mu-plugins`.
2. Inside that folder, create a new file called `theme-core.php`.
3. Paste the following code and replace `core` with your desired theme folder name:

```php [/public_html/wp-content/mu-plugins/theme-core.php]
<?php
add_filter('theme_root', function () {
    return WP_CONTENT_DIR . '/core';
});

add_filter('theme_root_uri', function () {
    return WP_CONTENT_URL . '/core';
});
```

<br>

## NGINX security & performance rules

For optimal security, block all external access to the `mu-plugins` directory — only the server itself should be able to read its files. While you're at it, you can also improve performance by adding cache headers for all static assets (images, CSS, JavaScript) served from `/assets/`.

```nginx [vhost.conf]
location ~* /mu-plugins/.*\.php$ {
    deny all;
}

location /assets/ {
    expires 30d;
    access_log off;
    log_not_found off;
}
```

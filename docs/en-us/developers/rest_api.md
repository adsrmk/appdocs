# Disable REST API

The WordPress REST API allows external applications and services to interact with your site programmatically. It's powerful — but if left unrestricted, it can expose data to anonymous users. For most brochure sites or classic CMS-driven websites, public REST access is unnecessary and only increases the attack surface.

<div class="warning custom-block" style="padding-top: 8px">
Do <b>not</b> restrict the REST API if your site uses Headless WordPress, mobile apps, advanced page builders, or external integrations like WooCommerce. Doing so may break functionality.
</div>

<br>

## Why restrict it?

By default, parts of the REST API are accessible to anonymous visitors. This allows attackers to:

- Enumerate users and content
- Gather site structure and metadata
- Probe endpoints for vulnerabilities

Restricting access ensures only authenticated users or trusted services can interact with the API.

<br>

## How to enable this protection

Add the following snippet to your active theme's `functions.php` file:

```php [/public_html/wp-content/themes/your-theme/functions.php]
add_filter('rest_authentication_errors', function ($result) {
    if (!is_user_logged_in()) {
        return new WP_Error(
            'rest_forbidden',
            'REST API access is restricted.',
            ['status' => 401]
        );
    }
    return $result;
});
```

Once added, anonymous requests to the REST API will return a **401 Unauthorized** response, while logged-in users continue to have full access.

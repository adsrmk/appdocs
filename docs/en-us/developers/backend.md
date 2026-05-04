# Secure the wp-login Backend

The `/wp-login.php` page is the default "front door" of every WordPress site — and the primary target for hackers and automated bots. Securing it is one of the most effective steps you can take to protect your website.

<br>

## Why secure wp-login.php?

By default, the login page is publicly accessible at `yourdomain.com/wp-login.php` or `yourdomain.com/login`. This exposes your site to two specific threats:

- **Brute force attacks** — Automated bots try thousands of username and password combinations per minute to gain access.
- **Server resource exhaustion** — Every login attempt starts a new PHP process. A heavy attack can spike your resource usage, slow your site down, or even crash the server.

The good news: there are several ways to harden your login page. You can also combine them for layered protection.

<br>

## Method 1 — Change the login URL

The simplest way to stop "blind" bots is to move the door. Instead of the standard URL, choose something unique like `/private-access` or `/my-secret-entry`.

**How:** Install the lightweight [WPS Hide Login↗](https://nl.wordpress.org/plugins/wps-hide-login/) plugin.

**Benefit:** No technical knowledge required. Once changed, any bot trying to reach `wp-login.php` will receive a **404 Not Found** error.

<br>

## Method 2 — Use a Web Application Firewall (WAF)

A WAF filters traffic between your site and the rest of the internet. Services like **Cloudflare** and **Sucuri**, or plugins like **Wordfence**, can block suspicious traffic before it ever reaches your login page.

- **Cloudflare** — Set up a *Page Rule* to trigger a JavaScript challenge (managed challenge) for anyone visiting `wp-login.php`.
- **Wordfence** — Maintains a global database of malicious IP addresses and blocks visitors that show bot-like behaviour automatically.

<br>

## Method 3 — Restrict access by IP

If you have a static IP address, you can restrict `wp-login.php` access directly in `wp-config.php`. Visitors whose IP isn't in your list are blocked entirely.

<div class="tip custom-block" style="padding-top: 8px">
This is an ideal setup for customers using <b>OS Cloud SSO</b>. You can still bypass the login screen via the dashboard while keeping the site locked down against brute-force attacks.
</div>

Add the following code at the top of your `wp-config.php` file:

```php [/public_html/wp-config.php]
// Security: Restrict wp-login.php to specific IPs
if (strpos($_SERVER['REQUEST_URI'], 'wp-login.php') !== false) {
    $allowed_ips = ['123.456.789.000', '111.222.333.444']; // Add your IPs here
    if (!in_array($_SERVER['REMOTE_ADDR'], $allowed_ips)) {
        header('HTTP/1.1 403 Forbidden');
        die('Access Denied: Your IP address is not authorized.');
    }
}
```

<br>

## Hide valid usernames

By default, WordPress shows detailed login error messages — like whether the username or password was wrong. Helpful for legitimate users, but it also lets attackers confirm which usernames exist on your site. Since you already know your own username, you can safely disable this.

Add the following code to your active theme's `functions.php`:

```php [/public_html/wp-content/themes/your-theme/functions.php]
add_filter('login_errors', function() {
    return 'Login failed.';
});
```

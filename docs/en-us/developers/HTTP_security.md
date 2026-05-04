# HTTP Security Headers

Beyond firewalls and application-level security, you can give the browser specific instructions on how to handle your site's content. **HTTP security headers** are sent with every server response and act as a set of policies the browser agrees to enforce.

Implementing them is one of the fastest, highest-impact ways to protect your site against attacks like clickjacking, cross-site scripting (XSS), and protocol downgrade attacks.

<br>

## Implementation methods

You can apply security headers in two main ways:

### Option 1 — Web server configuration

Configure headers directly in your server's config files — `httpd.conf` (Apache) or `nginx.conf` (Nginx).

<div class="tip custom-block" style="padding-top: 8px">
If you host your website with <b>OS Cloud</b>, most of these headers are already configured at the Nginx level. Some security scanners may not detect them correctly though — in that case, you can also apply them via Option 2 (PHP-based) to make them visible to the scanner.
</div>

<br>

### Option 2 — WordPress (PHP-based)

Add the headers through your theme's `functions.php` file or a custom plugin, using PHP's `header()` function. This is easier to manage and version-control as a developer.

The examples below use this method, hooked into the `send_headers` action:

```php [/public_html/wp-content/themes/your-theme/functions.php]
add_action( 'send_headers', 'add_security_headers' );

function add_security_headers() {
    // All header() calls go in here
}
```

<br>

## 1. HTTP Strict Transport Security (HSTS)

The most important header for any site using HTTPS. It tells the browser to only ever communicate with your site over a secure HTTPS connection.

- **What it prevents:** SSL stripping and man-in-the-middle attacks, where an attacker tries to downgrade a user's connection from HTTPS to insecure HTTP.
- **How it works:** After a user's first visit, the browser remembers the HSTS policy. For all future visits within the `max-age` window, the browser refuses HTTP and automatically upgrades requests to HTTPS — even if the user types `http://` or follows an insecure link.

```php
// max-age is in seconds — 1 year = 31536000
// 'includeSubDomains' applies the policy to all subdomains
// 'preload' is for submission to the HSTS preload list
header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
```

<br>

## 2. X-Frame-Options

Prevents other sites from embedding your pages in an `<iframe>`, `<frame>`, or `<object>` element.

- **What it prevents:** Clickjacking — where a malicious site loads your site in a transparent iframe over their own content. The attacker tricks the user into clicking what looks like a harmless button, but the click actually triggers a hidden element on your site (for example, **Delete Account** or **Confirm Purchase**).
- **How it works:** The browser checks this header and refuses to render the page inside a frame if the policy forbids it.

```php
// DENY: no one can embed your site (most secure)
header('X-Frame-Options: DENY');

// SAMEORIGIN: only your own site can embed its pages
// header('X-Frame-Options: SAMEORIGIN');
```

<br>

## 3. X-Content-Type-Options

Forces the browser to respect the `Content-Type` sent by your server and disables **MIME-type sniffing**.

- **What it prevents:** MIME-sniffing attacks. For example, a user uploads a file that looks like an image (`image.jpg`) but actually contains malicious JavaScript. Without this header, some browsers may inspect the contents, decide it's a script, and execute it.
- **How it works:** The header has only one valid directive: `nosniff`. It tells the browser never to second-guess the server's declared `Content-Type` — if the server says a file is `image/jpeg`, the browser must treat it strictly as an image.

```php
header('X-Content-Type-Options: nosniff');
```

<br>

## 4. Referrer-Policy

Controls how much referrer information the browser sends when a user clicks a link to leave your site.

- **What it prevents:** Accidentally leaking sensitive information through URLs. If your URLs contain private data (for example, `yourdomain.com/user/123/reset-password-token`), you don't want that full URL sent to a third-party site in the `Referer` header.
- **How it works:** Lets you define a policy that controls how much (or how little) referrer information is sent with outgoing requests.

```php
// strict-origin-when-cross-origin:
// - Sends the full URL when navigating within your own site
// - Sends only the origin (e.g. https://yourdomain.com/) when navigating to another site
// A secure default that preserves privacy while still letting analytics see traffic sources.
header('Referrer-Policy: strict-origin-when-cross-origin');
```

<br>

## 5. Content-Security-Policy (CSP)

The most complex and powerful security header. CSP lets you define a whitelist of sources from which the browser is allowed to load assets — scripts, styles, images, fonts, and more.

- **What it prevents:** Cross-Site Scripting (XSS) and other data injection attacks.

<div class="warning custom-block" style="padding-top: 8px">
A full CSP implementation requires careful auditing of every asset your site loads — it's a much larger topic than the others above. The four headers before this one are the "quick wins" that can be applied to almost any site with minimal configuration.
</div>

```php
// Only allows scripts to be loaded from your own domain
header("Content-Security-Policy: script-src 'self'");
```

<br>

There are many more security header options available, but these five offer the biggest gains with the smallest configuration effort.

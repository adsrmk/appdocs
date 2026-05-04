# Block User Enumeration

User enumeration is a common technique attackers use to discover valid WordPress usernames. By default, WordPress can expose usernames through author archive URLs such as `?author=1`. Once a valid username is known, attackers can run brute-force or credential-stuffing attacks much more effectively.

<br>

## Why block user enumeration?

If user enumeration is left enabled, attackers can:

- Identify valid usernames on your site
- Reduce the time needed to break into accounts
- Specifically target administrators

Blocking this behaviour limits the information exposed to anonymous visitors and improves the overall security of your site.

<br>

## How to enable this protection

Add the following code to your `wp-config.php` file:

```php [/public_html/wp-config.php]
if (isset($_SERVER['QUERY_STRING']) &&
    preg_match('/author=([0-9]*)/i', $_SERVER['QUERY_STRING'])
) {
    header('HTTP/1.1 403 Forbidden');
    exit('Access denied');
}
```

Once added, any visitor trying to access an author archive URL like `yourdomain.com/?author=1` will receive a **403 Forbidden** response instead of revealing the matching username.

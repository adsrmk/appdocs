# Configure & Edit PHP

**PHP (Hypertext Preprocessor)** is a server-side scripting language used for web development. On **OS Cloud**, you have several options to customise your site's PHP version, extensions, and configuration.

<br>

## PHP version

We recommend using the latest stable PHP version for optimal performance and security. To use a different version, switch the PHP engine in **Advanced → Developer Tools**.

<div class="warning custom-block" style="padding-top: 8px">
PHP versions older than 8.0 are not supported due to security and performance concerns. If you need an older version, you can request it — but we are <b>not responsible</b> for any issues or vulnerabilities that may result from using outdated PHP versions.
</div>

<img width="844" height="105" alt="image" src="https://github.com/user-attachments/assets/a52a0028-9a8b-4593-9e2e-14de3ad5c608" />

<br>

## Extensions

PHP extensions are modules that add extra functionality — like database connections, image processing, or encryption. You can enable or disable them directly in the panel.

You can enable up to **five additional extensions**. We recommend activating **Brotli** and **APCu** by default.

| Extension | Description |
| --- | --- |
| **Brotli** | A compression algorithm by Google, more efficient than Gzip. Reduces bandwidth usage and improves load times. |
| **APCu** | An in-memory caching layer that speeds up PHP by storing frequently accessed data in RAM, reducing database queries. |
| XMLRPC | Enables XML-RPC support, allowing PHP applications to communicate with remote servers using XML-based messages. |
| OAuth | Provides OAuth authentication for secure authorisation between applications (commonly used for social logins). |
| PdoDblib | A PDO driver for Microsoft SQL Server and Sybase databases via the FreeTDS library. |

<br>

## PHP error log

The PHP error log records warnings, errors, and issues occurring in your PHP application — useful for debugging.

You can find the log in your website's home directory as `php-error.log`.

<div class="tip custom-block" style="padding-top: 8px">
Since panel version <b>12.0+</b>, you can also view the log directly within the <b>PHP section</b> in the panel.
</div>

<img width="836" height="436" alt="image" src="https://github.com/user-attachments/assets/2e767c22-cd56-463e-aca0-dce89e52263d" />

<br>

## PHP.ini editor  <Badge type="info" text="Enterprise" />

<div class="tip custom-block" style="padding-top: 8px">
This feature is only available for Enterprise customers on the <b>Managed VPS</b> plan. The default values are optimised for most use cases — only edit them if you know what you're doing.
</div>

You can override PHP configuration values to fit your website's needs. For example, if a site needs more resources, you can increase the **memory limit** for smoother performance.

In **Developer Tools → PHP.ini Editor** (second block), click **Add Directive** to define a new value.

<img width="844" height="166" alt="image" src="https://github.com/user-attachments/assets/5a06a9b1-01fb-42b8-9dfd-ee8a533fc05b" />

A full list of available **PHP directives** can be found on the official PHP website: [php.net/manual/en/ini.list.php↗](https://www.php.net/manual/en/ini.list.php)

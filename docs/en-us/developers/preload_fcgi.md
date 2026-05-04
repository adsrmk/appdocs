# Preload FastCGI Cache

FastCGI Cache is fast and efficient, but it has one limitation: cached content is only generated **after** an actual user requests a page — and entries expire after about an hour. That means the first visitor to a fresh page never benefits from the cache.

A **cache warm-up** process solves this by periodically requesting your website's URLs in advance, so cached content is always ready before real visitors arrive.

<br>

## Step 1 — Create the preload script

1. In the **File Manager**, navigate to `public_html/` and create a new file called `preload.php`.
2. Paste the code below into the file.
3. Update the `$sitemapUrl` to match your website's actual sitemap URL.

```php [/public_html/preload.php]
<?php
$sitemapUrl = 'https://yourdomain.com/sitemap.xml';

// Fetch the sitemap with cURL (bypasses allow_url_fopen restrictions)
$ch = curl_init($sitemapUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_USERAGENT      => 'Sitemap-Warmer-Bot'
]);
$xmlContent = curl_exec($ch);
$httpCode   = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($httpCode !== 200) {
    die("Error: Could not fetch sitemap. HTTP Code: $httpCode");
}

// Parse the XML
$xml = simplexml_load_string($xmlContent);
if (!$xml) {
    die("Error: Failed to parse XML. Is the sitemap valid?");
}

// Handle namespaces (the "white screen" fix)
$ns = $xml->getDocNamespaces();
$xml->registerXPathNamespace('s', $ns[''] ?? 'http://www.sitemaps.org/schemas/sitemap/0.9');
$urls = $xml->xpath('//s:url');

if (empty($urls)) {
    die("Error: No URLs found in sitemap. Check the XML structure.");
}

// Warm the cache
foreach ($urls as $url) {
    $loc = (string) $url->loc;
    $chWarmer = curl_init($loc);
    curl_setopt_array($chWarmer, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_USERAGENT      => 'Nginx-FastCGI-Cache-Warmer',
    ]);
    curl_exec($chWarmer);
    $status = curl_getinfo($chWarmer, CURLINFO_HTTP_CODE);
    echo date('H:i:s') . " [$status] Processing: $loc<br>";
    usleep(100000);
}

echo "Done!";
```

<br>

## Step 2 — Schedule the script as a cron job

In **Developer Tools**, create a new cron job using the command below. Replace the UUID with your website's directory name (the example below uses `5e43c690-1937-47aa-9ff5-e1c2d7daebb7`):

```bash
/usr/bin/php /var/www/5e43c690-1937-47aa-9ff5-e1c2d7daebb7/public_html/preload.php > /dev/null 2>&1
```

<div class="info custom-block" style="padding-top: 8px">
Because cached files expire after one hour, set the execution interval to <b>1 hour</b>. Running the cron more frequently has no effect, and longer intervals leave gaps where visitors hit uncached pages.
</div>

<br>

### Find your website's UUID

If you're not sure what your site's UUID is:

1. Go to the **File Manager**.
2. Right-click any file and select **Get Info**.
3. Copy the UUID from the file's location path.

<img width="755" height="333" alt="image" src="https://github.com/user-attachments/assets/c8d5c85e-e041-431d-b332-cf6aa1157b54" />

<br>

## Step 3 — Verify it works

Visit the script directly in your browser at `https://yourdomain.com/preload.php`. If the output runs through your sitemap URLs and ends with `Done!`, cache warming is working correctly.

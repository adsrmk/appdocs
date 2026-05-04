# FastCGI Cache preloaden

FastCGI Cache is snel en efficiënt, maar heeft één beperking: gecachte content wordt pas gegenereerd **nadat** een echte bezoeker een pagina opvraagt — en verloopt na ongeveer een uur. Dat betekent dat de eerste bezoeker van een verse pagina nooit profiteert van de cache.

Met een **cache warm-up** los je dit op door vooraf periodiek de URL's van je site op te vragen, zodat de gecachte versie al klaarstaat voordat een echte bezoeker arriveert.

<br>

## Stap 1 — Maak het preload-script aan

1. Ga in de **Bestandsbeheerder** naar `public_html/` en maak een nieuw bestand aan met de naam `preload.php`.
2. Plak de onderstaande code in het bestand.
3. Pas de `$sitemapUrl` aan zodat deze verwijst naar de daadwerkelijke sitemap-URL van je site.

```php [/public_html/preload.php]
<?php
$sitemapUrl = 'https://jouwdomein.nl/sitemap.xml';

// Sitemap ophalen via cURL (omzeilt allow_url_fopen-beperkingen)
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

// XML parsen
$xml = simplexml_load_string($xmlContent);
if (!$xml) {
    die("Error: Failed to parse XML. Is the sitemap valid?");
}

// Namespaces afhandelen (de 'white screen'-fix)
$ns = $xml->getDocNamespaces();
$xml->registerXPathNamespace('s', $ns[''] ?? 'http://www.sitemaps.org/schemas/sitemap/0.9');
$urls = $xml->xpath('//s:url');

if (empty($urls)) {
    die("Error: No URLs found in sitemap. Check the XML structure.");
}

// Cache opwarmen
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

## Stap 2 — Plan het script als cron job

Maak in **Ontwikkelaarstools** een nieuwe cron job aan met de onderstaande opdracht. Vervang de UUID door de mapnaam van je website (in dit voorbeeld: `5e43c690-1937-47aa-9ff5-e1c2d7daebb7`):

```bash
/usr/bin/php /var/www/5e43c690-1937-47aa-9ff5-e1c2d7daebb7/public_html/preload.php > /dev/null 2>&1
```

<div class="info custom-block" style="padding-top: 8px">
Omdat gecachte bestanden na één uur verlopen, raden we aan het uitvoeringsinterval op <b>1 uur</b> te zetten. Vaker uitvoeren heeft geen effect, en langere intervallen zorgen ervoor dat bezoekers alsnog op een niet-gecachte pagina terechtkomen.
</div>

<br>

### Je UUID vinden

Weet je niet zeker wat de UUID van je website is?

1. Ga naar de **Bestandsbeheerder**.
2. Klik met de rechtermuisknop op een willekeurig bestand en kies **Info bekijken**.
3. Kopieer de UUID uit het locatiepad van het bestand.

<img width="755" height="333" alt="image" src="https://github.com/user-attachments/assets/c8d5c85e-e041-431d-b332-cf6aa1157b54" />

<br>

## Stap 3 — Controleer of het werkt

Open het script direct in je browser via `https://jouwdomein.nl/preload.php`. Loopt het script door je sitemap-URL's heen en eindigt het met `Done!`? Dan werkt het opwarmen van de cache zoals verwacht.

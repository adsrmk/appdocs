# WordPress-bestanden en -versie verbergen

WordPress toont standaard zijn versienummer op meerdere plekken — in de site-header, RSS-feeds en asset-URL's. Aanvallers gebruiken die informatie om gerichte aanvallen uit te voeren op bekende kwetsbaarheden. De onderstaande code-snippets verbergen deze informatie zonder dat het de werking van je site beïnvloedt.

<div class="info custom-block" style="padding-top: 8px">
Voeg de onderstaande snippets toe aan het <code>functions.php</code>-bestand van je actieve thema, direct onder de openings-tag <code>&lt;?php</code>.
</div>

<br>

## Versie verwijderen uit header & RSS-feeds

WordPress voegt het versienummer standaard toe aan de site-header en RSS-feeds. Door dit te verwijderen wordt het voor aanvallers lastiger om jouw WordPress-versie te identificeren.

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
// Versienummer uit de header verwijderen
remove_action('wp_head', 'wp_generator');

// Versienummer uit RSS-feeds verwijderen
function remove_wp_version_rss() {
    return '';
}
add_filter('the_generator', 'remove_wp_version_rss');
```

<br>

## Versie verwijderen uit stylesheets & scripts

WordPress voegt zijn versienummer toe aan CSS- en JavaScript-bestanden als query-string (bijvoorbeeld `style.css?ver=6.5`). Dit is handig voor caching, maar geeft tegelijkertijd je versie prijs aan potentiële aanvallers.

De onderstaande snippet verwijdert deze versie-strings uit alle ingeladen CSS- en JS-bestanden:

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
// Versie-query-strings verwijderen uit statische bestanden
function remove_cssjs_ver($src) {
    if (strpos($src, 'ver=') !== false) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('style_loader_src', 'remove_cssjs_ver', 10, 2);
add_filter('script_loader_src', 'remove_cssjs_ver', 10, 2);
```

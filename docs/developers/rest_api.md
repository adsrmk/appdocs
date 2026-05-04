# REST-API uitschakelen

De WordPress REST-API maakt het mogelijk dat externe applicaties en diensten programmatisch met je site communiceren. Krachtig — maar als de toegang niet wordt beperkt, kan dit data blootstellen aan anonieme gebruikers. Voor de meeste brochure-sites of klassieke CMS-websites is publieke REST-toegang overbodig en vergroot het alleen het aanvalsoppervlak.

<div class="warning custom-block" style="padding-top: 8px">
Beperk de REST-API <b>niet</b> als je site gebruikmaakt van Headless WordPress, mobiele apps, geavanceerde paginabouwers of externe integraties zoals WooCommerce. Dit kan namelijk functionaliteit breken.
</div>

<br>

## Waarom beperken?

Standaard zijn delen van de REST-API toegankelijk voor anonieme bezoekers. Aanvallers kunnen hierdoor:

- Gebruikers en content enumereren
- Sitestructuur en metadata verzamelen
- Endpoints aftasten op kwetsbaarheden

Door de toegang te beperken zorg je ervoor dat alleen ingelogde gebruikers of vertrouwde diensten met de API kunnen communiceren.

<br>

## Hoe schakel je deze bescherming in?

Voeg de onderstaande snippet toe aan het `functions.php`-bestand van je actieve thema:

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
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

Zodra de code is toegevoegd, krijgen anonieme verzoeken aan de REST-API een **401 Unauthorized**-respons. Ingelogde gebruikers houden volledige toegang.

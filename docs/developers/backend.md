# wp-login backend beveiligen

De pagina `/wp-login.php` is de standaard "voordeur" van elke WordPress-site — en daarmee het belangrijkste doelwit voor hackers en geautomatiseerde bots. Het beveiligen van deze pagina is een van de effectiefste stappen om je website te beschermen.

<br>

## Waarom wp-login.php beveiligen?

Standaard is de loginpagina openbaar toegankelijk via `jouwdomein.nl/wp-login.php` of `jouwdomein.nl/login`. Hierdoor staat je site bloot aan twee specifieke risico's:

- **Brute-force-aanvallen** — Geautomatiseerde bots proberen duizenden gebruikersnaam- en wachtwoordcombinaties per minuut om binnen te komen.
- **Uitputting van serverbronnen** — Elke loginpoging start een nieuw PHP-proces. Een zware aanval kan je resourcegebruik laten pieken, je site vertragen of zelfs de server laten crashen.

Het goede nieuws: er zijn meerdere manieren om je loginpagina te beveiligen. Voor extra zekerheid kun je ze ook combineren.

<br>

## Methode 1 — De login-URL wijzigen

De eenvoudigste manier om "blinde" bots te stoppen is de deur verplaatsen. Kies in plaats van de standaard-URL iets unieks zoals `/prive-toegang` of `/mijn-geheime-ingang`.

**Hoe:** Installeer de lichte plugin [WPS Hide Login↗](https://nl.wordpress.org/plugins/wps-hide-login/).

**Voordeel:** Geen technische kennis vereist. Zodra de URL is gewijzigd, krijgt elke bot die `wp-login.php` probeert te bereiken een **404 Niet gevonden**-foutmelding.

<br>

## Methode 2 — Een Web Application Firewall (WAF) gebruiken

Een WAF filtert het verkeer tussen je site en de rest van het internet. Diensten zoals **Cloudflare** en **Sucuri**, of plugins zoals **Wordfence**, kunnen verdacht verkeer blokkeren voordat het je loginpagina überhaupt bereikt.

- **Cloudflare** — Stel een *Page Rule* in die een JavaScript-uitdaging (managed challenge) activeert voor iedereen die `wp-login.php` bezoekt.
- **Wordfence** — Onderhoudt een wereldwijde database van kwaadaardige IP-adressen en blokkeert automatisch bezoekers die zich bot-achtig gedragen.

<br>

## Methode 3 — Toegang beperken op IP-adres

Heb je een vast IP-adres? Dan kun je de toegang tot `wp-login.php` beperken via je `wp-config.php`-bestand. Bezoekers waarvan het IP-adres niet in jouw lijst staat, worden volledig geblokkeerd.

<div class="tip custom-block" style="padding-top: 8px">
Dit is een ideale opstelling voor klanten die gebruikmaken van <b>OS Cloud SSO</b>. Je kunt namelijk nog steeds via het dashboard om het loginscherm heen, terwijl je site volledig is afgeschermd tegen brute-force-aanvallen.
</div>

Voeg de onderstaande code bovenaan in je `wp-config.php`-bestand toe:

```php [/public_html/wp-config.php]
// Beveiliging: beperk wp-login.php tot specifieke IP-adressen
if (strpos($_SERVER['REQUEST_URI'], 'wp-login.php') !== false) {
    $allowed_ips = ['123.456.789.000', '111.222.333.444']; // Voeg hier je IP-adressen toe
    if (!in_array($_SERVER['REMOTE_ADDR'], $allowed_ips)) {
        header('HTTP/1.1 403 Forbidden');
        die('Toegang geweigerd: je IP-adres is niet geautoriseerd.');
    }
}
```

<br>

## Geldige gebruikersnamen verbergen

Standaard toont WordPress gedetailleerde foutmeldingen bij het inloggen — bijvoorbeeld of je gebruikersnaam of wachtwoord onjuist is. Handig voor legitieme gebruikers, maar het stelt aanvallers ook in staat te bevestigen welke gebruikersnamen op je site bestaan. Omdat je je eigen gebruikersnaam al kent, kun je dit veilig uitschakelen.

Voeg de onderstaande code toe aan het `functions.php`-bestand van je actieve thema:

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
add_filter('login_errors', function() {
    return 'Inloggen mislukt.';
});
```

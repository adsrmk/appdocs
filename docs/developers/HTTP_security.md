# HTTP-beveiligingsheaders

Naast firewalls en beveiliging op applicatieniveau kun je de browser ook directe instructies geven over hoe hij met de inhoud van je site moet omgaan. **HTTP-beveiligingsheaders** worden bij elke serverrespons meegestuurd en fungeren als beveiligingsregels die de browser afdwingt.

Het implementeren ervan is een van de snelste en effectiefste manieren om je site te beschermen tegen aanvallen zoals clickjacking, cross-site scripting (XSS) en protocol-downgrade-aanvallen.

<br>

## Implementatiemethoden

Je kunt beveiligingsheaders op twee manieren toepassen:

### Optie 1 — Webserverconfiguratie

Configureer de headers direct in je serverconfiguratiebestanden — `httpd.conf` (Apache) of `nginx.conf` (Nginx).

<div class="tip custom-block" style="padding-top: 8px">
Host je je website bij <b>OS Cloud</b>? Dan zijn de meeste van deze headers al op Nginx-niveau geconfigureerd. Sommige beveiligingsscanners detecteren ze echter niet altijd correct — in dat geval kun je ze ook via Optie 2 (PHP-based) toepassen, zodat ze zichtbaar zijn voor de scanner.
</div>

<br>

### Optie 2 — WordPress (PHP-based)

Voeg de headers toe via het `functions.php`-bestand van je thema of een eigen plugin, met behulp van de PHP-functie `header()`. Dit is voor ontwikkelaars makkelijker te beheren en in versiebeheer op te nemen.

In de voorbeelden hieronder wordt deze methode gebruikt, gekoppeld aan de `send_headers`-actie:

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
add_action( 'send_headers', 'add_security_headers' );

function add_security_headers() {
    // Alle header()-aanroepen komen hier
}
```

<br>

## 1. HTTP Strict Transport Security (HSTS)

De belangrijkste header voor elke site die HTTPS gebruikt. Hij vertelt de browser om alleen via een veilige HTTPS-verbinding met je site te communiceren.

- **Wat het voorkomt:** SSL stripping en man-in-the-middle-aanvallen, waarbij een aanvaller probeert de verbinding van een gebruiker te downgraden van HTTPS naar onveilig HTTP.
- **Hoe het werkt:** Na het eerste bezoek onthoudt de browser het HSTS-beleid. Bij alle volgende bezoeken binnen de `max-age`-periode weigert de browser HTTP en upgrade hij verzoeken automatisch naar HTTPS — zelfs als de gebruiker `http://` typt of een onveilige link aanklikt.

```php
// max-age is in seconden — 1 jaar = 31536000
// 'includeSubDomains' past het beleid toe op alle subdomeinen
// 'preload' is voor opname in de HSTS preload-lijst
header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
```

<br>

## 2. X-Frame-Options

Voorkomt dat andere sites jouw pagina's insluiten in een `<iframe>`-, `<frame>`- of `<object>`-element.

- **Wat het voorkomt:** Clickjacking — waarbij een kwaadaardige site jouw site in een transparante iframe over hun eigen content laadt. De aanvaller laat de gebruiker op een ogenschijnlijk onschuldige knop klikken, terwijl de klik in werkelijkheid een verborgen element op jouw site activeert (bijvoorbeeld **Account verwijderen** of **Aankoop bevestigen**).
- **Hoe het werkt:** De browser controleert deze header en weigert de pagina in een frame te renderen als het beleid dat verbiedt.

```php
// DENY: niemand mag je site insluiten (meest veilig)
header('X-Frame-Options: DENY');

// SAMEORIGIN: alleen je eigen site mag pagina's insluiten
// header('X-Frame-Options: SAMEORIGIN');
```

<br>

## 3. X-Content-Type-Options

Dwingt de browser de `Content-Type` van je server te respecteren en schakelt **MIME-type sniffing** uit.

- **Wat het voorkomt:** MIME-sniffing-aanvallen. Stel: een gebruiker uploadt een bestand dat lijkt op een afbeelding (`image.jpg`) maar in werkelijkheid kwaadaardige JavaScript bevat. Zonder deze header inspecteren sommige browsers de inhoud, besluiten dat het een script is en voeren het uit.
- **Hoe het werkt:** Deze header heeft slechts één geldige directive: `nosniff`. Hij vertelt de browser om de door de server opgegeven `Content-Type` nooit in twijfel te trekken — als de server zegt dat een bestand `image/jpeg` is, behandelt de browser het strikt als afbeelding.

```php
header('X-Content-Type-Options: nosniff');
```

<br>

## 4. Referrer-Policy

Bepaalt hoeveel verwijzingsinformatie (referrer) de browser meestuurt wanneer een gebruiker je site verlaat via een link.

- **Wat het voorkomt:** Onbedoeld lekken van gevoelige informatie via URL's. Bevatten je URL's bijvoorbeeld privégegevens (zoals `jouwdomein.nl/user/123/reset-password-token`)? Dan wil je niet dat die volledige URL in de `Referer`-header naar een externe site wordt verstuurd.
- **Hoe het werkt:** Hiermee bepaal je een beleid voor hoeveel (of hoe weinig) verwijzingsinformatie er wordt meegestuurd bij uitgaande verzoeken.

```php
// strict-origin-when-cross-origin:
// - Stuurt de volledige URL bij navigatie binnen je eigen site
// - Stuurt alleen de origin (bijv. https://jouwdomein.nl/) bij navigatie naar een andere site
// Een veilige default die privacy beschermt en analytics toch traffic-bronnen laat zien.
header('Referrer-Policy: strict-origin-when-cross-origin');
```

<br>

## 5. Content-Security-Policy (CSP)

De meest complexe en krachtigste beveiligingsheader. Met CSP definieer je een whitelist van bronnen waarvan de browser assets mag laden — scripts, stijlen, afbeeldingen, fonts en meer.

- **Wat het voorkomt:** Cross-Site Scripting (XSS) en andere data-injectie-aanvallen.

<div class="warning custom-block" style="padding-top: 8px">
Een volledige CSP-implementatie vereist een zorgvuldige audit van alle assets die je site laadt — dit is een veel breder onderwerp dan de andere headers hierboven. De vier headers daarvóór zijn de "quick wins" die op vrijwel elke site met minimale configuratie kunnen worden toegepast.
</div>

```php
// Staat alleen scripts toe vanaf je eigen domein
header("Content-Security-Policy: script-src 'self'");
```

<br>

Er zijn nog veel meer beveiligingsheaders beschikbaar, maar deze vijf bieden de grootste winst met de minste configuratie.

# Indexering

Als ontwikkelaar heb je nauwkeurige tools om te bepalen hoe zoekmachine-bots (zoals Googlebot) je site crawlen en indexeren. Alleen content maken is niet voldoende — je moet zoekmachines ook actief sturen, zodat ze zich richten op **waardevolle pagina's** en irrelevante negeren. Dat bespaart crawl-budget en voorkomt rommelige zoekresultaten.

Er zijn drie hoofdtools beschikbaar, elk met een eigen doel:

1. **`robots.txt`** — Globale instructies voor welke gebieden bots mogen crawlen.
2. **`<meta name="robots">`** — Per-pagina indexeringsinstructies binnen HTML.
3. **`X-Robots-Tag`** — HTTP-header voor bestanden die geen HTML zijn (PDF's, afbeeldingen, etc.).

<br>

## 1. Het `robots.txt`-bestand

`robots.txt` is een tekstbestand in de root van je domein (`jouwdomein.nl/robots.txt`) dat bots raadplegen voordat ze gaan crawlen. Het geeft **globale** instructies over welke onderdelen van je site moeten worden overgeslagen.

**Geschikt voor:**

- Het blokkeren van backend-gebieden (`/wp-admin/`)
- Het voorkomen van crawls van bestanden die niet hoeven te worden geïndexeerd (`/wp-includes/`, `/wp-content/plugins/`)
- Het blokkeren van interne zoekresultaten (`Disallow: /?s=`)

<div class="warning custom-block" style="padding-top: 8px">
<code>robots.txt</code> is een <b>richtlijn, geen firewall</b>. Kwaadaardige bots negeren het. Als een geblokkeerde pagina ergens anders op het web wordt gelinkt, kan Google deze alsnog indexeren (zonder de inhoud) en weergeven in zoekresultaten met de melding <i>"Er is geen informatie beschikbaar voor deze pagina."</i> Wil je een pagina écht uit de zoekresultaten houden? Gebruik dan de <code>noindex</code>-metatag.
</div>

<br>

**Aanbevolen `robots.txt` voor WordPress:**

```text [/public_html/robots.txt]
User-agent: *
# Backend en niet-publieke assetmappen niet crawlen
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/themes/

# AJAX-endpoint toestaan, wordt door sommige front-end-functionaliteiten gebruikt
Allow: /wp-admin/admin-ajax.php

# Interne zoekresultaten blokkeren om crawl-verspilling te voorkomen
Disallow: /?s=
Disallow: /search/

# Geef expliciet de locatie van je sitemap aan
Sitemap: https://www.jouwdomein.nl/sitemap_index.xml
```

<br>

## 2. De `<meta name="robots">`-tag

De meta-robots-tag is een HTML-element in de `<head>` van een specifieke pagina. Het geeft crawlers expliciete instructies over hoe ze met die ene URL moeten omgaan — een veel betrouwbaardere manier dan `robots.txt` om specifieke content uit zoekresultaten te houden.

### Belangrijkste directives

- **`index`** — Sta indexering van de pagina toe (standaard).
- **`noindex`** — Toon deze pagina niet in zoekresultaten. De belangrijkste directive voor het beheren van indexering.
- **`follow`** — Sta crawlers toe links op deze pagina te volgen (standaard).
- **`nofollow`** — Volg geen enkele link op deze pagina. Handig om te voorkomen dat link-equity wordt doorgegeven.

### Veelvoorkomende combinaties

- **`noindex, follow`** — "Indexeer deze pagina niet, maar volg wel de links erop om andere waardevolle pagina's te vinden." De meest gebruikte combinatie voor laagwaardige pagina's zoals gepagineerde archieven, auteurspagina's op blogs met één auteur of "Bedankt"-pagina's.
- **`noindex, nofollow`** — "Indexeer deze pagina niet en volg geen links." Handig voor pagina's met user-generated content die je niet wilt onderschrijven.

<br>

### Implementatie in WordPress

Je kunt de tag programmatisch toevoegen. Bijvoorbeeld om alle gepagineerde archiefpagina's vanaf pagina 2 op `noindex` te zetten:

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
/**
 * Voeg een 'noindex, follow'-metatag toe aan gepagineerde archieven.
 */
add_action('wp_head', 'noindex_paginated_archives');

function noindex_paginated_archives() {
    // is_paged() controleert of we op pagina 2 of hoger van een archief zijn
    if ( is_paged() ) {
        echo '<meta name="robots" content="noindex,follow" />';
    }
}
```

<br>

## 3. De `X-Robots-Tag`-HTTP-header

`X-Robots-Tag` werkt precies hetzelfde als de meta-robots-tag, maar wordt verstuurd als onderdeel van de HTTP-respons-header — daardoor werkt hij ook voor **niet-HTML-bronnen** waarin je geen `<meta>`-tag kunt opnemen. Dit maakt hem de juiste tool voor bestanden zoals PDF's, afbeeldingen of officebestanden.

### Implementatie

Je kunt `X-Robots-Tag` op serverniveau configureren (`.htaccess` voor Apache of `nginx.conf` voor Nginx), of programmatisch via PHP.

**Voorbeeld — voorkom dat PDF's worden geïndexeerd:**

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
/**
 * Voeg een X-Robots-Tag HTTP-header toe om indexering van PDF's te blokkeren.
 */
add_action('template_redirect', 'block_pdf_indexing');

function block_pdf_indexing() {
    // Controleer of het huidige verzoek een PDF-bestand betreft
    if ( is_attachment() && strpos( get_post_mime_type(), 'application/pdf' ) !== false ) {
        header('X-Robots-Tag: noindex,nofollow');
    }
}
```

<br>

## Quick reference

| Taak | `robots.txt` | `<meta name="robots">` | `X-Robots-Tag` |
| --- | :---: | :---: | :---: |
| Hele directory blokkeren voor crawls (bijv. `/wp-admin/`) | **Ja** | Nee | Nee |
| Eén pagina uit zoekresultaten houden | Nee | **Ja** | Ja |
| PDF- of afbeeldingsbestand niet laten indexeren | Nee | Nee | **Ja** |
| Crawl-budget besparen op laagwaardige secties | **Ja** | Ja | Ja |

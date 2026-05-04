# XML-sitemaps in WordPress

Een **XML-sitemap** is een bestand dat alle belangrijke URL's van je website opsomt en fungeert als routekaart voor zoekmachine-crawlers. Het laat ze weten welke pagina's belangrijk zijn, wanneer ze het laatst zijn bijgewerkt en hoe vaak ze veranderen.

Sinds WordPress 5.5 wordt er automatisch een basis-sitemap gegenereerd — maar voor optimale SEO-prestaties moeten ontwikkelaars deze output vaak aanpassen.

<img width="997" height="559" alt="image" src="https://github.com/user-attachments/assets/7d8fd573-efb0-4030-a3df-7221c93b3723" />

<br>

## Waarom de standaard-sitemap niet altijd voldoet

De standaard WordPress-sitemap is een prima vertrekpunt, maar heeft enkele beperkingen:

- **Te inclusief** — Alle openbare berichten, pagina's, categorieën en tags worden standaard meegenomen. Hierdoor kunnen zoekmachines ook *thin content*-pagina's indexeren (bijvoorbeeld een tag die maar bij één bericht hoort).
- **Geen media-informatie** — De standaard-sitemap bevat geen afbeeldings- of videometadata — een gemiste kans om te ranken in afbeeldings- en videozoekresultaten.
- **Beperkte controle** — De aanpassingsmogelijkheden zijn minimaal en vereisen code.

Een goed beheerde sitemap-strategie richt crawlers op waardevolle content, bespaart crawl-budget en voorkomt dat laagwaardige pagina's worden geïndexeerd.

<br>

## De core-sitemap aanpassen

Je kunt de core-sitemap programmatisch aansturen met filters in het `functions.php`-bestand van je thema, of via een eigen plugin.

<br>

### 1. Een hele post type uitsluiten

Heb je een custom post type dat niet geïndexeerd zou moeten worden (bijv. `internal_docs`)? Dan kun je hem volledig uit de sitemap verwijderen.

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
/**
 * Sluit een specifieke post type uit van de XML-sitemap.
 */
add_filter( 'wp_sitemaps_post_types', 'exclude_post_type_from_sitemap' );

function exclude_post_type_from_sitemap( $post_types ) {
    // 'my_secret_cpt' is de naam van de custom post type
    unset( $post_types['my_secret_cpt'] );
    return $post_types;
}
```

<br>

### 2. Een specifiek bericht op ID uitsluiten

Handig voor pagina's zoals "Bedankt"-pagina's die wél openbaar moeten blijven, maar níet geïndexeerd.

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
/**
 * Sluit een specifiek bericht of pagina via ID uit van de sitemap.
 */
add_filter( 'wp_sitemaps_posts_query_args', 'exclude_specific_post_from_sitemap', 10, 2 );

function exclude_specific_post_from_sitemap( $args, $post_type ) {
    // Sluit bericht met ID 123 uit
    $args['post__not_in'] = isset( $args['post__not_in'] ) ? $args['post__not_in'] : [];
    $args['post__not_in'][] = 123;

    // Voor meerdere berichten/pagina's:
    // $args['post__not_in'] = array_merge( $args['post__not_in'], [ 123, 456, 789 ] );

    return $args;
}
```

<br>

### 3. De core-sitemap volledig uitschakelen

Gebruik je een dedicated SEO-plugin (zoals **Yoast SEO** of **Rank Math**)? Schakel de core-sitemap dan uit om conflicten te voorkomen.

<div class="tip custom-block" style="padding-top: 8px">
De core-sitemap van WordPress werkt prima, maar voor serieus SEO-werk raden we aan deze uit te schakelen en in plaats daarvan een <b>dedicated SEO-plugin</b> te gebruiken zoals Yoast SEO, Rank Math of SEOPress. Deze plugins bieden een betere UI voor het uitsluiten van content, automatische generatie van afbeeldings- en video-sitemaps, en betere integratie met andere SEO-functies.
</div>

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
/**
 * Schakel de core WordPress XML-sitemap uit.
 * Aanbevolen wanneer je een dedicated SEO-plugin gebruikt.
 */
add_filter( 'wp_sitemaps_enabled', '__return_false' );
```

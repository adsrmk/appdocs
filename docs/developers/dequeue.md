# Scripts en stijlen verwijderen (dequeue)

Standaard laadt WordPress diverse stijlen en scripts die je site mogelijk helemaal niet gebruikt. Deze extra bestanden **vertragen je laadtijd** onnodig. Je kunt voorkomen dat WordPress ze laadt door ze te **dequeuen**.

<br>

## Voorbeeld: Gutenberg dequeuen

Gutenberg is de ingebouwde blok-editor van WordPress. Veel gebruikers hebben deze op de front-end niet nodig — vooral niet als ze met een paginabouwer werken.

Voeg de onderstaande code toe aan het `functions.php`-bestand van je actieve thema:

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
function dequeue_gutenberg_assets() {
    // Stijlen
    wp_dequeue_style('wp-block-library');         // Core blok-stijlen
    wp_dequeue_style('wp-block-library-theme');   // Thema blok-stijlen
    wp_dequeue_style('wc-block-style');           // WooCommerce blok-stijlen (indien gebruikt)

    // Scripts
    wp_dequeue_script('wp-block-library');        // Core blok-scripts
    wp_dequeue_script('wp-editor');               // Editor-scripts
}
add_action('wp_enqueue_scripts', 'dequeue_gutenberg_assets', 100);
```

<br>

## Hoe werkt het?

- **`wp_dequeue_style()` en `wp_dequeue_script()`** — Vertellen WordPress om bepaalde CSS- of JS-bestanden *niet* in te laden op de front-end.
- **Prioriteit `100`** — Zorgt ervoor dat deze code *na* het inladen van alle scripts en stijlen draait, zodat ze veilig kunnen worden verwijderd.
- **Resultaat** — Een kleinere paginagrootte, snellere laadtijden en minder ongebruikte assets die naar je bezoekers worden verstuurd — zeker als je geen gebruikmaakt van Gutenberg.

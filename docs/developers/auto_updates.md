# Automatische updates

Het up-to-date houden van WordPress core, thema's en plugins is een van de belangrijkste beveiligingsmaatregelen voor elke website. De meeste succesvolle aanvallen maken namelijk gebruik van **bekende kwetsbaarheden** in verouderde software — problemen waarvoor meestal al patches beschikbaar zijn. Vertrouwen op iemand die handmatig moet inloggen en op "bijwerken" klikt, is onbetrouwbaar. Door updates te automatiseren weet je zeker dat ze consistent en op tijd worden uitgevoerd.

<br>

## Optie 1 — Automatische updates via wp-config

<div class="warning custom-block" style="padding-top: 8px">
Bij het bijwerken van <b>themabestanden</b> wordt ook <code>functions.php</code> overschreven. Heb je eigen aanpassingen of functies toegevoegd? Maak dan eerst een <b>back-up</b> van het bestand (of kopieer de inhoud) voordat je automatische updates inschakelt. Anders gaat al je eigen code verloren!
</div>

<br>

Je kunt automatische updates inschakelen door de juiste instellingen toe te voegen aan je `wp-config.php`- en `functions.php`-bestanden. Daarmee zorgen WordPress core, thema's en plugins automatisch voor hun eigen updates — zonder dat je er omkijken naar hebt.

**1. Schakel automatische core-updates in** — Voeg dit toe aan `wp-config.php`:

```php [/public_html/wp-config.php]
/**
 * WordPress Automatic Update Configuration
 */

// Automatische updates voor WordPress core inschakelen
define( 'WP_AUTO_UPDATE_CORE', true );
```

<br>

**2. Schakel automatische plugin- en thema-updates in** — Voeg dit toe aan het `functions.php`-bestand van je actieve thema:

```php [/public_html/wp-content/themes/jouw-thema/functions.php]
// Pas alle minor- en beveiligingsupdates toe op plugins
add_filter( 'auto_update_plugin', '__return_true' );

// Pas alle minor- en beveiligingsupdates toe op thema's
add_filter( 'auto_update_theme', '__return_true' );
```

<br>

## Optie 2 — Automatische updates via het OS Cloud-paneel

Je kunt automatische updates ook direct inschakelen via het **OS Cloud**-paneel. Deze methode geeft je **selectieve controle** — je kunt updates per plugin of thema in- of uitschakelen, in plaats van voor alles tegelijk.

<br>

<img width="612" height="271" alt="image" src="https://github.com/user-attachments/assets/080d11d1-e004-414b-b2a4-a1e749b69c1b" />

<br>

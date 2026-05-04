# WordPress-structuur verbergen

Je kunt de standaard mapstructuur van WordPress verbergen voor extra bescherming tegen geautomatiseerde scanners en eenvoudige aanvallen. Dit wijzigt de directories en structurele paden die WordPress gebruikt.

<div class="warning custom-block" style="padding-top: 8px">
Dit is op zichzelf <b>geen beveiligingsmaatregel</b>. Het maskeert alleen WordPress-specifieke paden en fingerprints. Reguliere beveiligingsmaatregelen — updates, firewalls, authenticatie-hardening, enzovoort — blijven onmisbaar.
</div>

<br>

## De `wp-content`-map herschrijven

Je kunt de `wp-content`-map naar elk gewenst pad herschrijven. Voeg het volgende toe aan je `wp-config.php` en vervang `/assets` door je gewenste mapnaam:

```php [/public_html/wp-config.php]
define('WP_CONTENT_DIR', dirname(__FILE__) . '/assets');
define('WP_CONTENT_URL', '/assets');
```

<br>

### De plugins-map herschrijven

Ook de `/plugins`-map kun je herschrijven. Zorg dat het pad overeenkomt met de map die je hierboven hebt gedefinieerd (`assets/...`):

```php [/public_html/wp-config.php]
define('WP_PLUGIN_DIR', dirname(__FILE__) . '/assets/lib');
define('WP_PLUGIN_URL', '/assets/lib');
```

<br>

### De uploads-map verplaatsen

Om de uploads-map naar een ander pad te verplaatsen:

```php [/public_html/wp-config.php]
define('UPLOADS', 'assets/img');
```

<div class="warning custom-block" style="padding-top: 8px">
Als je deze directories wijzigt, moet je de daadwerkelijke mappen op de schijf ook hernoemen — anders kan WordPress ze niet vinden.
</div>

<br>

<img width="1062" height="206" alt="image" src="https://github.com/user-attachments/assets/bb0ed1a9-9ed1-4aa1-abd7-16394eec0cda" />

<br>

**Voorbeeld-mapping:**

| Standaard | Nieuw pad |
| --- | --- |
| `wp-content` | `/assets` |
| `plugins` | `/assets/lib` |
| `themes` | `/assets/core` |
| `uploads` | `/assets/img` |

<br>

### (Optioneel) Maand/jaar-uploadmappen uitschakelen

Om te voorkomen dat WordPress mappen aanmaakt zoals `/2026/03/` binnen `uploads`:

1. Log in op het WordPress-adminpaneel.
2. Ga naar **Instellingen → Media**.
3. Schakel **Organiseer mijn uploads in maand- en jaargebaseerde mappen** uit.
4. Sla de wijzigingen op.

<br>

<img width="589" height="208" alt="image" src="https://github.com/user-attachments/assets/cbc7c590-c504-4abd-b0f4-e5b3170c50a2" />

<br>

## De thema-map hernoemen

WordPress biedt geen constante om de themamap te wijzigen. Dit kan wel via een **MU-plugin (Must-Use)**.

1. Maak in je `wp-content`-map (of het hernoemde equivalent) een nieuwe map genaamd `mu-plugins` aan.
2. Maak in die map een nieuw bestand aan met de naam `theme-core.php`.
3. Plak de onderstaande code en vervang `core` door de naam van je themamap:

```php [/public_html/wp-content/mu-plugins/theme-core.php]
<?php
add_filter('theme_root', function () {
    return WP_CONTENT_DIR . '/core';
});

add_filter('theme_root_uri', function () {
    return WP_CONTENT_URL . '/core';
});
```

<br>

## NGINX-beveiligings- & prestatie-regels

Voor optimale beveiliging blokkeer je alle externe toegang tot de `mu-plugins`-map — alleen de server zelf zou de bestanden mogen lezen. Verhoog daarnaast de prestaties door cache-headers in te stellen voor alle statische assets (afbeeldingen, CSS, JavaScript) die vanuit `/assets/` worden geserveerd.

```nginx [vhost.conf]
location ~* /mu-plugins/.*\.php$ {
    deny all;
}

location /assets/ {
    expires 30d;
    access_log off;
    log_not_found off;
}
```

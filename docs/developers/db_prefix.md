# Database-prefix wijzigen

Standaard gebruikt WordPress `wp_` als prefix voor alle databasetabellen. Door deze prefix te wijzigen naar een unieke, willekeurige waarde verhoog je de beveiliging — zo blokkeer je geautomatiseerde SQL-injectie-aanvallen die zich specifiek richten op de standaardprefix.

Deze handleiding loopt in **vier stappen** door het proces heen.

<div class="warning custom-block" style="padding-top: 8px">
Dit is een <b>gevoelige database-operatie</b>. Maak altijd eerst een volledige back-up van je database — één foutje kan je hele site offline halen. We raden ook aan om dit proces tijdens rustige uren uit te voeren.
</div>

<br>

## Stap 1 — Werk je `wp-config.php` bij

1. Maak verbinding met je site via **SFTP** of **SSH** en open je `wp-config.php`-bestand.
2. Zoek de regel waarin de tabelprefix wordt gedefinieerd:

   ```php [/public_html/wp-config.php]
   $table_prefix = 'wp_';
   ```

3. Wijzig `'wp_'` naar een nieuwe, unieke prefix. Eindig deze altijd met een underscore en gebruik een willekeurige combinatie van letters en cijfers:

   ```php [/public_html/wp-config.php]
   // Voorbeeld van een nieuwe, veilige prefix
   $table_prefix = 'wp_a7d3f8_';
   ```

4. Sla het bestand op.

<div class="info custom-block" style="padding-top: 8px">
Op dit moment is je site stuk en zie je een databaseverbindingsfout. Dat is normaal — we lossen dit op in de volgende stappen door de databasetabellen te hernoemen.
</div>

<br>

## Stap 2 — Hernoem alle databasetabellen

Nu hernoem je de WordPress-kerntabellen (en eventuele plugintabellen) die nog de oude prefix gebruiken. De eenvoudigste manier is via een aantal SQL-queries.

1. Log in op je database via **phpMyAdmin** of de command-line-client.
2. Genereer automatisch alle `RENAME`-queries met de onderstaande query:

   ```sql
   SELECT CONCAT(
     'RENAME TABLE ', table_name, ' TO ',
     REPLACE(table_name, 'wp_', 'wp_a7d3f8_'), ';'
   )
   FROM information_schema.tables
   WHERE table_name LIKE 'wp_%';
   ```

   > Vervang `wp_` en `wp_a7d3f8_` door je oude en nieuwe prefix.

3. De query hierboven geeft een lijst met `RENAME`-commando's. Kopieer die lijst en voer hem uit als een nieuwe SQL-query. Het ziet er ongeveer zo uit:

   ```sql
   RENAME TABLE wp_commentmeta TO wp_a7d3f8_commentmeta;
   RENAME TABLE wp_comments TO wp_a7d3f8_comments;
   RENAME TABLE wp_links TO wp_a7d3f8_links;
   RENAME TABLE wp_options TO wp_a7d3f8_options;
   RENAME TABLE wp_postmeta TO wp_a7d3f8_postmeta;
   RENAME TABLE wp_posts TO wp_a7d3f8_posts;
   RENAME TABLE wp_termmeta TO wp_a7d3f8_termmeta;
   RENAME TABLE wp_terms TO wp_a7d3f8_terms;
   RENAME TABLE wp_term_relationships TO wp_a7d3f8_term_relationships;
   RENAME TABLE wp_term_taxonomy TO wp_a7d3f8_term_taxonomy;
   RENAME TABLE wp_usermeta TO wp_a7d3f8_usermeta;
   RENAME TABLE wp_users TO wp_a7d3f8_users;
   -- ...en zo verder voor eventuele plugintabellen
   ```

Nadat je deze opdrachten hebt uitgevoerd, zou je site weer moeten werken — maar er zijn nog twee plekken waar de oude prefix staat opgeslagen.

<br>

## Stap 3 — Werk de `wp_options`-tabel bij

De `wp_options`-tabel (nu hernoemd naar `wp_a7d3f8_options`) bevat een veld genaamd `wp_user_roles`. Deze veldnaam is gebaseerd op de oude prefix en moet ook worden bijgewerkt.

Voer de volgende SQL-query uit:

```sql
UPDATE wp_a7d3f8_options
SET option_name = 'wp_a7d3f8_user_roles'
WHERE option_name = 'wp_user_roles';
```

> Vervang de prefixes door je oude en nieuwe waarden.

Hierdoor blijft WordPress de gebruikersrollen en -rechten correct herkennen. Sla je deze stap over, dan kunnen alle gebruikers — inclusief beheerders — hun rechten verliezen.

<br>

## Stap 4 — Werk de `wp_usermeta`-tabel bij

De `wp_usermeta`-tabel bevat meerdere rijen waarin de oude prefix is gebruikt als onderdeel van de `meta_key`. Ook deze moeten worden bijgewerkt.

Voer de volgende SQL-query uit:

```sql
UPDATE wp_a7d3f8_usermeta
SET meta_key = REPLACE(meta_key, 'wp_', 'wp_a7d3f8_');
```

Dit zoekt elk voorkomen van de oude prefix in de kolom `meta_key` en vervangt het door de nieuwe. Hiermee herstel je gebruikersrechten, dashboard-instellingen en andere gebruikersspecifieke metadata.

<br>

## Eindcontrole

Na het voltooien van alle vier de stappen leeg je eventuele caching op je site (object cache, page cache, etc.) en test je grondig:

- Kun je in- en uitloggen?
- Hebben beheerders nog steeds hun rechten?
- Worden berichten, pagina's en media correct geladen?
- Werken je plugins zoals verwacht?

Werkt alles? Dan is het proces voltooid. Je database is nu beveiligd tegen een van de meest voorkomende aanvalsvormen.

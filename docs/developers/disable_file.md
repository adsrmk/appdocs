# Bestandsbewerking uitschakelen

WordPress beschikt over een ingebouwde code-editor waarmee je thema- en pluginbestanden rechtstreeks vanuit het admin-dashboard kunt aanpassen. Handig, maar ook een groot beveiligingsrisico — krijgt een aanvaller toegang tot je dashboard, dan kan diegene direct kwaadaardige code in je site injecteren.

We raden aan deze editor uit te schakelen door de onderstaande regel toe te voegen aan je `wp-config.php`-bestand:

```php [/public_html/wp-config.php]
// Bestandsbewerking via het WordPress-dashboard uitschakelen
define( 'DISALLOW_FILE_EDIT', true );
```

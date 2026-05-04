# Gebruikers-enumeratie blokkeren

Gebruikers-enumeratie is een veelgebruikte techniek waarmee aanvallers geldige WordPress-gebruikersnamen kunnen achterhalen. Standaard kan WordPress gebruikersnamen blootgeven via auteursarchief-URL's zoals `?author=1`. Zodra een geldige gebruikersnaam bekend is, kunnen aanvallers veel gerichter brute-force- of credential-stuffing-aanvallen uitvoeren.

<br>

## Waarom gebruikers-enumeratie blokkeren?

Als gebruikers-enumeratie ingeschakeld blijft, kunnen aanvallers:

- Geldige gebruikersnamen op je site identificeren
- De tijd die nodig is om accounts te kraken aanzienlijk verkorten
- Beheerders heel gericht aanvallen

Door dit gedrag te blokkeren, beperk je de informatie die zichtbaar is voor anonieme bezoekers en verhoog je de algehele veiligheid van je site.

<br>

## Hoe schakel je deze bescherming in?

Voeg de onderstaande code toe aan je `wp-config.php`-bestand:

```php [/public_html/wp-config.php]
if (isset($_SERVER['QUERY_STRING']) &&
    preg_match('/author=([0-9]*)/i', $_SERVER['QUERY_STRING'])
) {
    header('HTTP/1.1 403 Forbidden');
    exit('Access denied');
}
```

Zodra de code is toegevoegd, krijgt elke bezoeker die een auteursarchief-URL zoals `jouwdomein.nl/?author=1` probeert te openen een **403 Forbidden**-respons — in plaats van de bijbehorende gebruikersnaam.

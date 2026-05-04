# PHP configureren en aanpassen

**PHP (Hypertext Preprocessor)** is een server-side scripttaal die gebruikt wordt voor webontwikkeling. Op **OS Cloud** heb je verschillende mogelijkheden om de PHP-versie, extensies en configuratie van je site aan te passen.

<br>

## PHP-versie

We raden aan om de meest recente stabiele PHP-versie te gebruiken voor de beste prestaties en veiligheid. Wil je een andere versie gebruiken? Wissel dan de PHP-engine via **Geavanceerd → Ontwikkelaarstools**.

<div class="warning custom-block" style="padding-top: 8px">
PHP-versies ouder dan 8.0 worden niet ondersteund vanwege beveiligings- en prestatieredenen. Heb je toch een oudere versie nodig? Dan kun je deze aanvragen — maar wij zijn <b>niet verantwoordelijk</b> voor problemen of kwetsbaarheden die voortkomen uit het gebruik van verouderde PHP-versies.
</div>

<img width="844" height="105" alt="image" src="https://github.com/user-attachments/assets/a52a0028-9a8b-4593-9e2e-14de3ad5c608" />

<br>

## Extensies

PHP-extensies zijn modules die extra functionaliteit toevoegen — zoals databaseconnecties, beeldverwerking of versleuteling. Je kunt ze direct in het paneel in- of uitschakelen.

Je kunt maximaal **vijf extra extensies** activeren. We raden aan om standaard **Brotli** en **APCu** in te schakelen.

| Extensie | Beschrijving |
| --- | --- |
| **Brotli** | Een compressie-algoritme van Google, efficiënter dan Gzip. Verlaagt het bandbreedteverbruik en verbetert laadtijden. |
| **APCu** | Een in-memory cachelaag die PHP versnelt door veelgebruikte data in RAM op te slaan, waardoor er minder database-queries nodig zijn. |
| XMLRPC | Schakelt XML-RPC-ondersteuning in, waarmee PHP-applicaties via XML-berichten met externe servers kunnen communiceren. |
| OAuth | Biedt OAuth-authenticatie voor veilige autorisatie tussen applicaties (vaak gebruikt voor social logins). |
| PdoDblib | Een PDO-driver voor Microsoft SQL Server- en Sybase-databases via de FreeTDS-bibliotheek. |

<br>

## PHP-foutenlogboek

Het PHP-foutenlogboek registreert waarschuwingen, fouten en problemen in je PHP-applicatie — handig bij het debuggen.

Je vindt het logbestand in de hoofdmap van je website onder de naam `php-error.log`.

<div class="tip custom-block" style="padding-top: 8px">
Sinds paneelversie <b>12.0+</b> kun je het logboek ook direct bekijken binnen het <b>PHP-onderdeel</b> in het paneel.
</div>

<img width="836" height="436" alt="image" src="https://github.com/user-attachments/assets/2e767c22-cd56-463e-aca0-dce89e52263d" />

<br>

## PHP.ini-editor  <Badge type="info" text="Enterprise" />

<div class="tip custom-block" style="padding-top: 8px">
Deze functie is alleen beschikbaar voor Enterprise-klanten op het <b>Managed VPS</b>-pakket. De standaardwaarden zijn geoptimaliseerd voor de meeste gebruiksscenario's — pas ze alleen aan als je weet wat je doet.
</div>

Je kunt PHP-configuratiewaarden overschrijven om aan te sluiten bij de behoeften van jouw site. Heeft een site bijvoorbeeld meer resources nodig? Dan kun je het **geheugenlimiet** verhogen voor soepelere prestaties.

Ga in **Ontwikkelaarstools → PHP.ini-editor** (tweede blok) en klik op **Directive toevoegen** om een nieuwe waarde te definiëren.

<img width="844" height="166" alt="image" src="https://github.com/user-attachments/assets/5a06a9b1-01fb-42b8-9dfd-ee8a533fc05b" />

Een volledige lijst met beschikbare **PHP-directives** vind je op de officiële PHP-website: [php.net/manual/en/ini.list.php↗](https://www.php.net/manual/en/ini.list.php)

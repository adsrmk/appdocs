# Redis

**Redis (Remote Dictionary Server)** is een high-performance object-cache die je website sneller maakt. In plaats van data van schijf te lezen, zoals bij een standaarddatabase (zoals MySQL), slaat Redis veelgebruikte gegevens direct op in het RAM-geheugen van de server — wat aanzienlijk sneller is.

<br>

## Voordelen

- **Snellere laadtijden** — Redis onthoudt eerdere database-queries, zodat je server minder werk hoeft te doen.
- **Aankan met veel verkeer** — Werkt als een buffer, waardoor je site meer gelijktijdige bezoekers kan bedienen zonder te crashen.
- **Betere gebruikerservaring** — Functies zoals winkelmandjes, gebruikerssessies en live-meldingen werken vlotter en sneller.

<br>

## Redis inschakelen

1. Log in op je **OS Cloud**-paneel.
2. Scrol omlaag naar het onderdeel **Ontwikkelaarstools**.
3. Zoek het **Redis**-blok.
4. Zet de schakelaar op **Aan**.

Zodra Redis is ingeschakeld, draait het automatisch in je PHP-container.

<br>

<img width="1316" height="517" alt="image" src="https://github.com/user-attachments/assets/e922cf62-ee73-4e8b-b29b-3b49ab922043" />

<br>

## Redis koppelen aan WordPress

1. Log in op WordPress, ga naar **Plugins**, zoek op **Redis Object Cache** en installeer de plugin.

<br>

<img width="565" height="274" alt="image" src="https://github.com/user-attachments/assets/224568ed-ba77-4e00-9ae7-4cc3531720de" />

<br>

2. Ga in WordPress naar **Instellingen → Redis**.
3. Klik op **Object Cache inschakelen**.
4. Voeg het volgende toe aan je `wp-config.php`-bestand. Vervang `mijn_unieke_site_naam` door een eigen naam (of laat de standaard staan):

```php [/public_html/wp-config.php]
define( 'WP_REDIS_HOST', '127.0.0.1' );
define( 'WP_REDIS_PORT', 6379 );

// Optioneel: geef deze site een unieke prefix als je meerdere sites draait
define( 'WP_CACHE_KEY_SALT', 'mijn_unieke_site_naam' );
```

<div class="warning custom-block" style="padding-top: 8px">
Het kan zijn dat je na het activeren van Redis kort een <b>502: Bad Gateway</b>-fout ziet. Dit betekent meestal dat de Redis-configuratie nog niet volledig is verbonden met de applicatieserver. Los dit op door je PHP-container opnieuw te starten: ga naar <b>Geavanceerd → Ontwikkelaarstools</b> en klik op de eerste <b>Restart</b>-knop onder <b>PHP</b>.
</div>

<br>

## Redis optimaliseren

Eenmaal ingeschakeld draait Redis met standaardinstellingen. Met wat finetuning houd je Redis snel én blijf je binnen de resource-limieten van je container. De configuratie hieronder is een aanbevolen **best-practice**-opzet, geoptimaliseerd voor stabiliteit en prestaties in een containeromgeving.

Je kunt deze configuratie direct kopiëren en plakken in je `redis.conf`-bestand:

```conf [redis.conf]
bind 127.0.0.1
protected-mode yes

maxmemory 192mb
maxmemory-policy allkeys-lru

save ""
appendonly no

lazyfree-lazy-eviction yes
lazyfree-lazy-expire yes

tcp-keepalive 300
timeout 0
```

<div class="warning custom-block" style="padding-top: 8px">
Pas deze waarden alleen aan als je weet wat je doet. Onjuiste instellingen kunnen ervoor zorgen dat Redis stopt met werken of slecht presteert.
</div>

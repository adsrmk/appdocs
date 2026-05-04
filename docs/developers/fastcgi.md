# Wat is FastCGI Cache?

FastCGI Cache is een server-side cachingmechanisme op NGINX-niveau. In plaats van bij elk verzoek PHP en database-queries uit te voeren, slaat NGINX de volledig gerenderde HTML van een pagina op na het eerste bezoek.

Bij volgende bezoeken levert NGINX die gecachte HTML direct uit — PHP-FPM en de database worden volledig overgeslagen. Het resultaat: een veel lagere serverbelasting, snellere laadtijden en de mogelijkheid om veel meer gelijktijdige bezoekers te bedienen.

<img width="1296" height="748" alt="image" src="https://github.com/user-attachments/assets/ca7fdbfb-a17d-47b5-b875-d5944b880544" />

<br>

## FastCGI Cache inschakelen

1. Ga naar **Ontwikkelaarstools**.
2. Gebruik in het onderdeel **NGINX** de schakelaar om FastCGI Cache in te schakelen.

> Heb je meerdere domeinen? Selecteer dan eerst het juiste domein in het dropdown-menu.

<img width="806" height="310" alt="image" src="https://github.com/user-attachments/assets/63f3b2d5-4d25-4ab8-acca-88434075d383" />

<br>

<div class="warning custom-block" style="padding-top: 8px">
We raden af om FastCGI Cache in te schakelen terwijl je nog aan je website werkt — bijgewerkte content kan dan namelijk blijven worden uitgeleverd vanuit de cache. Gebeurt dit toch? Dan kun je de <b>cache leegmaken</b> zodat NGINX een nieuwe versie genereert met je laatste wijzigingen.
</div>

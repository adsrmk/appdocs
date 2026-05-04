# FastCGI Cache

FastCGI Cache slaat de output van PHP-pagina's op zodat herhaalde requests direct vanaf NGINX worden geserveerd, zonder PHP of database opnieuw aan te roepen.

## Hoe het werkt

<br>

<img width="1335" height="763" alt="image" src="https://github.com/user-attachments/assets/9d431971-ace7-4fc7-a53c-9d5dbbc2fc57" />

<br>

::: tip Waarom is dit snel?
Een cache HIT levert pagina's binnen milliseconden — geen PHP execution, geen database queries. Voor sites met hoge traffic kan dit het verschil zijn tussen een trage en een razendsnelle ervaring.
:::


<br>


## FastCGI Cache inschakelen

1. Ga naar **Ontwikkelaarstools**.
2. Gebruik in het onderdeel **NGINX** de schakelaar om FastCGI Cache in te schakelen.

> Heb je meerdere domeinen? Selecteer dan eerst het juiste domein in het dropdown-menu.

<br>

<img width="1316" height="304" alt="image" src="https://github.com/user-attachments/assets/85b9dbb4-d051-44a6-8167-3b4f67796b1b" />

<br>

<div class="warning custom-block" style="padding-top: 8px">
We raden af om FastCGI Cache in te schakelen terwijl je nog aan je website werkt — bijgewerkte content kan dan namelijk blijven worden uitgeleverd vanuit de cache. Gebeurt dit toch? Dan kun je de <b>cache leegmaken</b> zodat NGINX een nieuwe versie genereert met je laatste wijzigingen.
</div>

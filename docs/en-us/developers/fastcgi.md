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
## Enable FastCGI Cache

1. Go to **Developer Tools**.
2. In the **NGINX** section, use the toggle to enable FastCGI Cache.

> If you have multiple domains, select the correct one from the dropdown first.

<img width="806" height="310" alt="image" src="https://github.com/user-attachments/assets/63f3b2d5-4d25-4ab8-acca-88434075d383" />

<br>

<div class="warning custom-block" style="padding-top: 8px">
We don't recommend enabling FastCGI Cache while you're still developing your website — updated content may keep getting served from the cache. If that happens, simply <b>purge the cache</b> so NGINX can generate a new version with your latest changes.
</div>

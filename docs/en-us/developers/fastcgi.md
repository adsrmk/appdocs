# What is FastCGI Cache?

FastCGI Cache is a server-side caching mechanism at the NGINX level. Instead of running PHP and database queries on every request, NGINX stores the fully rendered HTML of a page after the first visit.

On subsequent visits, NGINX serves that cached HTML directly — bypassing PHP-FPM and the database entirely. The result: drastically lower server load, faster response times, and the ability to handle far more concurrent visitors.

<img width="1296" height="748" alt="image" src="https://github.com/user-attachments/assets/ca7fdbfb-a17d-47b5-b875-d5944b880544" />

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

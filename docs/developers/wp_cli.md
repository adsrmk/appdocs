# WordPress core opnieuw installeren via CLI

Het opnieuw installeren van de WordPress core-bestanden via WP-CLI is een snelle manier om beschadigde kernbestanden te herstellen of verdachte code uit je installatie te verwijderen.

<div class="warning custom-block" style="padding-top: 8px">
Maak altijd eerst een <b>back-up</b> van je website voordat je verdergaat. Het opnieuw installeren van core-bestanden kan niet ongedaan worden gemaakt.
</div>

<br>

## Core-bestanden opnieuw installeren

1. Log in op je server via SSH. Weet je niet hoe? [Volg dan deze handleiding](#).
2. Ga naar de hoofdmap van je WordPress-installatie:

   ```bash
   cd public_html
   ```

3. Controleer of je in de juiste map zit door te kijken of het bestand `wp-config.php` aanwezig is.

   <div class="tip custom-block" style="padding-top: 8px">
   <b>Optioneel maar aanbevolen:</b> Verwijder de mappen <code>wp-admin</code> en <code>wp-includes</code> voordat je opnieuw installeert. Hiermee verwijder je eventuele ongewenste of kwaadaardige code die in de core is geïnjecteerd.
   </div>

   ```bash
   rm -rf wp-admin
   rm -rf wp-includes
   ```

4. Installeer de WordPress core-bestanden opnieuw:

   ```bash
   wp core download --force
   ```

5. Werk de database bij indien nodig:

   ```bash
   wp core update-db
   ```

Je core-bestanden zijn nu succesvol opnieuw geïnstalleerd.

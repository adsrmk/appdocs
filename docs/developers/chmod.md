# Veilige bestands- en mapmachtigingen

Het instellen van de juiste bestands- en mapmachtigingen is essentieel om ongeautoriseerde toegang tot — of aanpassingen van — je WordPress-site te voorkomen. Onjuiste machtigingen kunnen aanvallers in staat stellen om bestanden te overschrijven, kwaadaardige code te injecteren of zelfs de volledige controle over je website te krijgen.

<div class="info custom-block" style="padding-top: 8px">
Het paneel stelt standaard al aanbevolen machtigingen in. Voor extra beveiliging raden we aan om <code>wp-config.php</code> op <b>440</b> in te stellen.
</div>

<br>

## Aanbevolen machtigingen

- **Bestanden: `644`** — De eigenaar mag lezen en schrijven; anderen mogen alleen lezen.
- **Mappen: `755`** — De eigenaar mag lezen, schrijven en uitvoeren; anderen mogen lezen en uitvoeren.
- **`wp-config.php`: `440`** — Beperkt de toegang tot gevoelige configuratiegegevens.

**Tips:**

- Gebruik nooit `777`. Hiermee krijgt iedereen schrijfrechten en dat vormt een groot beveiligingsrisico.
- Controleer machtigingen regelmatig, zeker na het installeren van nieuwe plugins of thema's.

<br>

## WordPress core-bestanden instellen op 444

Het toepassen van `444`-machtigingen (alleen-lezen) op alle bestanden binnen de map `wp-includes` is een eenvoudige maar effectieve manier om je WordPress-site te beveiligen.

De `wp-includes`-map bevat kernbibliotheken die WordPress moet kunnen **lezen en uitvoeren** — maar tijdens normaal gebruik nooit hoeft aan te passen. Door deze bestanden alleen-lezen te maken, voorkom je dat kwaadaardige code, kwetsbare plugins of gehackte beheerdersaccounts de kernfunctionaliteit kunnen wijzigen. Dit vermindert het risico op aanhoudende malware-infecties aanzienlijk.

<div class="warning custom-block" style="padding-top: 8px">
Pas <b>geen</b> <code>444</code>-machtiging toe op de <code>wp-includes</code>-map zelf — alleen op de bestanden erin. Mappen hebben namelijk de <i>execute</i>-machtiging nodig om toegankelijk te zijn. Heb je deze per ongeluk verwijderd? Log dan in via SFTP en zet de mapmachtigingen terug naar <code>755</code>.
</div>

<br>

**Zo stel je veilige machtigingen in voor alle wp-includes-bestanden:**

1. Log in via [SSH](#).
2. Ga naar de hoofdmap van je website:
   ```bash
   cd public_html
   ```
3. Voer de volgende opdracht uit:
   ```bash
   find wp-admin wp-includes -type f -exec chmod 444 {} \;
   ```

<br>

## Hoe wijzig je machtigingen?

Je kunt de machtigingen van een bestand of map aanpassen door er met de **rechtermuisknop** op te klikken en in het menu **Machtigingen** te kiezen.

<img width="935" height="491" alt="image" src="https://github.com/user-attachments/assets/30334757-0643-425e-941d-27d0ad63e458" />

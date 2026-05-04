# Fout bij het maken van een databaseverbinding

Deze foutmelding betekent dat WordPress geen verbinding kan maken met de database. Meestal wordt dit veroorzaakt door onjuiste inloggegevens, een corrupte database of een tijdelijk serverprobleem.

Volg de onderstaande stappen om het probleem op te sporen en te verhelpen.

<br>

## 1. Controleer de databasegegevens in `wp-config.php`

Begin met het controleren van de gegevens in je WordPress-configuratiebestand.

1. Log in op je **OS Cloud**-paneel.
2. Ga naar het onderdeel **Websites**, selecteer je website en open de **Bestandsbeheerder**.
3. Navigeer naar de hoofdmap van je WordPress-installatie (meestal `/public_html/`).
4. Open het `wp-config.php`-bestand om het te bewerken. Je vindt hier regels zoals:

```php [/public_html/wp-config.php]
define('DB_NAME', 'jouw_database_naam');
define('DB_USER', 'jouw_database_gebruiker');
define('DB_PASSWORD', 'jouw_database_wachtwoord');
define('DB_HOST', 'localhost');
```

<br>

## 2. Controleer de databasegegevens in het paneel

Nadat je de gegevens in `wp-config.php` hebt gecontroleerd, check je of ze overeenkomen met de daadwerkelijke databasegegevens in het paneel.

1. Ga in het paneel naar je website en selecteer **Databases**.
2. Controleer of de waarden voor `DB_NAME`, `DB_USER` en `DB_PASSWORD` uit `wp-config.php` overeenkomen met een bestaande database in de lijst.

Als de gegevens niet overeenkomen, pas je `wp-config.php` aan met de juiste databasenaam en gebruikersnaam.

> **Tip:** Je kunt indien nodig nieuwe databasegebruikers aanmaken via het onderdeel **Databasegebruikers**.

<br>

## 3. Reset het wachtwoord van de MySQL-gebruiker

Als de databasegegevens kloppen, ligt de oorzaak meestal bij het wachtwoord. Reset in dat geval het wachtwoord van de MySQL-gebruiker en werk dit ook bij in `wp-config.php`.

1. Ga terug naar het onderdeel **Databasegebruikers**.
2. Selecteer de gebruiker waarvan je het wachtwoord wilt wijzigen.

<br>

<img width="1342" height="300" alt="image" src="https://github.com/user-attachments/assets/19f2f174-bd70-4215-9a4f-18e87a8fc2a4" />\

<br>

3. Klik op **Resetten** rechtsboven in het blok en voer een nieuw wachtwoord in.

<br>

<img width="617" height="369" alt="image" src="https://github.com/user-attachments/assets/7885a7ed-ed3f-401f-bce3-e977c86c0c78" />

<br>

4. Klik op **Wachtwoord wijzigen** om te bevestigen. Werk daarna de waarde van `DB_PASSWORD` in `wp-config.php` bij met het nieuwe wachtwoord.

<br>

## 4. Zorg dat de MySQL-gebruiker de juiste rechten heeft

1. Ga terug naar de **Database**.
2. Selecteer de gebruiker waarvan je de rechten wilt aanpassen onder **database users**
4. Klik op het kebab-menu (drie verticale stippen) rechts en kies **Rechten bewerken**.

<img width="1788" height="458" alt="image" src="https://github.com/user-attachments/assets/43bbb6bf-ba83-4a35-9a98-5d73c81d86d4" />

5. Vink het selectievakje **Alle databaserechten** aan.

<br>

<img width="617" height="245" alt="image" src="https://github.com/user-attachments/assets/ba03a710-9e83-411d-9c91-ced13a9b9fca" />

<br>

6. Sla je wijzigingen op en sluit het scherm.

<br>

Hiermee geef je de MySQL-gebruiker volledige toegang tot de database, zodat WordPress weer correct verbinding kan maken en functioneren.

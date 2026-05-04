# CAPTCHA

**CAPTCHA** is een beveiligingstool die het verschil tussen mensen en geautomatiseerde bots herkent. Het doel: spam en kwaadaardige bots tegenhouden bij je formulieren — terwijl echte gebruikers er moeiteloos doorheen komen.

Het werkt door taken te tonen die voor mensen eenvoudig zijn, maar voor bots lastig — zoals het herkennen van vervormde tekst of het selecteren van specifieke afbeeldingen.

<img width="367" height="118" alt="image" src="https://github.com/user-attachments/assets/e46366c8-125c-4ffe-9069-80c580b537f6" />

<br>

## Risico's zonder CAPTCHA

Zonder CAPTCHA kunnen bots je website misbruiken door:

- Contactformulieren te overspoelen met spam
- Kwaadaardige links te plaatsen in reactiesecties
- Duizenden nepaccounts aan te maken
- Wachtwoorden te raden op je inlogpagina

Deze aanvallen kunnen je site vertragen, je database vullen met junkdata en serieuze beveiligingsrisico's veroorzaken.

<br>

## Soorten CAPTCHA

| Type | Hoe het werkt | Gebruikerservaring | Beveiliging |
| --- | --- | --- | --- |
| **Tekst/afbeelding** | Je typt vervormde letters of cijfers over. | **Slecht** — irritant en vaak slecht leesbaar. | **Laag** — moderne bots lossen dit eenvoudig op. |
| **Checkbox** | Je vinkt een "Ik ben geen robot"-vakje aan. | **Goed** — eenvoudig voor mensen; soms verschijnt er een afbeeldingstest. | **Hoog** — effectief tegen de meeste bots. |
| **Invisible** | Werkt op de achtergrond, geen kliks nodig. | **Uitstekend** — volledig drempelloos. | **Zeer hoog** — de huidige standaard voor veiligheid en gebruiksgemak. |

<br>

## CAPTCHA installeren

Voor de meeste websites is **Google reCAPTCHA v3 (Invisible)** de beste keuze.

<br>

### Stap 1 — Vraag je sleutels aan bij Google

1. Ga naar de [Google reCAPTCHA-website↗](https://www.google.com/recaptcha/).
2. Registreer je site en kies **reCAPTCHA v3**.
3. Google geeft je twee sleutels: een **Site Key** en een **Secret Key**.

<br>

### Stap 2 — Voeg CAPTCHA toe aan je site

**Voor WordPress-sites:**

1. Installeer een plugin zoals **WPForms**, **Contact Form 7** of **reCAPTCHA by BestWebSoft**.
2. Open de instellingen van de plugin.
3. Plak de **Site Key** en **Secret Key**.
4. Sla op — de plugin doet de rest.

**Voor custom websites:**

1. Voeg het JavaScript-snippet van Google toe aan de HTML van je site.
2. Gebruik je **Secret Key** in je backend-code om gebruikers te verifiëren wanneer ze een formulier verzenden.

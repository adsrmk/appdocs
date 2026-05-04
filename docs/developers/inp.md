# INP

[Interaction to Next Paint↗](https://web.dev/articles/inp) (**INP**) is een Core Web Vital die de algehele responsiviteit van een pagina meet. Sinds **maart 2024** heeft Google **FID (First Input Delay)** officieel vervangen door INP, om een vollediger beeld te geven van de gebruikerservaring.

<img width="777" height="317" alt="image" src="https://github.com/user-attachments/assets/4af2b74f-70de-4183-8ee5-2f4dabb4b50a" />

<br>

Waar FID alleen de vertraging van de **eerste** interactie meet, meet INP hoe lang het duurt voordat de pagina visueel reageert op **elke** klik, tap en toetsenbordinvoer tijdens een sessie.

<br>

## Streefwaarden

Voor een soepele gebruikerservaring streef je naar de volgende INP-scores:

| Score | Beoordeling |
| --- | --- |
| **≤ 200 ms** | Goed |
| **200 – 500 ms** | Voor verbetering vatbaar |
| **> 500 ms** | Slecht |

<br>

## INP optimaliseren

Houd de interactie-latency laag met deze strategieën:

- **Breek lange taken op** — Gebruik yielding-technieken zoals `scheduler.yield()` of `setTimeout()` om grote JavaScript-functies op te splitsen, zodat de browser responsief blijft.
- **Optimaliseer CSS & layout** — Verminder de complexiteit van CSS-selectors en het totale aantal HTML-elementen (DOM-grootte) om het renderen van het volgende frame te versnellen.
- **Vermijd main-thread blocking** — Verplaats zware, niet-UI-logica naar **Web Workers**, zodat de main thread vrijblijft voor gebruikersinteracties.
- **Geef directe feedback** — Zorg dat de UI direct visueel reageert (een hover-state, loader of pressed-state) ook als het achterliggende proces langer duurt.

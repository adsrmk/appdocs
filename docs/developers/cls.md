# CLS

**Cumulative Layout Shift (CLS)** meet hoeveel elementen op een pagina onverwacht bewegen tijdens het laden. Het kwantificeert "visuele schokken" — bijvoorbeeld wanneer je op het punt staat een link aan te klikken, maar er plotseling een advertentie bovenaan inlaadt waardoor de link naar beneden schuift en je iets verkeerds aanklikt.

In tegenstelling tot LCP of INP wordt CLS niet in seconden gemeten. Het is een score, berekend op basis van de "impact fraction" en "distance fraction" van verschuivende elementen op de pagina.

<img width="932" height="344" alt="cls_061" src="https://github.com/user-attachments/assets/dca11dd8-fded-4e51-87a2-d472e9a03c22" />

<br>

## Veelvoorkomende oorzaken van verschuivingen

- **Afbeeldingen zonder afmetingen** — De browser reserveert geen ruimte, waardoor tekst opspringt zodra de afbeelding laadt.
- **Advertenties en embeds** — Dynamische content die laat in de layout verschijnt.
- **Webfonts** — Tekst "springt" wanneer een custom font een fallback-font vervangt.
- **Geïnjecteerde content** — Banners of formulieren die via JavaScript boven bestaande content worden toegevoegd.

<br>

## Hoe verlaag je CLS?

- **Stel expliciete afmetingen in** — Voeg altijd `width`- en `height`-attributen toe aan `<img>`- en `<video>`-elementen.
- **Reserveer ruimte voor advertenties** — Gebruik CSS-placeholders (`min-height`) voor dynamische containers, zodat ze de layout niet wegduwen.
- **Optimaliseer fonts** — Gebruik `font-display: swap` of preload sleutelfonts om visuele verschuivingen te minimaliseren.
- **Vermijd injecties bovenaan** — Voeg nieuwe UI-elementen alleen *onder* de huidige viewport toe, tenzij dit door een gebruikersactie wordt geactiveerd.

# Geoptimaliseerde font-aflevering

In 2026 zijn webfonts niet langer de "performance killers" die ze ooit waren — mits je gebruikmaakt van moderne technieken. Slechte font-implementatie leidt typisch tot twee grote problemen: **FOIT (Flash of Invisible Text)** en **CLS (Cumulative Layout Shift)**.

<br>

## Gebruik alleen WOFF2

Vergeet `.ttf`, `.otf` en het originele `.woff`. **WOFF2** is tegenwoordig het enige formaat dat je nog hoeft te serveren. Het gebruikt Brotli-compressie en is ongeveer **30% kleiner** dan zijn voorganger.

```css
@font-face {
  font-family: 'Inter';
  src: url('fonts/inter-bold.woff2') format('woff2'); /* [!code focus] */
  font-weight: 700;
  font-display: swap;
}
```

<br>

## Voorkom FOIT met `font-display`

De `font-display`-property bepaalt hoe de browser zich gedraagt terwijl een font-bestand nog wordt gedownload.

| Waarde | Gedrag | Geschikt voor |
| --- | --- | --- |
| **`swap`** | Toont direct het systeemfont en wisselt zodra het eigen font is geladen. | Algemene bodytekst (prioriteit voor leesbaarheid). |
| **`fallback`** | Korte onzichtbaarheid (~100 ms), daarna systeemfont, daarna swap. | Een balans tussen UX en prestaties. |
| **`optional`** | Als het font niet binnen ~100 ms klaar is, wisselt de browser nooit meer. | Beste voor prestaties en CLS — voorkomt layout-schokken. |
| **`block`** | Verbergt de tekst tot het font klaar is (tot 3 s). | Vermijden — tenzij het font een icon-set is. |

<br>

## Host je fonts zelf

Google Fonts is handig, maar **self-hosting** is inmiddels de standaard voor performance-gerichte sites — om meerdere redenen:

- **Geen extra DNS-lookup** — Je hebt geen preconnect naar `fonts.gstatic.com` nodig, wat externe requests vermindert en de laadtijd licht verbetert.
- **Voorspelbaarheid** — Je hebt volledige controle over caching en kunt long-lived headers als `Cache-Control: immutable` instellen voor snellere herhaalbezoeken.
- **Privacy** — Fonts worden vanaf je eigen domein geserveerd. Dit elimineert verzoeken aan derden en mogelijke tracking, en maakt je site AVG- en CCPA-vriendelijker.

<div class="tip custom-block" style="padding-top: 8px">
Gebruik de <a href="https://gwfh.mranftl.com/fonts">Google Webfonts Helper↗</a> om font-bestanden eenvoudig te downloaden en de bijbehorende CSS te genereren — een snelle en correcte manier om een Google Font zelf te hosten.
</div>

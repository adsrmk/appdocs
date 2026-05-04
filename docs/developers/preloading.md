# Link Preloading

Link preloading is een performance-techniek waarmee je de browser vertelt om een bron — *zoals een script, stylesheet of afbeelding* — zo vroeg mogelijk te downloaden, omdat hij die binnenkort nodig heeft. Door de fetch eerder in de page-lifecycle te starten kun je **Largest Contentful Paint (LCP)** flink verlagen en de algehele gebruikerservaring verbeteren.

Er zijn meerdere manieren om de browser te "hinten" wat hij moet ophalen of voorbereiden. De juiste keuze hangt af van **wanneer** en **waar** de bron wordt gebruikt.

<br>

## Beschikbare directives

| Directive | Doel |
| --- | --- |
| **`preload`** | Hoge-prioriteits-fetch voor de **huidige** pagina. |
| **`prefetch`** | Lage-prioriteits-fetch voor de **volgende** navigatie. |
| **`preconnect`** | Maakt vooraf verbinding (DNS + TCP + TLS) met een domein. |
| **`dns-prefetch`** | Resolvet alleen de DNS van een domein. |

<br>

## 1. `rel="preload"`

Gebruik `preload` voor **kritieke assets** die de browser-scanner anders zou kunnen missen — bijvoorbeeld fonts die binnen CSS worden gedefinieerd, of CSS-achtergrondafbeeldingen.

```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

### Belangrijke attributen

- **`as`** *(verplicht)* — Vertelt de browser om welk type bron het gaat, zodat hij de juiste prioriteit en security-headers kan toepassen. Veelvoorkomende waarden: `script`, `style`, `font`, `image`, `fetch`.
- **`crossorigin`** *(verplicht voor fonts)* — Ook bij fonts op hetzelfde domein moeten ze worden opgehaald in anonieme CORS-modus.
- **`type`** *(optioneel)* — Laat de browser formats overslaan die niet ondersteund worden (bijvoorbeeld `type="image/webp"`).

<br>

## 2. `rel="prefetch"`

Gebruik `prefetch` voor bronnen die je waarschijnlijk nodig hebt op de **volgende** pagina die een gebruiker bezoekt. De browser downloadt deze op lage prioriteit wanneer hij idle is.

```html
<link rel="prefetch" href="/next-page-assets/hero-image.jpg">
```

<div class="warning custom-block" style="padding-top: 8px">
Gebruik <code>prefetch</code> niet voor kritieke assets van de huidige pagina — het concurreert dan met urgentere bronnen om bandbreedte en kan de site juist vertragen.
</div>

<br>

## 3. `rel="preconnect"`

`preconnect` laat de browser **vooraf** verbindingen opzetten, vóórdat er daadwerkelijk een HTTP-verzoek wordt verstuurd. Hiermee elimineer je de round-trip-latency van DNS-lookups, TCP-handshakes en TLS-onderhandelingen.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.example.com" crossorigin>
```

### Wanneer gebruiken?

- **Third-party fonts** — Bij verbinden met Google Fonts of Adobe Fonts.
- **CDN-assets** — Wanneer je weet dat je afbeeldingen of scripts vanaf een specifiek edge-domein nodig hebt.
- **Streaming media** — Om de verbinding alvast voor te bereiden voor een videoplayer.

<br>

Wil je je verder verdiepen in link preloading? Er zijn nog veel meer geavanceerde mogelijkheden. Lees meer op [web.dev↗](https://web.dev/articles/preload-critical-assets).

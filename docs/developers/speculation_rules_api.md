# Speculation Rules API

De **Speculation Rules API** is een JSON-gebaseerde configuratie waarmee ontwikkelaars de browser programmatisch kunnen vertellen om specifieke URL's te **prefetchen** (resources downloaden) of te **prerenderen** (de hele pagina op de achtergrond renderen).

In tegenstelling tot het oudere link-preloading biedt deze API granulaire controle over *eagerness* en ondersteunt volledige pagina-rendering — waardoor pagina-overgangen écht direct aanvoelen.

<div class="warning custom-block" style="padding-top: 8px">
De Speculation Rules API wordt momenteel alleen ondersteund in <b>Chromium-gebaseerde browsers</b> (Chrome, Edge, Opera). Andere browsers zoals Safari en Firefox negeren deze regels volledig.
</div>

<br>

## Basisimplementatie

De eenvoudigste manier om de API te gebruiken is door een lijst met specifieke URL's mee te geven die de browser vooraf moet voorbereiden.

```html [/public_html/wp-content/themes/jouw-thema/header.php]
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": ["/page1", "/page2", "/page3"],
      "eagerness": "eager"
    }
  ]
}
</script>
```

<br>

### Belangrijkste concepten

| Actie | Beschrijving |
| --- | --- |
| **`prefetch`** | Downloadt de HTML en assets in de cache. |
| **`prerender`** | Downloadt de pagina, voert JavaScript uit en bouwt de DOM op in een onzichtbaar tabblad. |

<br>

**Eagerness-niveaus:**

- **`immediate`** — Zodra de regel is verwerkt.
- **`eager`** — Bij de minste hint van intentie (zoals de muis die richting een link beweegt).
- **`moderate`** — Bij `pointerdown` — het moment waarop de gebruiker klikt, vóór het loslaten.
- **`conservative`** — Alleen bij hover of mouse-down.

<br>

## Document-gebaseerde regels

In plaats van elke URL handmatig op te sommen kun je **Document Rules** gebruiken. Hiermee laat je de browser automatisch speculeren over links in de HTML die aan bepaalde patronen voldoen.

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "document",
      "where": {
        "and": [
          { "href_matches": "/*" },
          { "not": { "href_matches": ["/logout", "/admin/*", "*/wp-admin/*"] } },
          { "not": { "selector_matches": ".my_button" } }
        ]
      },
      "eagerness": "moderate"
    }
  ]
}
</script>
```

- **`href_matches`** — Gebruikt glob-patronen om paden in of uit te sluiten.
- **`selector_matches`** — Sluit specifieke links uit op basis van CSS-selectors — handig om te voorkomen dat bijvoorbeeld de uitlog-knop op de achtergrond wordt "geklikt".

<br>

## Waar plaats je de regels?

Je kunt de regels direct in je HTML opnemen als **inline script** — in de `<head>` of aan het einde van de `<body>`.

<div class="tip custom-block" style="padding-top: 8px">
Plaats het script bij voorkeur aan het einde van de <code>&lt;body&gt;</code>. Zo blokkeer je het initiële renderen niet, terwijl het script alsnog actief wordt zodra de gebruiker met de pagina begint te interacteren.
</div>

Voor geavanceerdere setups (of als je geen directe toegang hebt tot de HTML-template, zoals in sommige CMS-omgevingen), kun je de regels ook leveren via een HTTP-response-header — `Speculation-Rules` — die naar een JSON-bestand verwijst.

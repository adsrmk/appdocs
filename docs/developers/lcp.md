# LCP en FCP

**First Contentful Paint (FCP)** en **Largest Contentful Paint (LCP)** zijn twee van de belangrijkste paint-metrics voor het meten van waargenomen prestaties. FCP markeert het **begin** van de laadervaring, terwijl LCP het moment markeert waarop de **belangrijkste** content klaar is.

<br>

## First Contentful Paint (FCP)

FCP is het moment waarop de gebruiker voor het eerst **iets** van de pagina-inhoud op het scherm ziet. Het is de cruciale eerste indruk — het moment waarop een wit scherm verandert in iets dat bevestigt dat de pagina aan het laden is.

FCP meet de tijd totdat de browser het eerste stukje content rendert: tekst, een afbeelding, een SVG of een niet-wit canvas-element. Een snelle FCP geeft de gebruiker het signaal dat er iets gebeurt, waardoor de kans dat hij de pagina verlaat afneemt.

<br>

### FCP-prestatiedrempels

Deze drempels zijn gemeten op het **75e percentiel** van paginaladingen.

| Beoordeling | FCP-score | Gebruikersperceptie |
| --- | --- | --- |
| **Goed** | **≤ 1,8 s** | De pagina laadt snel. |
| Voor verbetering vatbaar | 1,8 – 3,0 s | De pagina laadt, maar kan sneller. |
| Slecht | > 3,0 s | De pagina laadt traag — dat zorgt voor frustratie. |

<br>

### FCP optimaliseren

Het verbeteren van FCP draait om het minimaliseren van de tijd die de browser nodig heeft om de eerste content te renderen — kortom: het stroomlijnen van het **critical rendering path**.

| Strategie | Wat het doet | Hoe doe je dat |
| --- | --- | --- |
| **Render-blokkerende bronnen elimineren** | De browser moet CSS en JavaScript downloaden en verwerken voordat hij iets kan renderen. | Gebruik `async` of `defer` voor niet-kritieke scripts, inline kritieke CSS, en media queries voor niet-kritieke CSS. |
| **Server response-tijd verkorten (TTFB)** | De tijd die de server nodig heeft om de eerste byte content te leveren. | Optimaliseer server-side code, gebruik een CDN, en implementeer caching. |
| **Preconnect naar belangrijke origins** | Stel vroeg verbindingen op met belangrijke externe origins. | Gebruik `<link rel="preconnect">` voor domeinen die kritieke assets hosten (fonts, API's). |
| **Critical request-depth verkleinen** | Verminder de afhankelijkheden die geladen moeten worden voordat de hoofdcontent kan renderen. | Verlaag het aantal kritieke bestanden en houd ze klein. |

<br>

## Largest Contentful Paint (LCP)

Waar FCP de eerste paint is, markeert **LCP** het moment waarop de *belangrijkste* content van de pagina is geladen. Het rapporteert de rendertijd van het grootste zichtbare beeld, tekstblok of video-element binnen de viewport — een sterke indicator van **waargenomen laadsnelheid**, omdat het aangeeft wanneer de gebruiker de pagina daadwerkelijk kan gebruiken.

<br>

### LCP-prestatiedrempels

Een snelle LCP is belangrijk voor gebruikerstevredenheid én een ranking-factor bij Google.

| Beoordeling | LCP-score | Gebruikersperceptie |
| --- | --- | --- |
| **Goed** | **≤ 2,5 s** | De pagina is volledig geladen en klaar voor gebruik. |
| Voor verbetering vatbaar | 2,5 – 4,0 s | De hoofdcontent verschijnt merkbaar laat. |
| Slecht | > 4,0 s | De pagina voelt kapot of erg traag aan. |

<br>

### Welke elementen tellen mee voor LCP?

Het LCP-element wordt dynamisch bepaald tijdens het laden en is altijd één van deze typen:

- `<img>`-elementen
- `<image>`-elementen binnen een `<svg>`
- Block-level elementen met een CSS-achtergrondafbeelding via `url()`
- Block-level tekstelementen (`<h1>`, `<p>`, etc.) met tekstinhoud
- `<video>`-elementen (gebruikt de laadtijd van de poster-afbeelding)

<br>

## FCP vs LCP

Beide metrics meten "paint", maar ze hebben verschillende doelen. FCP gaat over het **begin** van de laadervaring; LCP over de **voltooiing** van de belangrijkste laadervaring.

| Kenmerk | **FCP** | **LCP** |
| --- | --- | --- |
| **Wat het meet** | Tijd tot de eerste content verschijnt | Tijd tot het grootste content-element verschijnt |
| **Gebruikersvraag** | "Is deze pagina aan het laden?" | "Is de hoofdcontent er al?" |
| **Streefwaarde** | **≤ 1,8 s** | **≤ 2,5 s** |
| **Optimalisatiefocus** | Render-blokkerende bronnen elimineren | Het laden en renderen van het grootste element prioriteren |
| **Relatie** | Komt altijd *vóór* LCP | Een betekenisvollere maat voor waargenomen voltooiing |

<br>

Een snelle **FCP** beheert de initiële spanning bij de gebruiker, en een snelle **LCP** bevestigt dat de pagina klaar is voor gebruik. Een echt vloeiende ervaring is er één waar het gat tussen FCP en LCP minimaal is — een naadloze overgang van "laden" naar "klaar".

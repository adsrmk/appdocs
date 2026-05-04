# Afbeeldingsformaten

Moderne webontwikkeling draait om de balans tussen visuele kwaliteit en prestaties. Het gebruik van next-gen afbeeldingsformaten is een van de effectiefste manieren om **pagina's lichter te maken**, **Largest Contentful Paint (LCP)** te verbeteren en **bandbreedte van gebruikers te besparen**.

<br>

## Formaatvergelijking

| Formaat | Extensie | Sterkte | Browserondersteuning / opmerkingen |
| --- | --- | --- | --- |
| **AVIF** | `.avif` | Hoogste compressieratio; HDR-ondersteuning | Hoog (Chrome, Firefox, Safari) |
| **WebP** | `.webp` | Uitstekende balans tussen snelheid en grootte | Universeel |
| **JPEG XL** | `.jxl` | Progressive loading; lossless JPEG-transcodering | Opkomend (Safari, Chrome) |
| **JPEG / PNG** | `.jpg` / `.png` | Universele compatibiliteit | Legacy-fallback |

<br>

## Formaten

### AVIF (AV1 Image File Format)

AVIF biedt de grootste besparing in bestandsgrootte — vaak **50% kleiner dan JPEG** bij dezelfde visuele kwaliteit.

- **Geschikt voor:** Hoogwaardige fotografie, hero-banners en complexe afbeeldingen waarbij bestandsgrootte prioriteit heeft.
- **Nadelen:** Hoger CPU-verbruik bij coderen/decoderen; geen progressive rendering (laadt van boven naar beneden of in één keer).

<br>

### WebP

WebP is de industriestandaard. Het ondersteunt zowel lossy als lossless compressie én alpha-transparantie.

- **Geschikt voor:** Algemene UI-elementen, productminiaturen en het vervangen van transparante PNG's.
- **Nadelen:** Beter dan JPEG, maar wordt in scenario's met veel detail meestal voorbijgestreefd door AVIF.

<br>

### JPEG XL (JXL)

De nieuwste standaard, ontworpen om uiteindelijk alle voorgaande formaten te vervangen.

- **Geschikt voor:** Grote afbeeldingsbibliotheken (dankzij lossless JPEG-transcodering) en responsive webdesign (dankzij superieure progressive loading).
- **Nieuwe tech:** Kan bestaande JPEG's met ~35% verkleinen **zonder kwaliteitsverlies**, en het origineel is bit-voor-bit te reconstrueren indien nodig.

<br>

## Implementatiemethoden

### 1. Managed image-CDN's

Diensten zoals **Jetpack (Photon)**, **Cloudflare Polish** en **Optimole** regelen alles aan de edge.

- **Hoe het werkt:** Je uploadt een standaard JPEG. Wanneer een bezoeker je site bezoekt, detecteert het CDN diens browser. Ondersteunt deze AVIF, dan converteert het CDN de afbeelding on-the-fly en serveert het deze.
- **Geschikt voor:** Grotere sites die niet vijf verschillende versies van elke afbeelding lokaal willen opslaan.

<br>

### 2. Optimalisatieplugins

Voor "set it and forget it"-optimalisatie zijn dit de huidige toppers:

- **Imagify** — Eenvoudige UI; ondersteunt WebP en AVIF.
- **ShortPixel** — Uitstekende compressie en ondersteunt `<picture>`-tag-herschrijving.
- **EWWW Image Optimizer** — Geschikt voor high-volume sites en optimalisatie op serverniveau.

<br>

## Afbeeldingen comprimeren

Het optimaliseren van je afbeeldingen is essentieel voor moderne websites. Zware, ongecomprimeerde afbeeldingen zijn een van de grootste oorzaken van trage laadtijden en een slechte gebruikerservaring.

WordPress biedt plugins zoals **EWWW Image Optimizer**, **Smush**, **ShortPixel** en **Imagify** — maar wij raden aan om afbeeldingen al te comprimeren **voordat** ze in de database terechtkomen. Tools zoals [TinyPNG↗](https://tinypng.com/) en [Squoosh↗](https://squoosh.app/) verkleinen bestanden aanzienlijk zonder dat de visuele kwaliteit eronder lijdt.

<img width="730" height="483" alt="image" src="https://github.com/user-attachments/assets/7ef3f41c-0861-45bf-a4df-2a02826fc92b" />

<br>

## Best-practice tips

- **Niet te ver comprimeren** — AVIF is zo efficiënt dat een kwaliteitsinstelling van **70–80** in WordPress meestal voldoende is.
- **Bewaar je originelen** — Bewaar altijd je originele JPEG's/PNG's. Schakel je ooit een conversieplugin uit, dan heb je die nodig om je bibliotheek opnieuw op te bouwen.
- **Gebruik Fetch Priority** — Voor je **LCP (hero) image**, gebruik de *Fetch Priority*-instelling in de WordPress Block Editor (tabblad Geavanceerd) om ervoor te zorgen dat deze afbeelding vóór andere assets wordt geladen.

WordPress biedt nog meer geavanceerde afbeeldingsfuncties (zoals *dominant color placeholders*), maar deze next-gen formaatstrategieën zijn de meest gebruikte manieren om écht prestatiewinst te boeken.

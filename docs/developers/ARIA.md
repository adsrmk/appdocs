# ARIA-attributen

**ARIA** staat voor **Accessible Rich Internet Applications**. Het is een set HTML-attributen die hulptechnologieën — zoals screenreaders — extra context geven over je interface wanneer semantische HTML alleen niet voldoende is. ARIA overbrugt het gat voor complexe UI-componenten zoals tabs, menu's en dynamische content-updates die geen native HTML-equivalent hebben.

ARIA vertelt een screenreader drie soorten dingen over een element:

- De **rol** — bijv. "deze `<div>` is een knop"
- De **status** — bijv. "deze knop is uitgeschakeld"
- De **eigenschappen** — bijv. "dit selectievakje is aangevinkt"

<br>

## De eerste regel van ARIA: gebruik ARIA niet

ARIA is altijd een **laatste redmiddel**. De officiële W3C-specificatie stelt het zo:

> "If you can use a native HTML element or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so."

In de praktijk betekent dit:

| In plaats van dit | Gebruik dit |
| --- | --- |
| `<div role="button">` | `<button>` |
| `<div role="navigation">` | `<nav>` |
| `<div role="checkbox" aria-checked="true">` | `<input type="checkbox" checked>` |

<div class="warning custom-block" style="padding-top: 8px">
Native HTML-elementen hebben standaard al ingebouwde toetsenbordtoegankelijkheid, focusbeheer en semantiek. Gebruik je in plaats daarvan ARIA, dan <b>beloof</b> je dat je al dat verwachte gedrag handmatig implementeert met JavaScript. Onjuist gebruikte ARIA maakt je site <b>minder toegankelijk</b> dan helemaal geen ARIA.
</div>

<br>

## Wanneer ARIA wel gebruiken?

Gebruik ARIA alleen wanneer een component echt niet met semantische HTML gebouwd kan worden. Veelvoorkomende situaties zijn:

- **Custom interactieve widgets** — Componenten zoals sliders, tabs, accordeons of aangepaste menu's die geen native HTML-equivalent hebben.
- **Live-wijzigingen communiceren** — Wanneer content dynamisch wordt bijgewerkt zonder paginalading (bijv. een "nieuw bericht"-melding of live-zoekresultaten), kunnen **ARIA live regions** een screenreader laten aankondigen wat er verandert.
- **Extra labels toevoegen** — Om een toegankelijke naam te geven aan elementen zonder zichtbare tekst, zoals iconenknoppen.

<br>

## Rollen, statussen en eigenschappen

ARIA-attributen vallen uiteen in twee hoofdcategorieën.

### Rollen

Bepalen *wat* een element is — zodat een screenreader weet hoe het aan te kondigen.

- **`role="tablist"`** — Een container voor een set tabbladen.
- **`role="tab"`** — Een afzonderlijk tabblad.
- **`role="tabpanel"`** — Het contentpaneel dat bij een tab hoort.
- **`role="alert"`** — Een bericht met belangrijke, tijdgevoelige informatie.

<br>

### Statussen en eigenschappen

Beschrijven de huidige toestand of kenmerken van een element.

- **`aria-expanded="true"` / `"false"`** — Geeft aan of een inklapbaar element (zoals een accordeon) open of gesloten is.
- **`aria-hidden="true"`** — Verbergt een element voor hulptechnologieën.
- **`aria-label="Sluiten"`** — Geeft een toegankelijke naam aan een element (bijv. een "X"-iconenknop).
- **`aria-required="true"`** — Geeft aan dat een formulierveld verplicht is.

<br>

<div class="tip custom-block" style="padding-top: 8px">
Begin altijd met semantische HTML. Voeg pas ARIA toe waar native elementen tekortschieten — en test altijd met een screenreader om te bevestigen dat het zich gedraagt zoals verwacht.
</div>

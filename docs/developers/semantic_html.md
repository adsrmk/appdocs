# Semantische HTML

Semantische HTML betekent dat je HTML-elementen gebruikt op basis van hun **doel**, niet op basis van hoe ze eruitzien. In plaats van overal generieke `<div>`- en `<span>`-tags te gebruiken, maak je gebruik van het rijke vocabulaire aan HTML5-elementen om te beschrijven wat de content daadwerkelijk is.

Dat resulteert in code die voor ontwikkelaars beter leesbaar is, door zoekmachines beter wordt begrepen (SEO), en — het allerbelangrijkst — veel toegankelijker is voor mensen die gebruikmaken van hulptechnologieën zoals screenreaders.

<img width="670" height="412" alt="image" src="https://github.com/user-attachments/assets/fd76892c-274a-41b1-a0e3-dd304d433f50" />

<br>

## Waarom is dit belangrijk?

- **Toegankelijkheid** — Screenreaders gebruiken de HTML-structuur om door een pagina te navigeren. Een gebruiker kan z'n screenreader vragen om alle headings op te sommen of direct naar de hoofdnavigatie te springen. Bij een `<div>` die als knop is opgemaakt, gaat die context verloren. Een echt `<button>`-element biedt standaard toetsenbordtoegankelijkheid en vertelt de screenreader meteen wat het is.
- **Leesbaarheid & onderhoudbaarheid** — Andere ontwikkelaars kunnen de code makkelijker lezen en onderhouden. `<header>`, `<nav>`, `<main>` en `<footer>` zijn meteen herkenbaar.
- **SEO** — Zoekmachines kunnen de structuur en het belang van je content beter interpreteren, wat de rankings ten goede kan komen.

<br>

## Het "div soup"-probleem

Een veelvoorkomend anti-patroon is het opbouwen van complete layouts uit alleen `<div>`-elementen — ook wel *div soup* genoemd. Met CSS ziet dat er prima uit, maar het heeft geen enkele structurele betekenis.

### ❌ Doe dit niet

```html
<div id="header">
  <div id="nav">...</div>
</div>

<div id="main-content">
  <div class="article">
    <h1>Article Title</h1>
    <p>Content...</p>
  </div>
</div>

<div id="footer">...</div>
```

### ✅ Gebruik semantische HTML

HTML5 biedt veel elementen om een pagina goed te structureren:

```html
<header>
  <nav>...</nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</main>

<footer>...</footer>
```

<br>

## Belangrijke semantische elementen

Bestaat er een passend semantisch element? Geef daar dan altijd de voorkeur aan boven een generieke tag. De belangrijkste:

| Element | Doel |
| --- | --- |
| **`<header>`** | Inleidende content voor een pagina of sectie. |
| **`<nav>`** | De primaire navigatielinks van een site. |
| **`<main>`** | De belangrijkste, unieke content van de pagina (slechts één per pagina). |
| **`<section>`** | Een thematische groepering van content, meestal met een heading. |
| **`<article>`** | Een op zichzelf staand stuk content dat zelfstandig gedeeld kan worden (bijv. een blogpost of product). |
| **`<aside>`** | Content die zijdelings gerelateerd is aan de omringende content (bijv. een sidebar of pull quote). |
| **`<footer>`** | De footer van een pagina of sectie — vaak metadata, copyright of contactgegevens. |
| **`<figure>` / `<figcaption>`** | Groepeert een afbeelding, diagram of code-snippet samen met een onderschrift. |
| **`<button>`** | Elk element dat een actie uitvoert wanneer erop geklikt wordt. Gebruik **nooit** `<div>` of `<a>` als knop. |

# Semantic HTML

Semantic HTML means using HTML elements based on their **purpose** rather than their appearance. Instead of relying on generic `<div>` and `<span>` tags, you use HTML5's rich vocabulary of elements to describe what the content actually is.

This results in code that is more readable for developers, better understood by search engines (SEO), and — most importantly — much more accessible for people using assistive technologies like screen readers.

<img width="670" height="412" alt="image" src="https://github.com/user-attachments/assets/fd76892c-274a-41b1-a0e3-dd304d433f50" />

<br>

## Why does it matter?

- **Accessibility** — Screen readers use HTML structure to navigate a page. A user can ask their screen reader to list all headings or jump to the main navigation. With a `<div>` styled to look like a button, that context is lost. A real `<button>` element provides built-in keyboard accessibility and tells the screen reader exactly what it is.
- **Readability & maintainability** — Code becomes easier for other developers to read and maintain. `<header>`, `<nav>`, `<main>`, and `<footer>` are instantly recognisable.
- **SEO** — Search engines can better interpret your content's structure and importance, which can improve rankings.

<br>

## The "div soup" problem

A common anti-pattern is building entire layouts from `<div>` elements — often called *div soup*. CSS can make it look correct, but it has zero structural meaning.

### ❌ Don't do this

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

### ✅ Use semantic HTML

HTML5 provides a wide range of elements to structure a page properly:

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

## Key semantic elements

Whenever a suitable semantic element exists, prefer it over a generic one. The most important ones to know:

| Element | Purpose |
| --- | --- |
| **`<header>`** | Introductory content for a page or section. |
| **`<nav>`** | Primary navigation links for a site. |
| **`<main>`** | The main, unique content of the page (only one per page). |
| **`<section>`** | A thematic grouping of content, typically with a heading. |
| **`<article>`** | A self-contained piece of content that could be distributed independently (e.g. a blog post or product). |
| **`<aside>`** | Content tangentially related to its surroundings (e.g. a sidebar or pull quote). |
| **`<footer>`** | The footer of a page or section — often metadata, copyright, or contact info. |
| **`<figure>` / `<figcaption>`** | Group an image, diagram, or code snippet together with its caption. |
| **`<button>`** | Any element that performs an action when clicked. **Never** use `<div>` or `<a>` tags for buttons. |

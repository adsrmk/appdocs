# ARIA Attributes

**ARIA** stands for **Accessible Rich Internet Applications**. It's a set of HTML attributes that give assistive technologies — like screen readers — extra context about your interface when semantic HTML alone isn't enough. ARIA bridges the gap for complex UI components like tabs, menus, and live content updates that don't have a native HTML equivalent.

ARIA tells a screen reader three kinds of things about an element:

- Its **role** — e.g. "this `<div>` is a button"
- Its **state** — e.g. "this button is disabled"
- Its **properties** — e.g. "this checkbox is checked"

<br>

## The first rule of ARIA: don't use ARIA

ARIA should always be a **last resort**. The official W3C specification puts it like this:

> "If you can use a native HTML element or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so."

In practice, this means:

| Instead of this | Use this |
| --- | --- |
| `<div role="button">` | `<button>` |
| `<div role="navigation">` | `<nav>` |
| `<div role="checkbox" aria-checked="true">` | `<input type="checkbox" checked>` |

<div class="warning custom-block" style="padding-top: 8px">
Native HTML elements come with built-in keyboard accessibility, focus management, and semantics. When you use ARIA instead, you're <b>promising</b> to manually implement all that expected behaviour with JavaScript. Incorrectly used ARIA can make your site <b>less accessible</b> than no ARIA at all.
</div>

<br>

## When to use ARIA

Only use ARIA when a component genuinely can't be built with semantic HTML. Common cases include:

- **Custom interactive widgets** — Components like sliders, tabs, accordions, or custom menus that have no native HTML equivalent.
- **Communicating live changes** — When content updates dynamically without a page reload (e.g. a "new message" notification or live search results), ARIA **live regions** can tell a screen reader to announce the change.
- **Providing additional labels** — To give an accessible name to elements without visible text, such as icon-only buttons.

<br>

## Roles, states, and properties

ARIA attributes fall into two main categories.

### Roles

Define what an element *is* — so a screen reader knows how to announce it.

- **`role="tablist"`** — A container for a set of tabs.
- **`role="tab"`** — An individual tab.
- **`role="tabpanel"`** — The content panel associated with a tab.
- **`role="alert"`** — A message with important, time-sensitive information.

<br>

### States and properties

Describe an element's current condition or characteristics.

- **`aria-expanded="true"` / `"false"`** — Whether a collapsible element (like an accordion) is open or closed.
- **`aria-hidden="true"`** — Hides an element from assistive technologies.
- **`aria-label="Close"`** — Provides an accessible name for an element (e.g. an "X" icon button).
- **`aria-required="true"`** — Indicates that a form input is required.

<br>

<div class="tip custom-block" style="padding-top: 8px">
Always start with semantic HTML. Only add ARIA where native elements fall short — and always test with a screen reader to confirm it behaves as expected.
</div>

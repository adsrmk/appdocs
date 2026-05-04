# INP

[Interaction to Next Paint↗](https://web.dev/articles/inp) (**INP**) is a Core Web Vital that measures a page's overall responsiveness. As of **March 2024**, Google officially replaced **FID (First Input Delay)** with INP to provide a more complete picture of user experience.

<img width="777" height="317" alt="image" src="https://github.com/user-attachments/assets/4af2b74f-70de-4183-8ee5-2f4dabb4b50a" />

<br>

While FID only measured the delay of the **first** interaction, INP measures how long it takes the page to visually respond to **every** click, tap, and keyboard input throughout a session.

<br>

## Target values

For a smooth experience, aim for the following INP scores:

| Score | Rating |
| --- | --- |
| **≤ 200 ms** | Good |
| **200 – 500 ms** | Needs improvement |
| **> 500 ms** | Poor |

<br>

## How to optimise INP

To keep interaction latency low, focus on these strategies:

- **Break up long tasks** — Use yielding techniques like `scheduler.yield()` or `setTimeout()` to split large JavaScript functions into smaller pieces, so the browser stays responsive.
- **Optimise CSS & layout** — Reduce the complexity of CSS selectors and the total number of HTML elements (DOM size) to speed up the rendering of the next frame.
- **Avoid main-thread blocking** — Move heavy, non-UI logic to **Web Workers** so the main thread stays free for user interactions.
- **Provide immediate feedback** — Make sure the UI gives an instant visual response (a button hover state, loader, or pressed state) even if the underlying process takes longer.

When bumping the portfolio version (e.g., v1.6 → v1.7), you MUST update the version string in ALL of the following locations:

1. `CHANGELOG.md` — Add a new version section with the date and full list of changes.
2. `index.html` (changelog viewer) — Add a new `<div class="cl-entry">` block matching the CHANGELOG.md entry. Move the `<span class="cl-badge latest">LATEST</span>` badge to the new entry and remove it from the previous. Set the new entry's `<div class="cl-body open">` and the old one to `<div class="cl-body">` (collapsed).
3. `index.html` (hero section) — Update the `data-text` attribute on the `.glitch-text` h1 element to reflect the new version (e.g., `data-text="Initializing AI Developer Portfolio v1.7"`).
4. `index.html` (changelog terminal bar) — Update the `<span class="terminal-title">` text (e.g., `portfolio.changelog — Bryans.tech v1.7`).
5. `index.html` (changelog version tab) — Update the `<span class="cl-tab-label">` text (e.g., `v1.7`).
6. `script.js` (heroVersion constant) — Update the `heroVersion` constant (e.g., `const heroVersion = 'v1.7';`). This is the value used by the typewriter animation and controls what the user actually sees in the hero section.
7. `script.js` (bilingual dictionary) — Update the `typewriter` key in BOTH the English (`en`) and Spanish (`es`) translation objects to the new version string.

Failing to update ALL seven locations will result in an inconsistent user experience.

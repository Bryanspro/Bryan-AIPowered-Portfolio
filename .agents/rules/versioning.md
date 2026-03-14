When bumping the portfolio version (e.g., v1.1 → v1.2), you MUST update the version string in ALL of the following locations:

1. `CHANGELOG.md` — Add a new version section with the date and full list of changes.
2. `index.html` (changelog viewer) — Add a new `<div class="cl-entry">` block matching the CHANGELOG.md entry.
3. `index.html` (hero section) — Update the `data-text` attribute on the `.glitch-text` h1 element to reflect the new version (e.g., `data-text="Initializing AI Developer Portfolio v1.2"`).
4. `script.js` (bilingual dictionary) — Update the `typewriter` key in BOTH the English (`en`) and Spanish (`es`) translation objects to the new version string.

Failing to update ALL four locations will result in an inconsistent user experience.

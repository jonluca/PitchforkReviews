# Pitchfork Reviews

Manifest V3 migration of removed Chrome Web Store item `gjoegfclkpaladmcogjfkbjacpjiknnj`.

The old background page and bundled jQuery 2.1 dependency were removed. A modern content script now uses `fetch`, `DOMParser`, and `MutationObserver`. Run `npm install`, then `npm run build` for Chrome, Edge, Firefox, and Safari outputs.

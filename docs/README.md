# Atsarul Mujahidin Documentation

Atsarul Mujahidin is a framework-agnostic Islamic SVG/WebP library for modern web applications. The interactive docs are intentionally closer to a real developer portal than a single gallery: the collection, source provenance, API references, framework examples, contribution workflow and individual icon details live in separate routes.

## Interactive routes

- `#/` - product-style landing page with library principles and featured icons
- `#/icons` - searchable icon collection with category/source filters and Fill/Outline/Color controls
- `#/categories` - semantic category index
- `#/docs` - documentation overview
- `#/docs/installation` - Bun installation and build pipeline
- `#/docs/usage` - package imports and asset-first HTML usage
- `#/docs/variants` - logical icon + variant model
- `#/docs/frameworks` - React, Remix, Vue, Nuxt, Svelte, SvelteKit, Angular, Astro and HTML
- `#/docs/sources` - source policy and attribution model
- `#/docs/donations` - donation policy and transparency reporting
- `#/sources` - upstream repository, SVG Repo candidates and Google discovery lane
- `#/contributing` - contributor workflow
- `#/donations` - public humanitarian donation and transparency page
- `library/docs/en/donations.md` - donation allocation policy and transparency report index

Clicking any icon opens a right-hand detail panel. The panel shows the source family, available variants, local asset path and a copyable import statement.

## Design system

The docs use an Islamic-inspired dark interface with emerald and restrained gold accents, geometric background texture, high-contrast typography, compact navigation, command-style search and dense developer-oriented information architecture. Buttons and interactive controls use pointer cursors and visible hover/focus states.

## Source model

There are three explicit source lanes:

1. **Community** - assets supplied for this project and preserved as source artwork.
2. **Google Material Icons** - official Google Material Icons under Apache-2.0, importable with the optional Google importer.
3. **External discovery** - licensed candidates found through sites such as SVG Repo. Google Search is discovery only; a Google result is never treated as a license.

## Markdown references

- `library/docs/en/installation.md` - Bun, npm, pnpm and Yarn installation and build commands
- `library/docs/en/usage.md` - canonical framework and native HTML usage syntax
- `library/docs/en/frameworks.md` - framework adapter usage

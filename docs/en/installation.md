# Installation

A practical reference for building with Atsarul Mujahidin while keeping the artwork local and the provenance visible.

## Install

Install the library with the package manager used by your project. The package exposes semantic category entry points and keeps the artwork as local SVG/WebP assets.

```bash
bun add atsarul-mujahidin
npm install atsarul-mujahidin
pnpm add atsarul-mujahidin
yarn add atsarul-mujahidin
```

### Deno Support

For Deno, use the npm compatibility specifier:

```bash
deno add npm:atsarul-mujahidin
```

## Run the Web Docs locally

If you want to contribute or browse the icon catalog locally:

```bash
git clone <repository>
cd atsarul-mujahidin
bun install
bun run docs
```

For contributors, use Bun for the repository build pipeline. The published package can be installed with Bun, npm, pnpm or Yarn.

## Build the library

To rebuild the library from source (for contributors):

```bash
bun run icons:catalog    # Generate catalog from assets
bun run icons:package    # Package for distribution
bun run icons:validate   # Validate metadata and licenses
bun run build            # Build all artifacts
```

## Package Structure

After installation, the package provides:

```
node_modules/atsarul-mujahidin/
├── react/           # React components
├── vue/             # Vue components
├── svelte/          # Svelte components
├── angular/         # Angular components
├── astro/           # Astro components
├── vanilla/         # Web Component
├── fill/            # Fill variant SVGs
├── outline/         # Outline variant SVGs
├── color/           # Color variant SVGs/WebPs
├── sources/         # Attribution metadata
├── icons/           # Per-category exports
├── catalog.js       # Complete icon catalog
├── categories.js    # Category definitions
├── metadata.js      # Library metadata
└── package.json
```

## Next Steps

- [Usage](./USAGE.md) - Learn how to use icons in your framework
- [Frameworks](./FRAMEWORKS.md) - Framework-specific examples
- [Variants](./VARIANTS.md) - Understand fill, outline, and color variants

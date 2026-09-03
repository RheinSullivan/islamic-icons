# Introduction

## What is Islamic Icons?

Islamic Icons is an open-source icon library that provides 500+ vector (SVG) and raster (WebP) files for displaying Islamic imagery in digital projects. The library is designed to be **source-aware**, **framework-agnostic**, and **attribution-first**.

### Key Features

- **500+ Islamic Icons** - Curated collection covering mosques, prayer, Quran, Ramadan, and community symbols
- **Framework Support** - Works with React, Vue, Svelte, Angular, Astro, or plain HTML
- **Source Attribution** - Every icon includes creator attribution, source URL, license, and provenance
- **Multiple Variants** - Fill, outline, color, and original styles for each logical icon
- **Tree-Shakeable** - Only bundle the icons you actually use
- **Bilingual** - Full support for English and Indonesian (Bahasa Indonesia)
- **Zero Runtime** - No API calls required, all assets are local files

## Why Islamic Icons?

Unlike generic icon libraries, Islamic Icons is purpose-built for Islamic content with:

1. **Authentic Sources** - Icons sourced from reputable Islamic art collections and community contributions
2. **Cultural Sensitivity** - Carefully curated to respect Islamic artistic traditions
3. **Attribution First** - Full transparency about icon origins and licensing
4. **Community Driven** - Open to contributions from the Muslim developer community

## Version 0.1

Current version: **v0.1.0**

Islamic Icons v0.1 includes:
- Core icon set of 500+ icons
- React, Vue, Svelte packages
- Documentation in English and Indonesian
- REST API for icon metadata
- VitePress documentation site

## Quick Start

```bash
# Install with bun (recommended)
bun add athar

# Or with npm
npm install athar
npm install @vyagranexus/islamic-icons
```

```jsx
// React example
import { Kaaba, Mosque } from 'islamic-icons/react';

function App() {
  return (
    <div>
      <Kaaba size={48} variant="fill" />
      <Mosque size={48} variant="outline" />
    </div>
  );
}
```

Continue to [Installation](/docs/installation) for detailed setup instructions.

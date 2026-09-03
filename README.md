# Atsarul Mujahidin (آثَارُ المُجَاهِدِيْنَ)

**Traces of the Mujahidin** - A framework-agnostic Islamic icon library. Create something that leaves a lasting impact for the fighters.

The collection is organized around semantic categories and ships with three style variants (fill, outline, color) per logical icon when the source artwork permits. Every icon is a local asset; no runtime fetch is required to render.

## Installation

```bash
bun add atsarul-mujahidin
npm install atsarul-mujahidin
pnpm add atsarul-mujahidin
yarn add atsarul-mujahidin
```

For Deno, use the npm compatibility specifier:

```bash
deno add npm:atsarul-mujahidin
```

## Usage

### React / JSX

```jsx
import { Kaaba, MosqueSimple } from 'atsarul-mujahidin/react/fill';
// For outline: 'atsarul-mujahidin/react/outline'
// For color: 'atsarul-mujahidin/react/color'

export default function App() {
  return (
    <>
      <Kaaba colors="#10b981" size={32} />
      <MosqueSimple colors="#3b82f6" size={24} />
    </>
  );
}
```

### Vue

```vue
<script setup>
import { Kaaba, MosqueSimple } from 'atsarul-mujahidin/vue/fill';
// For outline: 'atsarul-mujahidin/vue/outline'
// For color: 'atsarul-mujahidin/vue/color'
</script>

<template>
  <Kaaba colors="#10b981" :size="32" />
  <MosqueSimple colors="#3b82f6" :size="24" />
</template>
```

### Svelte / SvelteKit

```svelte
<script>
  import { Kaaba, MosqueSimple } from 'atsarul-mujahidin/svelte/fill';
  // For outline: 'atsarul-mujahidin/svelte/outline'
  // For color: 'atsarul-mujahidin/svelte/color'
</script>

<Kaaba colors="#10b981" size={32} />
<MosqueSimple colors="#3b82f6" size={24} />
```

### Astro

```astro
---
import { Kaaba, MosqueSimple } from 'atsarul-mujahidin/astro/fill';
// For outline: 'atsarul-mujahidin/astro/outline'
// For color: 'atsarul-mujahidin/astro/color'
---
<Kaaba colors="#10b981" size={32} />
<MosqueSimple colors="#3b82f6" size={24} />
```

### Vanilla JS (Web Component)

**NO IMPORT NEEDED** - Use CDN or local script like Bootstrap Icons:

**Via CDN (Recommended):**
```html
<!-- Add this once in your HTML head or before closing body tag -->
<script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.0/vanilla/atsarul-mujahidin.js"></script>

<!-- Then use anywhere in your HTML -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">Masjid</atsarul-mujahidin>
<atsarul-mujahidin variant="quran" colors="#3b82f6" size="24">Al-Quran</atsarul-mujahidin>
<atsarul-mujahidin variant="kaaba" colors="#ef4444" size="48">Kaaba</atsarul-mujahidin>
```

**Via NPM Install:**
```html
<!-- After: npm install atsarul-mujahidin -->
<!-- Add this script tag in your HTML -->
<script src="node_modules/atsarul-mujahidin/vanilla/atsarul-mujahidin.js"></script>

<!-- Then use the web component -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">Masjid</atsarul-mujahidin>
```

### Native HTML

```html
<img src="/assets/icons/mosque/mosque/fill.svg" alt="Mosque" width="24" height="24" />
```

### TypeScript / JavaScript (Direct imports)

```ts
import { categories, catalog, metadata } from 'atsarul-mujahidin';
import { mosque, mosqueOutline, mosqueColor } from 'atsarul-mujahidin/icons/mosque.js';

console.log(categories);
console.log(mosque);     // URL string to fill variant
console.log(mosqueOutline);
console.log(mosqueColor);
```

### Aliases

Several canonical icons have aliases for convenience:

```ts
import { allah, quran, tasbih, qibla, muslim } from 'atsarul-mujahidin/icons/god.js';
// or any of the relevant category files
```

## Exports

| Path | Description |
| --- | --- |
| `atsarul-mujahidin` | `catalog`, `sources`, `metadata`, `categories`, `library` |
| `atsarul-mujahidin/metadata` | `metadata` (name, version, icon count, etc.) |
| `atsarul-mujahidin/categories` | `categories` array with id, name, count |
| `atsarul-mujahidin/icons/<category>` | Per-icon URL exports for `<category>` |
| `atsarul-mujahidin/icons/<category>.js` | Same as above (CJS-friendly) |
| `atsarul-mujahidin/sources/<slug>.json` | License & attribution metadata per external source |
| `atsarul-mujahidin/react/<variant>` | React components |
| `atsarul-mujahidin/vue/<variant>` | Vue components |
| `atsarul-mujahidin/svelte/<variant>` | Svelte components |
| `atsarul-mujahidin/angular/<variant>` | Angular components |
| `atsarul-mujahidin/astro/<variant>` | Astro components |
| `atsarul-mujahidin/vanilla` | Web Component |

## License

MIT © Islamic Icons Community | Vyagra Nexus™

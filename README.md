# Islamic Icons

A framework-agnostic Islamic SVG and WebP icon library for the modern web.

The collection is organized around semantic categories and ships with three style variants (fill, outline, color) per logical icon when the source artwork permits. Every icon is a local asset; no runtime fetch is required to render.

## Installation

```bash
bun add @rhein.sullivan/islamic-icons
npm install @rhein.sullivan/islamic-icons
pnpm add @rhein.sullivan/islamic-icons
yarn add @rhein.sullivan/islamic-icons
```

For Deno, use the npm compatibility specifier:

```bash
deno add npm:@rhein.sullivan/islamic-icons
```

## Usage

### React / JSX

```jsx
import { Mosque } from 'atsarul-mujahidin/react/fill';

export default function App() {
  return <Mosque colors="#10b981" size={32} />;
}
```

### Vue

```vue
<script setup>
import { Mosque } from 'atsarul-mujahidin/vue/fill';
</script>

<template>
  <Mosque colors="#10b981" :size="32" />
</template>
```

### Svelte / SvelteKit

```svelte
<script>
  import { Mosque } from 'atsarul-mujahidin/svelte/fill';
</script>

<Mosque colors="#10b981" size={32} />
```

### Astro

```astro
---
import { Mosque } from 'atsarul-mujahidin/astro/fill';
---
<Mosque colors="#10b981" size={32} />
```

### Vanilla JS (Web Component)

```html
<script type="module">
  import 'atsarul-mujahidin/vanilla';
</script>

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

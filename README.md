# Islamic Icons

A framework-agnostic Islamic SVG and WebP icon library for the modern web.

The collection is organized around semantic categories and ships with three style variants (fill, outline, color) per logical icon when the source artwork permits. Every icon is a local asset; no runtime fetch is required to render.

## Installation

```bash
bun add islamic-icons
npm install islamic-icons
pnpm add islamic-icons
yarn add islamic-icons
```

For Deno, use the npm compatibility specifier:

```bash
deno add npm:islamic-icons
```

## Usage

### Native HTML

```html
<img src="/assets/icons/mosque/mosque/fill.svg" alt="Mosque" width="24" height="24" />
```

### JavaScript / TypeScript

```ts
import { categories, catalog, metadata } from 'islamic-icons';
import { mosque, mosqueOutline, mosqueColor } from 'islamic-icons/icons/mosque.js';

console.log(categories);
console.log(mosque);     // URL string to fill variant
console.log(mosqueOutline);
console.log(mosqueColor);
```

### React / JSX

```jsx
import { mosque } from 'islamic-icons/icons/mosque.js';

export function MosqueIcon() {
	return <img src={mosque} alt="Mosque" width={24} height={24} />;
}
```

### Vue

```vue
<script setup lang="ts">
import { mosque } from 'islamic-icons/icons/mosque.js';
</script>

<template>
	<img :src="mosque" alt="Mosque" width="24" height="24" />
</template>
```

### Svelte / SvelteKit

```svelte
<script lang="ts">
	import { mosque } from 'islamic-icons/icons/mosque.js';
</script>

<img src={mosque} alt="Mosque" width="24" height="24" />
```

### Astro

```astro
---
import { mosque } from 'islamic-icons/icons/mosque.js';
---
<img src={mosque} alt="Mosque" width="24" height="24" />
```

### Aliases

Several canonical icons have aliases for convenience:

```ts
import { allah, quran, tasbih, qibla, muslim } from 'islamic-icons/icons/god.js';
// or any of the relevant category files
```

## Exports

| Path | Description |
| --- | --- |
| `islamic-icons` | `catalog`, `sources`, `metadata`, `categories`, `library` |
| `islamic-icons/metadata` | `metadata` (name, version, icon count, etc.) |
| `islamic-icons/categories` | `categories` array with id, name, count |
| `islamic-icons/icons/<category>` | Per-icon URL exports for `<category>` |
| `islamic-icons/icons/<category>.js` | Same as above (CJS-friendly) |
| `islamic-icons/sources/<slug>.json` | License & attribution metadata per external source |

## License

MIT © Islamic Icons Community | Vyagra Nexus™

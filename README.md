# Atsarul Mujahidin

A framework-agnostic Islamic SVG and WebP icon library for the modern web.

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

### Native HTML

```html
<img src="/assets/icons/mosque/mosque/fill.svg" alt="Mosque" width="24" height="24" />
```

### JavaScript / TypeScript

```ts
import { categories, catalog, metadata } from 'atsarul-mujahidin';
import { mosque, mosqueOutline, mosqueColor } from 'atsarul-mujahidin/icons/mosque.js';

console.log(categories);
console.log(mosque);     // URL string to fill variant
console.log(mosqueOutline);
console.log(mosqueColor);
```

### React / JSX

```jsx
import { mosque } from 'atsarul-mujahidin/icons/mosque.js';

export function MosqueIcon() {
	return <img src={mosque} alt="Mosque" width={24} height={24} />;
}
```

### Vue

```vue
<script setup lang="ts">
import { mosque } from 'atsarul-mujahidin/icons/mosque.js';
</script>

<template>
	<img :src="mosque" alt="Mosque" width="24" height="24" />
</template>
```

### Svelte / SvelteKit

```svelte
<script lang="ts">
	import { mosque } from 'atsarul-mujahidin/icons/mosque.js';
</script>

<img src={mosque} alt="Mosque" width="24" height="24" />
```

### Astro

```astro
---
import { mosque } from 'atsarul-mujahidin/icons/mosque.js';
---
<img src={mosque} alt="Mosque" width="24" height="24" />
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

## License

MIT © Atsarul Mujahidin Community

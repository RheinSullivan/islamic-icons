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

### React / JSX

```jsx
import { MosqueSimple } from 'atsarul-mujahidin/react/fill/MosqueSimple';
import { KaabaSimple } from 'atsarul-mujahidin/react/fill/KaabaSimple';
import { QuranBook } from 'atsarul-mujahidin/react/fill/QuranBook';

export function App() {
	return (
		<>
			<MosqueSimple width={24} height={24} />
			<KaabaSimple width={24} height={24} />
			<QuranBook width={24} height={24} />
		</>
	);
}
```

### Vue

```vue
<script setup lang="ts">
import MosqueSimple from 'atsarul-mujahidin/vue/fill/MosqueSimple.vue';
import KaabaSimple from 'atsarul-mujahidin/vue/fill/KaabaSimple.vue';
import QuranBook from 'atsarul-mujahidin/vue/fill/QuranBook.vue';
</script>

<template>
	<MosqueSimple :width="24" :height="24" />
	<KaabaSimple :width="24" :height="24" />
	<QuranBook :width="24" :height="24" />
</template>
```

### Svelte / SvelteKit

```svelte
<script lang="ts">
	import MosqueSimple from 'atsarul-mujahidin/svelte/fill/MosqueSimple.svelte';
	import KaabaSimple from 'atsarul-mujahidin/svelte/fill/KaabaSimple.svelte';
	import QuranBook from 'atsarul-mujahidin/svelte/fill/QuranBook.svelte';
</script>

<MosqueSimple width={24} height={24} />
<KaabaSimple width={24} height={24} />
<QuranBook width={24} height={24} />
```

### Vanilla JavaScript / Web Components

```html
<script type="module">
	import 'atsarul-mujahidin/vanilla/atsarul-mujahidin.js';
</script>

<atsarul-mujahidin-icon 
	icon="mosque-simple" 
	variant="fill" 
	width="24" 
	height="24">
</atsarul-mujahidin-icon>

<atsarul-mujahidin-icon 
	icon="kaaba-simple" 
	variant="fill" 
	width="24" 
	height="24">
</atsarul-mujahidin-icon>
```

### JavaScript / TypeScript (Direct SVG URL Import)

```ts
import { categories, catalog, metadata } from 'atsarul-mujahidin';
import { mosqueSimple, mosqueSimpleOutline } from 'atsarul-mujahidin/icons/mosque.js';

console.log(categories);
console.log(mosqueSimple);     // URL string to fill variant SVG
console.log(mosqueSimpleOutline);
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

<p align="center">
  <img src="atsarulmujahidin_benner.png" alt="Atsarul Mujahidin banner" width="100%" />
</p>

<h1 align="center">Atsarul Mujahidin | Islamic Icon Library</h1>

<p align="center">
  <strong>An open-source, framework-agnostic Islamic icon library for modern digital products.</strong>
</p>

<p align="center">
  <em>Authentic symbols. Consistent geometry. Built for the web.</em>
</p>

<p align="center">
  <a href="https://github.com/RheinSullivan/islamic-icons/stargazers">
    <img src="https://img.shields.io/github/stars/RheinSullivan/islamic-icons?style=flat&logo=github&label=stars&color=eab308&labelColor=555" alt="GitHub stars" />
  </a>
  <a href="https://github.com/RheinSullivan/islamic-icons/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/RheinSullivan/islamic-icons?style=flat&logo=github&label=contributors&color=9333ea&labelColor=555" alt="GitHub contributors" />
  </a>
  <a href="https://github.com/RheinSullivan/islamic-icons/commits/main">
    <img src="https://img.shields.io/github/commit-activity/m/RheinSullivan/islamic-icons?style=flat&logo=git&label=commit%20activity&color=F05032&labelColor=555" alt="Monthly commit activity" />
  </a>
  <a href="https://github.com/RheinSullivan/islamic-icons/commits/main">
    <img src="https://img.shields.io/github/last-commit/RheinSullivan/islamic-icons?style=flat&logo=github&label=last%20commit&color=28A745&labelColor=555" alt="Last commit" />
  </a>
  <a href="https://www.npmjs.com/package/atsarul-mujahidin">
    <img src="https://img.shields.io/npm/v/atsarul-mujahidin?style=flat&label=atsarul-mujahidin&color=C60005&labelColor=555" alt="atsarul-mujahidin npm version" />
  </a>
  <a href="https://www.npmjs.com/package/atsarul-mujahidin">
    <img src="https://img.shields.io/npm/dm/atsarul-mujahidin?style=flat&label=downloads%2Fmonth&color=009688&labelColor=555" alt="atsarul-mujahidin monthly downloads" />
  </a>
  <a href="https://github.com/RheinSullivan/islamic-icons/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/RheinSullivan/islamic-icons/ci.yml?style=flat&logo=github-actions&label=build&color=28A745&labelColor=555" alt="Build status" />
  </a>
  <a href="https://github.com/RheinSullivan/islamic-icons/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/RheinSullivan/islamic-icons?style=flat&label=license&color=7CB342&labelColor=555" alt="MIT License" />
  </a>
</p>

<p align="center">
  <a href="https://atsarulmujahidin.rheinsullivan.web.id/en/icons">Icons</a>
  ·
  <a href="https://atsarulmujahidin.rheinsullivan.web.id/en/docs">Guide</a>
  ·
  <a href="https://atsarulmujahidin.rheinsullivan.web.id/en/docs/frameworks">Frameworks</a>
  ·
  <a href="https://atsarulmujahidin.rheinsullivan.web.id/en/packages">Packages</a>
  ·
  <a href="https://atsarulmujahidin.rheinsullivan.web.id/en/license">License</a>
  ·
  <a href="https://atsarulmujahidin.rheinsullivan.web.id/en/showcase">Showcase</a>
</p>

---

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

### Vanilla JavaScript / TypeScript

```ts
import { categories, catalog, metadata } from 'atsarul-mujahidin';
import { mosque, mosqueOutline, mosqueColor } from 'atsarul-mujahidin/icons/mosque.js';

console.log(categories);
console.log(mosque);     // URL string to fill variant
console.log(mosqueOutline);
console.log(mosqueColor);
```

### Static HTML

```html
<img src="/assets/icons/mosque/mosque/fill.svg" alt="Mosque" width="24" height="24" />
```

### React.js

```jsx
import Mosque from 'atsarul-mujahidin/react/fill/Mosque';

export function App() {
	return <Mosque size={24} />;
}
```

### Next.js

```tsx
import Mosque from 'atsarul-mujahidin/react/fill/Mosque';

export default function Page() {
	return <Mosque size={24} />;
}
```

### Vue.js

```vue
<script setup lang="ts">
import Mosque from 'atsarul-mujahidin/vue/fill/Mosque.vue';
</script>

<template>
	<Mosque :size="24" />
</template>
```

### Nuxt.js

```vue
<script setup lang="ts">
import Mosque from 'atsarul-mujahidin/vue/fill/Mosque.vue';
</script>

<template>
	<Mosque :size="24" />
</template>
```

### Svelte / SvelteKit

```svelte
<script lang="ts">
	import Mosque from 'atsarul-mujahidin/svelte/fill/Mosque.svelte';
</script>

<Mosque size={24} />
```

### Rakta.js

```jsx
import Mosque from 'atsarul-mujahidin/react/fill/Mosque';

export function App() {
	return <Mosque size={24} />;
}
```

### Solid.js

```tsx
import { mosque } from 'atsarul-mujahidin/icons/mosque.js';

export function MosqueIcon() {
	return <img src={mosque} alt="Mosque" width={24} height={24} />;
}
```

### Angular

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { mosque } from 'atsarul-mujahidin/icons/mosque.js';

@Component({
	selector: 'app-root',
	template: `<img [src]="mosqueIcon" alt="Mosque" width="24" height="24" />`,
})
export class AppComponent {
	mosqueIcon = mosque;
}
```

### Preact

```jsx
import Mosque from 'atsarul-mujahidin/react/fill/Mosque';

export function App() {
	return <Mosque size={24} />;
}
```

### React Native

```tsx
import { Image } from 'react-native';
import { mosque } from 'atsarul-mujahidin/icons/mosque.js';

export function MosqueIcon() {
	return <Image source={{ uri: mosque }} style={{ width: 24, height: 24 }} />;
}
```
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

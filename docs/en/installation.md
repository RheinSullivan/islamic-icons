# Installation

## Package Manager

Islamic Icons is available on npm and can be installed with any package manager:

```bash
# Bun (recommended)
bun add @rhein.sullivan/islamic-icons

# npm
npm install @rhein.sullivan/islamic-icons

# yarn
yarn add @rhein.sullivan/islamic-icons

# pnpm
pnpm add @rhein.sullivan/islamic-icons

# deno
deno add npm:islamic-icons
```

## Framework-Specific Installation

### React / Remix

```bash
bun add @rhein.sullivan/islamic-icons
```

```jsx
import { Kaaba, Mosque, Quran } from 'islamic-icons/react';

function App() {
  return (
    <>
      <Kaaba size={48} variant="fill" color="#328460" />
      <Mosque size={48} variant="outline" />
      <Quran size={48} variant="color" />
    </>
  );
}
```

### Vue / Nuxt

```bash
bun add @rhein.sullivan/islamic-icons
```

```vue
<script setup>
import { Kaaba, Mosque, Quran } from 'islamic-icons/vue';
</script>

<template>
  <div>
    <Kaaba :size="48" variant="fill" color="#328460" />
    <Mosque :size="48" variant="outline" />
    <Quran :size="48" variant="color" />
  </div>
</template>
```

### Svelte / SvelteKit

```bash
bun add @rhein.sullivan/islamic-icons
```

```svelte
<script>
  import { Kaaba, Mosque, Quran } from 'islamic-icons/svelte';
</script>

<Kaaba size={48} variant="fill" color="#328460" />
<Mosque size={48} variant="outline" />
<Quran size={48} variant="color" />
```

### Angular

```bash
bun add @rhein.sullivan/islamic-icons
```

```typescript
import { Component } from '@angular/core';
import { KaabaIcon, MosqueIcon, QuranIcon } from 'islamic-icons/angular';

@Component({
  selector: 'app-root',
  imports: [KaabaIcon, MosqueIcon, QuranIcon],
  template: `
    <kaaba-icon [size]="48" variant="fill" color="#328460" />
    <mosque-icon [size]="48" variant="outline" />
    <quran-icon [size]="48" variant="color" />
  `
})
export class AppComponent {}
```

### Astro

```bash
bun add @rhein.sullivan/islamic-icons
```

```astro
---
import { Kaaba, Mosque, Quran } from 'islamic-icons/astro';
---

<Kaaba size={48} variant="fill" color="#328460" />
<Mosque size={48} variant="outline" />
<Quran size={48} variant="color" />
```

### Plain HTML

```bash
bun add @rhein.sullivan/islamic-icons
```

```html
<!-- Direct SVG import -->
<img src="node_modules/islamic-icons/assets/icons/quran/kaaba/fill.svg" alt="Kaaba" width="48" height="48" />
<img src="node_modules/islamic-icons/assets/icons/mosque/mosque/outline.svg" alt="Mosque" width="48" height="48" />
```

## CDN Usage

For prototyping or simple projects, you can use Islamic Icons via CDN:

```html
<!-- Placeholder - actual CDN link will be available after npm publish -->
<script type="module">
  import { Kaaba } from 'https://cdn.jsdelivr.net/npm/@rhein.sullivan/islamic-icons@latest/react';
</script>
```

## Verify Installation

After installation, verify it works:

```bash
# Check if package is installed
bun pm ls | grep islamic-icons

# Or with npm
npm list islamic-icons
```

Next: [Framework Guides](/docs/frameworks)

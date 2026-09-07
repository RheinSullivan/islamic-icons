# Frameworks

A practical reference for building with Atsarul Mujahidin while keeping the artwork local and the provenance visible.

## Overview

SVG is the compatibility layer. Framework adapters are convenience packages, not a requirement for using the collection. All frameworks share the same import pattern:

```
atsarul-mujahidin/{framework}/{iconname}-{variant}
```

Where:
- `{framework}`: `react`, `vue`, `svelte`, `angular`, `astro`
- `{iconname}`: lowercase icon name (e.g., `kaaba`, `mosque`, `quran`)
- `{variant}`: `fill`, `outline`, `color`

## Canonical component usage

```js
// Import per-icon:
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import { Kaaba as KaabaOutline } from 'atsarul-mujahidin/react/kaaba-outline';

<Kaaba className="" size="" style="" />
```

Use the same component-shaped API in framework documentation, then adapt the surrounding syntax to the framework compiler. For plain HTML, use the native custom-element form below.

## Native HTML (Web Component)

```html
<script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.0/vanilla/atsarul-mujahidin.js"></script>

<atsarul-mujahidin variant="kaaba" class="" size="" style="">Kaaba</atsarul-mujahidin>
```

## Framework Examples

### React / Remix

```jsx
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import { Mosque } from 'atsarul-mujahidin/react/mosque-outline';
import { Quran } from 'atsarul-mujahidin/react/quran-color';

export default function App() {
  return (
    <div>
      <Kaaba size={32} colors="#10b981" />
      <Mosque size={24} colors="#3b82f6" />
      <Quran size={48} />
    </div>
  );
}
```

**Package:** `atsarul-mujahidin/react/iconname-fill`

### Vue / Nuxt

```vue
<script setup>
import { Kaaba } from 'atsarul-mujahidin/vue/kaaba-fill';
import { Mosque } from 'atsarul-mujahidin/vue/mosque-outline';
import { Quran } from 'atsarul-mujahidin/vue/quran-color';
</script>

<template>
  <div>
    <Kaaba :size="32" colors="#10b981" />
    <Mosque :size="24" colors="#3b82f6" />
    <Quran :size="48" />
  </div>
</template>
```

**Package:** `atsarul-mujahidin/vue/iconname-fill`

### Svelte / SvelteKit

```svelte
<script>
  import { Kaaba } from 'atsarul-mujahidin/svelte/kaaba-fill';
  import { Mosque } from 'atsarul-mujahidin/svelte/mosque-outline';
  import { Quran } from 'atsarul-mujahidin/svelte/quran-color';
</script>

<Kaaba size={32} colors="#10b981" />
<Mosque size={24} colors="#3b82f6" />
<Quran size={48} />
```

**Package:** `atsarul-mujahidin/svelte/iconname-fill`

### Angular

```typescript
import { Component } from '@angular/core';
import { Kaaba } from 'atsarul-mujahidin/angular/kaaba-fill';
import { Mosque } from 'atsarul-mujahidin/angular/mosque-outline';

@Component({
  selector: 'app-root',
  template: `
    <kaaba [size]="32" colors="#10b981"></kaaba>
    <mosque [size]="24" colors="#3b82f6"></mosque>
  `,
  standalone: true,
  imports: [Kaaba, Mosque]
})
export class AppComponent {}
```

**Package:** `atsarul-mujahidin/angular/iconname-fill`

### Astro

```astro
---
import { Kaaba } from 'atsarul-mujahidin/astro/kaaba-fill';
import { Mosque } from 'atsarul-mujahidin/astro/mosque-outline';
import { Quran } from 'atsarul-mujahidin/astro/quran-color';
---
<Kaaba size={32} colors="#10b981" />
<Mosque size={24} colors="#3b82f6" />
<Quran size={48} />
```

**Package:** `atsarul-mujahidin/astro/iconname-fill`

### Plain HTML

**NO IMPORT** - Use CDN or local script:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.0/vanilla/atsarul-mujahidin.js"></script>
</head>
<body>
  <atsarul-mujahidin variant="kaaba" size="32" colors="#10b981">Kaaba</atsarul-mujahidin>
  <atsarul-mujahidin variant="mosque" size="24" colors="#3b82f6">Mosque</atsarul-mujahidin>
  <atsarul-mujahidin variant="quran" size="48">Quran</atsarul-mujahidin>
</body>
</html>
```

**Package:** CDN or local script

## Framework Summary

| Framework | Import Path | Component Usage |
| --- | --- | --- |
| React / Remix | `atsarul-mujahidin/react/iconname-fill` | `<Kaaba size={32} />` |
| Vue / Nuxt | `atsarul-mujahidin/vue/iconname-fill` | `<Kaaba :size="32" />` |
| Svelte / SvelteKit | `atsarul-mujahidin/svelte/iconname-fill` | `<Kaaba size={32} />` |
| Angular | `atsarul-mujahidin/angular/iconname-fill` | `<kaaba [size]="32"></kaaba>` |
| Astro | `atsarul-mujahidin/astro/iconname-fill` | `<Kaaba size={32} />` |
| Plain HTML | CDN or local script | `<atsarul-mujahidin variant="kaaba">` |

The same source asset can therefore be used in a design system, a static site, a SPA, or a server-rendered application.

## Next Steps

- [Variants](./VARIANTS.md) - Understand fill, outline, and color variants
- [Usage](./USAGE.md) - Learn component props and attributes
- [Sources](./SOURCES.md) - Source attribution and provenance

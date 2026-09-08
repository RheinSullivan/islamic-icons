# Usage

A practical reference for building with Atsarul Mujahidin while keeping the artwork local and the provenance visible.

## Framework / Library Component

Use the semantic category that contains the icon you need. Framework and library examples should use the component form with **className**, **size** and **style** props.

### Import Pattern

**React / Next.js**
```jsx
import MosqueSimple from 'atsarul-mujahidin/react/mosque-simple-fill';
import QuranBook from 'atsarul-mujahidin/react/quran-book-fill';

export function MyComponent() {
  return (
    <>
      <MosqueSimple size={32} />
      <QuranBook size={28} />
    </>
  );
}
```

**Vue / Nuxt**
```vue
<script setup>
import Crescent from 'atsarul-mujahidin/vue/crescent-fill';
import Kaaba from 'atsarul-mujahidin/vue/kaaba-fill';
</script>

<template>
  <div>
    <Crescent :size="32" />
    <Kaaba :size="48" />
  </div>
</template>
```

**Svelte / SvelteKit**
```svelte
<script>
  import WudhuAblution from 'atsarul-mujahidin/svelte/fill/WudhuAblution';
  import TasbihBeads from 'atsarul-mujahidin/svelte/outline/TasbihBeadsOutline';
</script>

<WudhuAblution size={32} />
<TasbihBeads size={36} />
```

**Icon Name Format:**
- Convert icon name to PascalCase (e.g., `wudhu-ablution` → `WudhuAblution`)
- Append variant: `-fill`, `-outline`, `-color`
- Framework prefix: `react/`, `vue/`, `svelte/fill/`, etc.
- Note: Svelte imports use the folder structure `svelte/fill/`, `svelte/outline/`, `svelte/color/`

For a React-style project, the same component can be imported from the relevant framework adapter and rendered directly in JSX.

## Native HTML (Web Component)

**NO IMPORT NEEDED** - Use CDN or local script:

### Via CDN (Recommended)

```html
<!-- Add this once in your HTML head or before closing body tag -->
<script type="module" src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.3/vanilla/atsarul-mujahidin.js"></script>

<!-- Then use anywhere in your HTML -->
<atsarul-mujahidin-icon name="mosque-simple" variant="fill" size="32"></atsarul-mujahidin-icon>
<atsarul-mujahidin-icon name="crescent" variant="fill" size="28"></atsarul-mujahidin-icon>
<atsarul-mujahidin-icon name="quran-book" variant="outline" size="24"></atsarul-mujahidin-icon>
<atsarul-mujahidin-icon name="kaaba" variant="fill" size="48"></atsarul-mujahidin-icon>
<atsarul-mujahidin-icon name="quran-book" variant="outline" size="24"></atsarul-mujahidin-icon>
```

### Via NPM Install

```html
<!-- After: npm install atsarul-mujahidin -->
<script type="module">
  import 'atsarul-mujahidin/vanilla/atsarul-mujahidin.js';
</script>

<!-- Then use the web component -->
<atsarul-mujahidin-icon name="wudhu-ablution" variant="fill" size="32"></atsarul-mujahidin-icon>
```

## Direct SVG Module Import

```javascript
import { mosque } from 'atsarul-mujahidin/fill/mosque.js';

// The imported value is the complete, sanitized raw SVG string:
document.getElementById('icon-container').innerHTML = mosque;
```

## Component Props

All framework components accept the following props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number \| string` | `24` | Width and height in pixels |
| `colors` | `string` | - | CSS color value (hex, rgb, named) |
| `className` | `string` | - | CSS class name(s) |
| `style` | `object` | - | Inline CSS styles |

**Web Component Attributes:**

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | required | Icon name (lowercase with hyphens, e.g., `wudhu-ablution`) |
| `variant` | `string` | `fill` | Icon variant: `fill`, `outline`, or `color` |
| `size` | `string` | `24` | Width and height in pixels |
| `color` | `string` | - | CSS color value (for fill/outline variants) |
| `class` | `string` | - | CSS class name(s) |
| `style` | `string` | - | Inline CSS styles |

## Import from Catalog

For advanced use cases, import the full catalog:

```ts
import { catalog, categories, metadata } from 'atsarul-mujahidin';

console.log(catalog);      // Array of all icon metadata
console.log(categories);   // Array of category definitions
console.log(metadata);     // Library metadata (name, version, count)
```

## Local Assets

All source assets remain local to the package; applications do not need a runtime request to the upstream icon API. This ensures:

- **Zero Network Dependency:** Icons load instantly without API calls
- **Offline Support:** Works without internet connection
- **Version Control:** Lock icon versions with package.json
- **Build-Time Optimization:** Bundle only icons you use

## Next Steps

- [Variants](./VARIANTS.md) - Understand fill, outline, and color variants
- [Frameworks](./FRAMEWORKS.md) - Framework-specific examples
- [Sources](./SOURCES.md) - Source attribution and provenance

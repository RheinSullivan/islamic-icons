# Usage

A practical reference for building with Atsarul Mujahidin while keeping the artwork local and the provenance visible.

## Framework / Library Component

Use the semantic category that contains the icon you need. Framework and library examples should use the component form with **className**, **size** and **style** props.

### Import Pattern

```js
// Import per-icon with variant suffix:
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import { Kaaba as KaabaOutline } from 'atsarul-mujahidin/react/kaaba-outline';
import { Kaaba as KaabaColor } from 'atsarul-mujahidin/react/kaaba-color';

// Use in JSX:
<Kaaba className="icon" size={32} style={{ color: '#10b981' }} />
<KaabaOutline size={24} />
<KaabaColor size={48} />
```

**Icon Name Format:**
- Convert icon name to PascalCase (e.g., `mosque-simple` → `MosqueSimple`)
- Append variant: `-fill`, `-outline`, `-color`
- Framework prefix: `react/`, `vue/`, `svelte/`, etc.

For a React-style project, the same component can be imported from the relevant framework adapter and rendered directly in JSX.

## Native HTML (Web Component)

**NO IMPORT NEEDED** - Use CDN or local script like Bootstrap Icons:

### Via CDN (Recommended)

```html
<!-- Add this once in your HTML head or before closing body tag -->
<script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.0/vanilla/atsarul-mujahidin.js"></script>

<!-- Then use anywhere in your HTML -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">Masjid</atsarul-mujahidin>
<atsarul-mujahidin variant="quran" colors="#3b82f6" size="24">Al-Quran</atsarul-mujahidin>
<atsarul-mujahidin variant="kaaba" colors="#ef4444" size="48">Kaaba</atsarul-mujahidin>
```

### Via NPM Install

```html
<!-- After: npm install atsarul-mujahidin -->
<!-- Add this script tag in your HTML -->
<script src="node_modules/atsarul-mujahidin/vanilla/atsarul-mujahidin.js"></script>

<!-- Then use the web component -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">Masjid</atsarul-mujahidin>
```

## Direct SVG Reference

Native HTML can also reference the local SVG directly when a custom element is not part of the application:

```html
<img src="/assets/icons/mosque/mosque/original.svg" alt="Mosque" />
<img src="node_modules/atsarul-mujahidin/fill/mosque.svg" alt="Mosque" width="24" height="24" />
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
| `variant` | `string` | required | Icon name (lowercase with hyphens) |
| `size` | `string` | `24` | Width and height in pixels |
| `colors` | `string` | - | CSS color value |
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

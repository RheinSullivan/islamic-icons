# Athar Architecture

## New Component-Based API

### Import Pattern
```js
// By variant path
import { mosque } from 'athar/fill/mosque';
import { mosque } from 'athar/outline/mosque';
import { mosque } from 'athar/color/mosque';
```

### Usage Pattern

#### Vanilla JS (Web Component)
```html
<athar variants="mosque" colors="#000" class="w-6 h-6">Masjid</athar>
```

#### React
```jsx
import { Mosque } from 'atsarul-mujahidin/react/fill';
<Mosque colors="#000" className="w-6 h-6" />
```

#### Vue
```vue
<script setup>
import { Mosque } from 'athar/vue/fill';
</script>
<template>
  <Mosque colors="#000" class="w-6 h-6" />
</template>
```

#### Svelte
```svelte
<script>
import Mosque from 'athar/svelte/fill/Mosque.svelte';
</script>
<Mosque colors="#000" class="w-6 h-6" />
```

## Directory Structure

```
library/
├── fill/              # Fill variant exports
│   ├── mosque.js      # { mosque: SVGString }
│   └── ...
├── outline/           # Outline variant exports
│   ├── mosque.js
│   └── ...
├── color/             # Color variant exports
│   ├── mosque.js
│   └── ...
├── react/             # React components
│   ├── fill/
│   │   ├── Mosque.jsx
│   │   └── index.js
│   ├── outline/
│   └── color/
├── vue/               # Vue components
│   ├── fill/
│   │   ├── Mosque.vue
│   │   └── index.js
│   ├── outline/
│   └── color/
├── svelte/            # Svelte components
│   ├── fill/
│   │   ├── Mosque.svelte
│   │   └── index.js
│   ├── outline/
│   └── color/
├── vanilla/           # Web Components
│   └── athar.js       # <athar> custom element
└── icons/             # Raw SVG files
    └── ...
```

## Package.json Exports

```json
{
  "exports": {
    "./fill/*": "./fill/*.js",
    "./outline/*": "./outline/*.js",
    "./color/*": "./color/*.js",
    "./react/fill": "./react/fill/index.js",
    "./react/outline": "./react/outline/index.js",
    "./react/color": "./react/color/index.js",
    "./vue/fill": "./vue/fill/index.js",
    "./vue/outline": "./vue/outline/index.js",
    "./vue/color": "./vue/color/index.js",
    "./svelte/fill": "./svelte/fill/index.js",
    "./svelte/outline": "./svelte/outline/index.js",
    "./svelte/color": "./svelte/color/index.js",
    "./vanilla": "./vanilla/athar.js"
  }
}
```

## Component Props

### All Frameworks
- `colors`: string | object - Custom colors for SVG paths
- `size`: number - Width/height in pixels
- `class`/`className`: string - CSS classes

### Vanilla Web Component
- `variants`: string - Icon name (e.g., "mosque")
- Content: Accessible label text

## Build Process

1. Read catalog.json
2. For each icon + variant:
   - Extract SVG content as string
   - Generate fill/outline/color/*.js exports
   - Generate React component with SVG inline
   - Generate Vue component with SVG inline
   - Generate Svelte component with SVG inline
3. Generate Web Component registration
4. Update package.json exports

# Framework Guides

Islamic Icons provides official packages for all major JavaScript frameworks with consistent APIs and TypeScript support.

## React / Remix

### Installation

```bash
bun add @rhein.sullivan/islamic-icons
```

### Basic Usage

```jsx
import { Kaaba, Mosque, Quran } from 'islamic-icons/react';

function App() {
  return (
    <div className="flex gap-4">
      <Kaaba size={48} variant="fill" />
      <Mosque size={48} variant="outline" color="#328460" />
      <Quran size={48} variant="color" />
    </div>
  );
}
```

### Props

```typescript
interface IconProps {
  size?: number | string;          // Default: 24
  variant?: 'fill' | 'outline' | 'color' | 'original';
  color?: string;                  // Only for fill/outline
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;            // Only for outline
  onClick?: () => void;
}
```

### With Remix

```jsx
// app/routes/_index.tsx
import { Kaaba } from 'islamic-icons/react';

export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <Kaaba size={48} variant="fill" />
    </div>
  );
}
```

## Vue / Nuxt

### Installation

```bash
bun add @rhein.sullivan/islamic-icons
```

### Basic Usage

```vue
<script setup>
import { Kaaba, Mosque, Quran } from 'islamic-icons/vue';
</script>

<template>
  <div class="flex gap-4">
    <Kaaba :size="48" variant="fill" />
    <Mosque :size="48" variant="outline" color="#328460" />
    <Quran :size="48" variant="color" />
  </div>
</template>
```

### Props

```typescript
interface IconProps {
  size?: number | string;
  variant?: 'fill' | 'outline' | 'color' | 'original';
  color?: string;
  class?: string;
  style?: Record<string, any>;
  strokeWidth?: number;
}
```

### With Nuxt

```vue
<!-- pages/index.vue -->
<script setup>
import { Kaaba } from 'islamic-icons/vue';
</script>

<template>
  <div>
    <h1>Welcome to Nuxt</h1>
    <Kaaba :size="48" variant="fill" />
  </div>
</template>
```

## Svelte / SvelteKit

### Installation

```bash
bun add @rhein.sullivan/islamic-icons
```

### Basic Usage

```svelte
<script>
  import { Kaaba, Mosque, Quran } from 'islamic-icons/svelte';
</script>

<div class="flex gap-4">
  <Kaaba size={48} variant="fill" />
  <Mosque size={48} variant="outline" color="#328460" />
  <Quran size={48} variant="color" />
</div>
```

### Props

```typescript
interface IconProps {
  size?: number | string;
  variant?: 'fill' | 'outline' | 'color' | 'original';
  color?: string;
  class?: string;
  style?: string;
  strokeWidth?: number;
}
```

### With SvelteKit

```svelte
<!-- src/routes/+page.svelte -->
<script>
  import { Kaaba } from 'islamic-icons/svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<Kaaba size={48} variant="fill" />
```

## Angular

### Installation

```bash
bun add @rhein.sullivan/islamic-icons
```

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { KaabaIcon, MosqueIcon, QuranIcon } from 'islamic-icons/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KaabaIcon, MosqueIcon, QuranIcon],
  template: `
    <div class="flex gap-4">
      <kaaba-icon [size]="48" variant="fill" />
      <mosque-icon [size]="48" variant="outline" color="#328460" />
      <quran-icon [size]="48" variant="color" />
    </div>
  `
})
export class AppComponent {}
```

### Props

```typescript
@Input() size?: number | string = 24;
@Input() variant?: 'fill' | 'outline' | 'color' | 'original' = 'fill';
@Input() color?: string;
@Input() class?: string;
@Input() strokeWidth?: number;
```

## Astro

### Installation

```bash
bun add @rhein.sullivan/islamic-icons
```

### Basic Usage

```astro
---
import { Kaaba, Mosque, Quran } from 'islamic-icons/astro';
---

<div class="flex gap-4">
  <Kaaba size={48} variant="fill" />
  <Mosque size={48} variant="outline" color="#328460" />
  <Quran size={48} variant="color" />
</div>
```

### Props

```typescript
interface Props {
  size?: number | string;
  variant?: 'fill' | 'outline' | 'color' | 'original';
  color?: string;
  class?: string;
  style?: string;
  strokeWidth?: number;
}
```

## Plain HTML

### Direct SVG Import

```html
<!DOCTYPE html>
<html>
<head>
  <title>Islamic Icons</title>
</head>
<body>
  <!-- Direct file reference -->
  <img 
    src="node_modules/islamic-icons/assets/icons/quran/kaaba/fill.svg" 
    alt="Kaaba" 
    width="48" 
    height="48"
  />
  
  <!-- Or with a bundler -->
  <img 
    src="@/node_modules/islamic-icons/assets/icons/mosque/mosque/outline.svg" 
    alt="Mosque"
    width="48"
    height="48"
  />
</body>
</html>
```

### With Module Script

```html
<script type="module">
  import { Kaaba } from 'islamic-icons/react';
  // Note: Requires build setup with bundler
</script>
```

## Common Patterns

### Dynamic Icon Selection

```jsx
// React
import * as IslamicIcons from 'islamic-icons/react';

function DynamicIcon({ name, ...props }) {
  const Icon = IslamicIcons[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}

// Usage
<DynamicIcon name="Kaaba" size={48} variant="fill" />
```

### Icon Grid

```jsx
import { Kaaba, Mosque, Quran, PrayerMan, Lantern } from 'islamic-icons/react';

const icons = [
  { Icon: Kaaba, label: 'Kaaba' },
  { Icon: Mosque, label: 'Mosque' },
  { Icon: Quran, label: 'Quran' },
  { Icon: PrayerMan, label: 'Prayer' },
  { Icon: Lantern, label: 'Ramadan' }
];

function IconGrid() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {icons.map(({ Icon, label }) => (
        <div key={label} className="flex flex-col items-center">
          <Icon size={48} variant="fill" />
          <span className="text-sm mt-2">{label}</span>
        </div>
      ))}
    </div>
  );
}
```

### Themed Icons

```jsx
import { Kaaba } from 'islamic-icons/react';

function ThemedIcon() {
  const isDark = useTheme();
  
  return (
    <Kaaba 
      size={48} 
      variant="outline"
      color={isDark ? '#73e0ae' : '#328460'}
    />
  );
}
```

Next: [Usage & Styling](/docs/usage)

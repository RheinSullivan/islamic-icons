# Integrasi Framework

Panduan integrasi resmi Atsarul Mujahidin untuk berbagai framework modern.

## Gambaran Umum

SVG adalah fondasi kompatibilitas kami. Adapter framework dirancang untuk kenyamanan tanpa ketergantungan runtime yang berat. Semua framework memiliki format impor yang konsisten:

```
atsarul-mujahidin/{framework}/{namaikon}-{varian}
```

Format komponen:
- `{framework}`: `react`, `vue`, `svelte`, `angular`, `astro`
- `{namaikon}`: nama ikon huruf kecil (contoh: `kaaba`, `mosque`, `quran`)
- `{varian}`: `fill`, `outline`, `color`

## Contoh Penggunaan Framework

### React / Next.js / Remix

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

### Vue 3 / Nuxt

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

### Svelte / SvelteKit (Svelte 5 Runes Ready)

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

### Web Component / HTML Biasa

```html
<script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/vanilla/atsarul-mujahidin.js"></script>

<atsarul-mujahidin variant="kaaba" size="32" colors="#10b981">Ka'bah</atsarul-mujahidin>
```

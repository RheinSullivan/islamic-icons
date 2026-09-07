# インストールと利用ガイド (Installation & Frameworks)

Atsarul Mujahidin をプロジェクトへ導入するための公式ガイドです。

## インストール

```bash
# Bun を使用する場合（推奨）
bun add atsarul-mujahidin

# npm を使用する場合
npm install atsarul-mujahidin

# pnpm を使用する場合
pnpm add atsarul-mujahidin

# yarn を使用する場合
yarn add atsarul-mujahidin
```

## フレームワーク別の使用例

### React / Next.js
```jsx
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import { Mosque } from 'atsarul-mujahidin/react/mosque-outline';

export default function App() {
  return (
    <div>
      <Kaaba size={32} colors="#10b981" />
      <Mosque size={24} />
    </div>
  );
}
```

### Vue 3 / Nuxt
```vue
<script setup>
import { Kaaba } from 'atsarul-mujahidin/vue/kaaba-fill';
</script>

<template>
  <Kaaba :size="32" colors="#10b981" />
</template>
```

### Svelte / SvelteKit (Svelte 5 Runes)
```svelte
<script>
  import { Kaaba } from 'atsarul-mujahidin/svelte/kaaba-fill';
</script>

<Kaaba size={32} colors="#10b981" />
```

### Web コンポーネント (CDN / HTML)
```html
<script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/vanilla/atsarul-mujahidin.js"></script>

<atsarul-mujahidin variant="kaaba" size="32" colors="#10b981">Kaaba</atsarul-mujahidin>
```

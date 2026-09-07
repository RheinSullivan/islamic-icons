# التثبيت والاستخدام (Installation & Frameworks)

دليل تثبيت مكتبة آثار المجاهدين واستخدامها في مشاريعك البرمجية.

## التثبيت عبر مديري الحزم

```bash
# باستخدام Bun (موصى به)
bun add atsarul-mujahidin

# باستخدام npm
npm install atsarul-mujahidin

# باستخدام pnpm
pnpm add atsarul-mujahidin

# باستخدام yarn
yarn add atsarul-mujahidin
```

## استخدام المكونات في إطارات العمل

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

### عنصر الويب المستقل (HTML / CDN)
```html
<script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/vanilla/atsarul-mujahidin.js"></script>

<atsarul-mujahidin variant="kaaba" size="32" colors="#10b981">الكعبة</atsarul-mujahidin>
```

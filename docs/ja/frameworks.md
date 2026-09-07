# フレームワーク例

最新のフレームワークとプラットフォームでAtsarul Mujahidinを使用するための包括的なガイド。

## ReactとNext.js

### 基本インストール

```bash
npm install atsarul-mujahidin
```

### 使用例

```jsx
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import { Mosque } from 'atsarul-mujahidin/react/mosque-outline';
import { Quran } from 'atsarul-mujahidin/react/quran-color';

export default function IslamicApp() {
  return (
    <div className="container">
      <header>
        <Kaaba size={48} colors="#10b981" />
        <h1>私のイスラムアプリ</h1>
      </header>
      
      <nav>
        <Mosque size={24} colors="#3b82f6" />
        <Quran size={24} colors="#ef4444" />
      </nav>
    </div>
  );
}
```

### TypeScriptと共に

```tsx
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import type { FC } from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

const IslamicIcon: FC<IconProps> = ({ size = 24, color = '#000' }) => {
  return <Kaaba size={size} colors={color} />;
};
```

## Vue 3とNuxt

### Vue 3で

```vue
<script setup lang="ts">
import { Kaaba } from 'atsarul-mujahidin/vue/kaaba-fill';
import { Mosque } from 'atsarul-mujahidin/vue/mosque-outline';
import { ref } from 'vue';

const iconSize = ref(32);
const iconColor = ref('#10b981');
</script>

<template>
  <div class="app">
    <Kaaba :size="iconSize" :colors="iconColor" />
    <Mosque :size="24" colors="#3b82f6" />
  </div>
</template>
```

### Nuxt 3で

```vue
<script setup>
import { Kaaba } from 'atsarul-mujahidin/vue/kaaba-fill';
</script>

<template>
  <div>
    <Kaaba :size="48" colors="#10b981" />
  </div>
</template>
```

## SvelteとSvelteKit

### Svelte 5（Runes使用）

```svelte
<script>
  import { Kaaba } from 'atsarul-mujahidin/svelte/kaaba-fill';
  import { Mosque } from 'atsarul-mujahidin/svelte/mosque-outline';
  
  let iconSize = $state(32);
  let iconColor = $state('#10b981');
</script>

<div>
  <Kaaba size={iconSize} colors={iconColor} />
  <Mosque size={24} colors="#3b82f6" />
</div>
```

### SvelteKit

```svelte
<script lang="ts">
  import { Kaaba } from 'atsarul-mujahidin/svelte/kaaba-fill';
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<Kaaba size={48} colors="#10b981" />
```

## Angular

### スタンドアロンインポート

```typescript
import { Component } from '@angular/core';
import { KaabaFill } from 'atsarul-mujahidin/angular/kaaba-fill';
import { MosqueOutline } from 'atsarul-mujahidin/angular/mosque-outline';

@Component({
  selector: 'app-islamic',
  standalone: true,
  imports: [KaabaFill, MosqueOutline],
  template: `
    <div class="container">
      <kaaba-fill [size]="48" colors="#10b981"></kaaba-fill>
      <mosque-outline [size]="24" colors="#3b82f6"></mosque-outline>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  `]
})
export class IslamicComponent {}
```

### NgModuleと共に

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KaabaFill } from 'atsarul-mujahidin/angular/kaaba-fill';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, KaabaFill],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Astro

### Astroページで

```astro
---
import { Kaaba } from 'atsarul-mujahidin/astro/kaaba-fill';
import { Mosque } from 'atsarul-mujahidin/astro/mosque-outline';
---

<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>イスラムアプリ</title>
  </head>
  <body>
    <header>
      <Kaaba size={48} colors="#10b981" />
      <h1>ようこそ</h1>
    </header>
    <main>
      <Mosque size={32} colors="#3b82f6" />
    </main>
  </body>
</html>
```

## プレーンHTML（Vanilla JS）

### CDN使用

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atsarul Mujahidin - 例</title>
  <script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/vanilla/atsarul-mujahidin.js"></script>
</head>
<body>
  <div class="container">
    <atsarul-mujahidin variant="kaaba" size="48" colors="#10b981">カアバ神殿</atsarul-mujahidin>
    <atsarul-mujahidin variant="mosque" size="32" colors="#3b82f6">モスク</atsarul-mujahidin>
    <atsarul-mujahidin variant="quran" size="24" colors="#ef4444">コーラン</atsarul-mujahidin>
  </div>
</body>
</html>
```

### JavaScriptと共に

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>動的例</title>
  <script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/vanilla/atsarul-mujahidin.js"></script>
</head>
<body>
  <div id="icon-container"></div>
  
  <script>
    // アイコンを動的に作成
    const container = document.getElementById('icon-container');
    
    const icons = [
      { variant: 'kaaba', size: 48, colors: '#10b981', label: 'カアバ神殿' },
      { variant: 'mosque', size: 32, colors: '#3b82f6', label: 'モスク' },
      { variant: 'quran', size: 24, colors: '#ef4444', label: 'コーラン' }
    ];
    
    icons.forEach(icon => {
      const element = document.createElement('atsarul-mujahidin');
      element.setAttribute('variant', icon.variant);
      element.setAttribute('size', icon.size);
      element.setAttribute('colors', icon.colors);
      element.textContent = icon.label;
      container.appendChild(element);
    });
  </script>
</body>
</html>
```

## 一般的なヒント

### レスポンシブデザイン

```jsx
// React例
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';

function ResponsiveIcon() {
  return (
    <Kaaba 
      size={window.innerWidth < 768 ? 24 : 48}
      colors="#10b981"
    />
  );
}
```

### ダークテーマ

```jsx
// Tailwind CSSと共に
import { Mosque } from 'atsarul-mujahidin/react/mosque-fill';

function ThemedIcon() {
  return (
    <Mosque 
      size={32}
      className="text-gray-900 dark:text-gray-100"
    />
  );
}
```

### アニメーション

```jsx
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';

function AnimatedIcon() {
  return (
    <Kaaba 
      size={48}
      colors="#10b981"
      style={{
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    />
  );
}
```

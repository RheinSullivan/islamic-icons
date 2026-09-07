# 使用方法

アセットをローカルに保ち、出所を透明に保ちながらAtsarul Mujahidinで構築するための実用的なリファレンス。

## フレームワーク/ライブラリコンポーネント

必要なアイコンを含むセマンティックカテゴリを使用します。フレームワークコンポーネントは**className**、**size**、**style**などの標準プロップをサポートします。

### インポートパターン

```javascript
// バリアント接尾辞付きのアイコンごとのインポート:
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import { Kaaba as KaabaOutline } from 'atsarul-mujahidin/react/kaaba-outline';
import { Kaaba as KaabaColor } from 'atsarul-mujahidin/react/kaaba-color';

// JSXでの使用:
<Kaaba className="icon" size={32} style={{ color: '#10b981' }} />
<KaabaOutline size={24} />
<KaabaColor size={48} />
```

**アイコン名形式:**
- アイコン名をPascalCaseに変換（例: `mosque-simple` → `MosqueSimple`）
- バリアントを追加: `-fill`、`-outline`、`-color`
- フレームワークプレフィックス: `react/`、`vue/`、`svelte/`など

## プレーンHTML（Webコンポーネント）

**ビルドツール不要** - Bootstrap IconsのようにCDNまたはローカルスクリプトを使用:

### CDN経由（推奨）

```html
<!-- このスクリプトをHTMLヘッダーまたはbodyタグの閉じる前に一度追加 -->
<script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/vanilla/atsarul-mujahidin.js"></script>

<!-- その後、HTMLのどこでも使用可能 -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">モスク</atsarul-mujahidin>
<atsarul-mujahidin variant="quran" colors="#3b82f6" size="24">コーラン</atsarul-mujahidin>
<atsarul-mujahidin variant="kaaba" colors="#ef4444" size="48">カアバ神殿</atsarul-mujahidin>
```

### NPMインストール経由

```html
<!-- 実行後: npm install atsarul-mujahidin -->
<script src="node_modules/atsarul-mujahidin/vanilla/atsarul-mujahidin.js"></script>

<!-- Webコンポーネントを使用 -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">モスク</atsarul-mujahidin>
```

## SVGモジュールの直接インポート

```javascript
import { mosque } from 'atsarul-mujahidin/fill/mosque.js';

// インポートされた値はクリーンで使用可能な生のSVG文字列です:
document.getElementById('icon-container').innerHTML = mosque;
```

## コンポーネントプロップ

すべてのフレームワークコンポーネントは以下のプロップを受け入れます:

| プロップ | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `size` | `number \| string` | `24` | ピクセル単位の幅と高さ |
| `colors` | `string` | - | CSS色値（hex、rgb、色名） |
| `className` | `string` | - | CSSクラス名 |
| `style` | `object` | - | インラインCSSスタイル |

**Webコンポーネント属性:**

| 属性 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `variant` | `string` | 必須 | アイコン名（小文字でハイフン付き） |
| `size` | `string` | `24` | ピクセル単位の幅と高さ |
| `colors` | `string` | - | CSS色値 |
| `class` | `string` | - | CSSクラス名 |
| `style` | `string` | - | インラインCSSスタイル |

## カタログからのインポート

高度な使用のために、完全なカタログをインポート:

```typescript
import { catalog, categories, metadata } from 'atsarul-mujahidin';

console.log(catalog);      // すべてのアイコンメタデータの配列
console.log(categories);   // カテゴリ定義の配列
console.log(metadata);     // ライブラリメタデータ（名前、バージョン、カウント）
```

## フレームワーク例

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

### Angular

```typescript
import { Component } from '@angular/core';
import { KaabaFill } from 'atsarul-mujahidin/angular/kaaba-fill';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KaabaFill],
  template: '<kaaba-fill [size]="32" colors="#10b981"></kaaba-fill>'
})
export class AppComponent {}
```

### Astro

```astro
---
import { Kaaba } from 'atsarul-mujahidin/astro/kaaba-fill';
---

<Kaaba size={32} colors="#10b981" />
```

## カスタマイズとスタイリング

CSSを使用してアイコンをカスタマイズできます:

```css
.my-icon {
  width: 48px;
  height: 48px;
  color: #10b981;
  transition: color 0.3s ease;
}

.my-icon:hover {
  color: #059669;
}
```

またはインラインプロップを使用:

```jsx
<Kaaba 
  size={48} 
  colors="#10b981"
  style={{ 
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  }}
/>
```

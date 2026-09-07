# الاستخدام

دليل عملي للبناء باستخدام آثار المجاهدين مع الحفاظ على الأصول محلية والمصدر شفافًا.

## مكونات إطار العمل / المكتبة

استخدم الفئات الدلالية التي تحتوي على الأيقونة التي تحتاجها. تدعم مكونات إطار العمل الخصائص القياسية مثل **className** و **size** و **style**.

### نمط الاستيراد

```javascript
// استيراد لكل أيقونة مع لاحقة الشكل:
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import { Kaaba as KaabaOutline } from 'atsarul-mujahidin/react/kaaba-outline';
import { Kaaba as KaabaColor } from 'atsarul-mujahidin/react/kaaba-color';

// استخدام في JSX:
<Kaaba className="icon" size={32} style={{ color: '#10b981' }} />
<KaabaOutline size={24} />
<KaabaColor size={48} />
```

**تنسيق اسم الأيقونة:**
- حوّل اسم الأيقونة إلى PascalCase (مثال: `mosque-simple` → `MosqueSimple`)
- أضف الشكل: `-fill` أو `-outline` أو `-color`
- بادئة إطار العمل: `react/` أو `vue/` أو `svelte/` وهكذا

## HTML عادي (Web Component)

**لا حاجة لأدوات البناء** - استخدم CDN أو البرنامج النصي المحلي مثل Bootstrap Icons:

### عبر CDN (موصى به)

```html
<!-- أضف هذا البرنامج النصي مرة واحدة في رأس HTML أو قبل إغلاق وسم body -->
<script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/vanilla/atsarul-mujahidin.js"></script>

<!-- ثم استخدمه في أي مكان في HTML الخاص بك -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">مسجد</atsarul-mujahidin>
<atsarul-mujahidin variant="quran" colors="#3b82f6" size="24">القرآن الكريم</atsarul-mujahidin>
<atsarul-mujahidin variant="kaaba" colors="#ef4444" size="48">الكعبة المشرفة</atsarul-mujahidin>
```

### عبر تثبيت NPM

```html
<!-- بعد: npm install atsarul-mujahidin -->
<script src="node_modules/atsarul-mujahidin/vanilla/atsarul-mujahidin.js"></script>

<!-- استخدم مكون الويب -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">مسجد</atsarul-mujahidin>
```

## استيراد وحدة SVG مباشرة

```javascript
import { mosque } from 'atsarul-mujahidin/fill/mosque.js';

// القيمة المستوردة هي سلسلة SVG خام نظيفة وجاهزة للاستخدام:
document.getElementById('icon-container').innerHTML = mosque;
```

## خصائص المكون

تقبل جميع مكونات إطار العمل الخصائص التالية:

| الخاصية | النوع | الافتراضي | الوصف |
| --- | --- | --- | --- |
| `size` | `number \| string` | `24` | العرض والارتفاع بالبكسل |
| `colors` | `string` | - | قيمة لون CSS (hex, rgb, اسم اللون) |
| `className` | `string` | - | اسم فئة CSS |
| `style` | `object` | - | نمط CSS مضمّن |

**سمات مكون الويب:**

| السمة | النوع | الافتراضي | الوصف |
| --- | --- | --- | --- |
| `variant` | `string` | مطلوب | اسم الأيقونة (أحرف صغيرة مع شرطات) |
| `size` | `string` | `24` | العرض والارتفاع بالبكسل |
| `colors` | `string` | - | قيمة لون CSS |
| `class` | `string` | - | اسم فئة CSS |
| `style` | `string` | - | نمط CSS مضمّن |

## الاستيراد من الكتالوج

للاستخدام المتقدم، استورد الكتالوج الكامل:

```typescript
import { catalog, categories, metadata } from 'atsarul-mujahidin';

console.log(catalog);      // مصفوفة جميع البيانات الوصفية للأيقونات
console.log(categories);   // مصفوفة تعريفات الفئات
console.log(metadata);     // البيانات الوصفية للمكتبة (الاسم، الإصدار، العدد)
```

## أمثلة إطار العمل

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

## التخصيص والتصميم

يمكنك تخصيص الأيقونات باستخدام CSS:

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

أو استخدام الخصائص المضمنة:

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

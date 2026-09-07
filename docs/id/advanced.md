# Topik Tingkat Lanjut

Panduan arsitektur, integrasi TypeScript, dan pola pengembangan tingkat lanjut dengan Atsarul Mujahidin.

## Dukungan TypeScript Penuh

Atsarul Mujahidin menyertakan deklarasi tipe TypeScript lengkap untuk setiap ekspor:

```typescript
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import type { CatalogItem, CategoryEntry, LibraryMetadata } from 'atsarul-mujahidin';
import { catalog, categories, metadata } from 'atsarul-mujahidin';

// Penggunaan tipe data katalog
const itemMasjid: CatalogItem | undefined = catalog.find(
  (catalogItem: CatalogItem) => catalogItem.name === 'mosque-simple'
);
```

## Ekspor Modul Universal

Library ini mendukung arsitektur multi-ekspor melalui ESM:

1. **Komponen Framework Mandiri**:
   - `atsarul-mujahidin/react/kaaba-fill`
   - `atsarul-mujahidin/vue/mosque-outline`
   - `atsarul-mujahidin/svelte/quran-color`
2. **Metadata & Katalog**:
   - `atsarul-mujahidin`
   - `atsarul-mujahidin/metadata`
   - `atsarul-mujahidin/categories`
3. **Penyedia REST API & CDN**:
   - `atsarul-mujahidin/api`
   - Berkas JSON katalog dan skrip server siap pakai.

## Optimasi Tree-Shaking

Semua ekspor dikonfigurasi dengan `"sideEffects": false` pada `package.json`, memastikan bundler seperti Vite, Webpack, Rollup, atau esbuild hanya menyertakan ikon yang benar-benar digunakan dalam aplikasi Anda.

# Penggunaan

Referensi praktis untuk membangun dengan Atsarul Mujahidin dengan menjaga aset tetap lokal dan riwayat asal-usul (provenance) tetap transparan.

## Komponen Framework / Library

Gunakan kategori semantik yang berisi ikon yang Anda butuhkan. Komponen framework mendukung props standar seperti **className**, **size**, dan **style**.

### Pola Impor

```javascript
// Impor per-ikon dengan akhiran varian:
import { Kaaba } from 'atsarul-mujahidin/react/kaaba-fill';
import { Kaaba as KaabaOutline } from 'atsarul-mujahidin/react/kaaba-outline';
import { Kaaba as KaabaColor } from 'atsarul-mujahidin/react/kaaba-color';

// Gunakan dalam JSX:
<Kaaba className="icon" size={32} style={{ color: '#10b981' }} />
<KaabaOutline size={24} />
<KaabaColor size={48} />
```

**Format Nama Ikon:**
- Ubah nama ikon menjadi PascalCase (contoh: `mosque-simple` → `MosqueSimple`)
- Tambahkan varian: `-fill`, `-outline`, `-color`
- Awalan framework: `react/`, `vue/`, `svelte/`, dan seterusnya.

## HTML Biasa (Web Component)

**TIDAK PERLU BUILD TOOL** - Gunakan CDN atau skrip lokal seperti Bootstrap Icons:

### Melalui CDN (Direkomendasikan)

```html
<!-- Tambahkan skrip ini sekali di head HTML atau sebelum penutup tag body -->
<script src="https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/vanilla/atsarul-mujahidin.js"></script>

<!-- Lalu gunakan di mana saja dalam HTML Anda -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">Masjid</atsarul-mujahidin>
<atsarul-mujahidin variant="quran" colors="#3b82f6" size="24">Al-Quran</atsarul-mujahidin>
<atsarul-mujahidin variant="kaaba" colors="#ef4444" size="48">Ka'bah</atsarul-mujahidin>
```

### Melalui Instalasi NPM

```html
<!-- Setelah: npm install atsarul-mujahidin -->
<script src="node_modules/atsarul-mujahidin/vanilla/atsarul-mujahidin.js"></script>

<!-- Gunakan web component -->
<atsarul-mujahidin variant="mosque" colors="#10b981" size="32">Masjid</atsarul-mujahidin>
```

## Impor Langsung Modul SVG

```javascript
import { mosque } from 'atsarul-mujahidin/fill/mosque.js';

// Nilai yang diimpor adalah string SVG mentah yang bersih dan siap pakai:
document.getElementById('icon-container').innerHTML = mosque;
```

## Props Komponen

Semua komponen framework menerima props berikut:

| Prop | Tipe | Default | Deskripsi |
| --- | --- | --- | --- |
| `size` | `number \| string` | `24` | Lebar dan tinggi dalam piksel |
| `colors` | `string` | - | Nilai warna CSS (hex, rgb, nama warna) |
| `className` | `string` | - | Nama kelas CSS |
| `style` | `object` | - | Style CSS inline |

**Atribut Web Component:**

| Atribut | Tipe | Default | Deskripsi |
| --- | --- | --- | --- |
| `variant` | `string` | wajib | Nama ikon (huruf kecil dengan tanda hubung) |
| `size` | `string` | `24` | Lebar dan tinggi dalam piksel |
| `colors` | `string` | - | Nilai warna CSS |
| `class` | `string` | - | Nama kelas CSS |
| `style` | `string` | - | Style CSS inline |

## Impor dari Katalog

Untuk penggunaan tingkat lanjut, impor katalog lengkap:

```typescript
import { catalog, categories, metadata } from 'atsarul-mujahidin';

console.log(catalog);      // Array seluruh metadata ikon
console.log(categories);   // Array definisi kategori
console.log(metadata);     // Metadata library (nama, versi, jumlah)
```

# Styling & Kustomisasi Tampilan

Panduan menyesuaikan ukuran, warna, animasi, dan estetika visual untuk Atsarul Mujahidin.

## Pewarnaan

### Warna Tunggal (Fill & Outline)

Untuk varian `fill` dan `outline`, ikon mewarisi warna teks CSS saat ini (`currentColor`) atau dapat diatur secara langsung:

```jsx
// React
<Kaaba size={48} colors="#10b981" />

// Vue
<Kaaba :size="48" colors="#10b981" />

// Svelte
<Kaaba size={48} colors="#10b981" />
```

### Menggunakan Variabel CSS

```css
:root {
  --islamic-green: #10b981;
  --islamic-gold: #d7b66b;
}

.ikon-khusus {
  color: var(--islamic-green);
}
```

## Pengaturan Ukuran

### Ukuran Tetap (Piksel)

```jsx
<Kaaba size={24} />  {/* 24px */}
<Mosque size={48} /> {/* 48px */}
<Quran size={64} />  {/* 64px */}
```

### Ukuran Responsif / Tailwind CSS

```jsx
<Kaaba className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
```

## Varian Tampilan

1. **Fill (Padat)**: Siluet tegas dan kokoh, sangat cocok untuk tombol aksi utama dan navigasi.
2. **Outline (Garis)**: Tanda berorientasi garis yang elegan dan minimalis.
3. **Color (Warna)**: Karya seni multi-nada yang mempertahankan palet warna asli.

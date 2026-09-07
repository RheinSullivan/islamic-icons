# Instalasi

Referensi praktis untuk membangun dengan Atsarul Mujahidin sambil menjaga karya seni tetap lokal dan provenance tetap terlihat.

## Instal

Instal library dengan package manager yang digunakan proyek Anda. Paket ini mengekspos entry point kategori semantik dan menjaga karya seni sebagai aset SVG/WebP lokal.

```bash
bun add atsarul-mujahidin
npm install atsarul-mujahidin
pnpm add atsarul-mujahidin
yarn add atsarul-mujahidin
```

### Dukungan Deno

Untuk Deno, gunakan specifier kompatibilitas npm:

```bash
deno add npm:atsarul-mujahidin
```

## Jalankan Web Docs Secara Lokal

Jika Anda ingin berkontribusi atau menjelajahi katalog ikon secara lokal:

```bash
git clone <repository>
cd atsarul-mujahidin
bun install
bun run docs
```

Untuk kontributor, gunakan Bun untuk pipeline build repository. Paket yang diterbitkan dapat diinstal dengan Bun, npm, pnpm, atau Yarn.

## Build Library

Untuk membangun ulang library dari sumber (untuk kontributor):

```bash
bun run icons:catalog    # Buat katalog dari aset
bun run icons:package    # Paketkan untuk distribusi
bun run icons:validate   # Validasi metadata dan lisensi
bun run build            # Build semua artefak
```

## Struktur Paket

Setelah instalasi, paket menyediakan:

```
node_modules/atsarul-mujahidin/
├── react/           # Komponen React
├── vue/             # Komponen Vue
├── svelte/          # Komponen Svelte
├── angular/         # Komponen Angular
├── astro/           # Komponen Astro
├── vanilla/         # Web Component
├── fill/            # SVG varian fill
├── outline/         # SVG varian outline
├── color/           # SVG/WebP varian color
├── sources/         # Metadata atribusi
├── icons/           # Ekspor per-kategori
├── catalog.js       # Katalog ikon lengkap
├── categories.js    # Definisi kategori
├── metadata.js      # Metadata library
└── package.json
```

## Langkah Selanjutnya

- [Penggunaan](./USAGE.md) - Pelajari cara menggunakan ikon di framework Anda
- [Framework](./FRAMEWORKS.md) - Contoh spesifik framework
- [Varian](./VARIANTS.md) - Pahami varian fill, outline, dan color

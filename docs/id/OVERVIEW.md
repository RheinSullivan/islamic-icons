# Gambaran Umum

Semua yang Anda butuhkan untuk menjelajahi, menginstal, menggunakan, menelusuri sumber, dan berkontribusi pada Atsarul Mujahidin.

## Pengenalan

Atsarul Mujahidin adalah koleksi karya seni SVG dan WebP Islam yang framework-agnostic. **Atsarul Mujahidin** (آثَارُ المُجَاهِدِيْنَ) berarti **Jejak Para Mujahidin** dalam bahasa Arab - merepresentasikan sesuatu yang Anda ciptakan dan tinggalkan untuk para pejuang. Nama ini mencerminkan filosofi membangun karya bermakna yang memiliki dampak abadi bagi mereka yang berjuang.

## Filosofi & Tujuan

Library ini diciptakan dengan misi khusus: menyediakan ikonografi Islam berkualitas tinggi sambil mendukung kemanusiaan. Setiap ikon dalam koleksi ini memiliki tujuan ganda - utilitas praktis dalam pengembangan web modern dan representasi simbolis nilai-nilai serta praktik Islam.

Library ini dirancang berdasarkan tiga prinsip inti:

- **Ikonografi yang Mudah Dikenali:** Ikon yang langsung dipahami oleh Muslim dan developer - masjid, Kaaba, tasbih, Quran, lentera, dan lainnya.
- **Sumber yang Dapat Ditelusuri:** Setiap aset membawa provenance lengkap - atribusi pembuat, URL sumber, syarat lisensi, dan izin redistribusi tercatat dalam metadata.
- **Framework Agnostic:** Tidak terikat pada React atau framework tunggal mana pun. Aset adalah file SVG/WebP biasa dengan lapisan adapter yang nyaman untuk React, Vue, Svelte, Angular, Astro, dan HTML biasa.

## Yang Membuat Ini Berbeda

Kebanyakan library ikon memperlakukan Google Image Search sebagai lisensi. Atsarul Mujahidin memperlakukan penemuan dan lisensi sebagai urusan yang berbeda. Google hanya alat penemuan - sebuah ikon masuk ke library yang dapat didistribusikan hanya setelah sumber asli dan syarat redistribusinya diverifikasi dan dicatat.

Koleksi ini dengan sengaja tidak menjanjikan jumlah ikon yang tetap. Kontributor dapat menambahkan satu ikon, sepuluh ikon, atau menghapus ikon ketika lisensi berubah. Katalog dibuat dari aset dan metadata saat build time, memastikan akurasi dan keterlacakan.

> **Aturan inti:** Google adalah alat penemuan, bukan lisensi. Sebuah ikon hanya masuk ke library yang dapat didistribusikan setelah sumber asli dan syarat redistribusinya dicatat dalam metadata aset.

## Arsitektur Teknis

Library ini dikirimkan sebagai paket npm standar dengan struktur berikut:

- **Aset Sumber:** File SVG/WebP asli diorganisir berdasarkan kategori semantik (ibadah, ramadan, simbol, dll.)
- **Adapter Framework:** Komponen yang sudah dibangun untuk React, Vue, Svelte, Angular, Astro
- **Vanilla JS:** Web Component dengan dukungan CDN (seperti Bootstrap Icons)
- **Metadata:** File JSON berisi URL sumber, lisensi, pembuat, dan persyaratan atribusi
- **Pipeline Build:** Pembuatan katalog, validasi, dan pengemasan berbasis Bun

## Dukungan Kemanusiaan

Atsarul Mujahidin menerima donasi publik dengan transparansi keuangan 100%. Minimum 70% dari semua dana langsung disalurkan untuk bantuan kemanusiaan (bantuan Palestina, panti asuhan, keluarga berpenghasilan rendah, perawatan lansia, bantuan bencana). Hingga 30% mendukung infrastruktur (server, CDN, biaya domain) yang diperlukan untuk menjaga ketersediaan library.

Baca lebih lanjut di dokumentasi [Donasi & Bantuan Kemanusiaan](./DONATIONS.md).

## Open Source & Komunitas

Ini adalah proyek berbasis komunitas. Kontributor menyediakan karya seni, meningkatkan dokumentasi, menambahkan adapter framework, dan membantu meninjau lisensi sumber. Library ini menyambut kontribusi dari developer, desainer, dan siapa saja yang ingin membangun sesuatu yang bermakna untuk komunitas teknologi Muslim.

Lihat [Panduan Kontribusi](../CONTRIBUTING.md) untuk memulai.

## Langkah Selanjutnya

- [Instalasi](./INSTALLATION.md) - Instal library di proyek Anda
- [Penggunaan](./USAGE.md) - Pelajari cara menggunakan ikon di framework Anda
- [Varian](./VARIANTS.md) - Pahami varian fill, outline, dan color
- [Framework](./FRAMEWORKS.md) - Contoh spesifik framework
- [Sumber](./SOURCES.md) - Atribusi sumber dan provenance

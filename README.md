<p align="center">
  <a href="https://github.com/RheinSullivan/islamicIcons">
    <img src="./assets/islamic-icons_banner.png" alt="Islamic Icons - Source-aware, framework-agnostic Islamic SVG and WebP icon library for the modern web." width="680">
  </a>
</p>

<p align="center">
  <a href="https://github.com/RheinSullivan/islamicIcons/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="license"></a>
  <a href="https://github.com/RheinSullivan/islamicIcons/actions"><img src="https://img.shields.io/github/actions/workflow/status/RheinSullivan/islamicIcons/ci.yml" alt="build status"></a>
  <a href="https://www.npmjs.com/package/islamic-icons"><img src="https://img.shields.io/npm/v/islamic-icons" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/islamic-icons"><img src="https://img.shields.io/npm/dw/islamic-icons" alt="npm downloads"></a>
</p>

<p align="center">
  <a href="https://islamicicons.vyagranexus.org/icons">Icons</a>
  ·
  <a href="./docs/en">Guide</a>
  ·
  <a href="#packages">Packages</a>
  ·
  <a href="./LICENSE">License</a>
  ·
  <a href="https://buymeacoffee.com/rheinsullivan">Donate</a>
</p>

# Islamic Icons

Islamic Icons is an open-source icon library that provides **73 logical icons** with multiple variants (fill, outline, color) for displaying Islamic imagery in digital and non-digital projects. The library is **source-aware** and **framework-agnostic**, making it easy for designers and developers to incorporate culturally appropriate Islamic icons into their projects while maintaining proper attribution and provenance.

## Features

- Source-Aware - Every icon includes creator, source URL, license and provenance metadata
- One Icon, Many Variants - Fill, outline, and color variants belong to one logical icon
- Framework Agnostic - Works with React, Vue, Svelte, Angular, Astro, or plain HTML
- Local Assets - No CDN dependency or runtime API requests
- TypeScript Support - Full type definitions included
- Contributor Friendly - Simple workflow to add icons with proper attribution

## Quick Start

### Installation

```bash
npm install islamic-icons
# or
bun add islamic-icons
# or
yarn add islamic-icons
# or
pnpm add islamic-icons
```

### Basic Usage

```jsx
import { Mosque, QuranRehal, PrayerMan } from 'islamic-icons/react';

function App() {
  return (
    <div className="flex gap-4">
      <Mosque className="w-8 h-8" />
      <QuranRehal size={32} />
      <PrayerMan className="text-islamic-green" />
    </div>
  );
}
```

## Packages

| Logo | Package | Version | Downloads | Links |
| ---- | ------- | ------- | --------- | ----- |
| <img src="./assets/framework-logos/react.svg" alt="React logo" width="48"> | **`islamic-icons/react`** | [![npm](https://img.shields.io/npm/v/islamic-icons)](https://www.npmjs.com/package/islamic-icons) | ![NPM Downloads](https://img.shields.io/npm/dw/islamic-icons) | [Docs](./docs/en/frameworks.md) · [Source](../packages/react) |
| <img src="./assets/framework-logos/vue.svg" alt="Vue logo" width="48"> | **`islamic-icons/vue`** | [![npm](https://img.shields.io/npm/v/islamic-icons)](https://www.npmjs.com/package/islamic-icons) | ![NPM Downloads](https://img.shields.io/npm/dw/islamic-icons) | [Docs](./docs/en/frameworks.md) · [Source](../packages/vue) |
| <img src="./assets/framework-logos/svelte.svg" alt="Svelte logo" width="48"> | **`islamic-icons/svelte`** | [![npm](https://img.shields.io/npm/v/islamic-icons)](https://www.npmjs.com/package/islamic-icons) | ![NPM Downloads](https://img.shields.io/npm/dw/islamic-icons) | [Docs](./docs/en/frameworks.md) · [Source](../packages/svelte) |
| <img src="./assets/framework-logos/angular.svg" alt="Angular logo" width="48"> | **`islamic-icons/angular`** | [![npm](https://img.shields.io/npm/v/islamic-icons)](https://www.npmjs.com/package/islamic-icons) | ![NPM Downloads](https://img.shields.io/npm/dw/islamic-icons) | [Docs](./docs/en/frameworks.md) · [Source](../packages/angular) |
| <img src="./assets/framework-logos/astro.svg" alt="Astro logo" width="48"> | **`islamic-icons/astro`** | [![npm](https://img.shields.io/npm/v/islamic-icons)](https://www.npmjs.com/package/islamic-icons) | ![NPM Downloads](https://img.shields.io/npm/dw/islamic-icons) | [Docs](./docs/en/frameworks.md) · [Source](../packages/astro) |
| <img src="./assets/framework-logos/html.svg" alt="HTML logo" width="48"> | **`islamic-icons/static`** | [![npm](https://img.shields.io/npm/v/islamic-icons)](https://www.npmjs.com/package/islamic-icons) | ![NPM Downloads](https://img.shields.io/npm/dw/islamic-icons) | [Docs](./docs/en/frameworks.md) · Direct asset URLs |

## Icon Categories

Islamic Icons organizes icons into **12 semantic categories**:

- **Charity** - Zakat, sadaqah, giving
- **Flags** - National and cause-related imagery (Palestine priority)
- **Food** - Halal food, animals, dietary symbols
- **God** - Allah, tawhid, Arabic religious marks
- **Lifestyle** - Hajj, travel, everyday Islamic life
- **Mosque** - Mosques, minarets, sacred locations
- **Patterns** - Geometric and ornamental Islamic motifs
- **People** - Muslim, family, community figures
- **Prayer** - Salah, dua, wudhu, qibla, tasbih
- **Prophet** - Prophetic names and calligraphy
- **Quran** - Quran, Kaaba, sacred reading symbols
- **Ramadan** - Ramadan, crescent, lantern, iftar, Eid imagery

[Browse all icons →](https://islamicicons.vyagranexus.org/icons)

## Documentation

- [English Documentation](./docs/en/README.md)
- [Dokumentasi Bahasa Indonesia](./docs/id/README.md)

## Contributing

We welcome contributions! Whether you're:
- Adding new icons with proper source attribution
- Improving documentation
- Reporting bugs or suggesting features
- Translating content

For more info on how to contribute, please see the [contribution guidelines](./docs/en/contributing.md).

## Humanitarian Support

Islamic Icons accepts public donations with **100% financial transparency**:

- **Minimum 70%** allocated to humanitarian aid (Palestine relief, orphanages, low-income families, elderly care, disaster relief)
- **Up to 30%** supports framework operations (server, CDN, domain costs)

[Support the Project →](https://buymeacoffee.com/rheinsullivan)

## Core Philosophy

### Not a Fixed Collection

The collection intentionally **does not promise a fixed number** of icons. Contributors can add one icon, ten icons, or remove an icon when licensing changes. The catalog is generated from assets and metadata at build time.

### Source Integrity

**Google is a discovery tool, not a license.** An icon only enters the distributable library after its original source and redistribution terms are recorded.

### Quality Over Quantity

We prioritize:
- Properly sourced and licensed artwork
- Semantic organization by meaning, not style
- Contributor-verified provenance
- Not generic AI recreations just for normalization
- Not unlicensed Google Image results
- Not mystery meat icons with no attribution

## License

Islamic Icons is totally free for commercial and personal use. This software is licensed under the [MIT License](./LICENSE).

**Important:** Individual icons may have different licenses based on their source. Always check the icon's source attribution metadata.

## Credits

Thank you to all the people who contributed to Islamic Icons!

<a href="https://github.com/RheinSullivan/islamicIcons/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=RheinSullivan/islamicIcons" />
</a>

## Community

- **Website**: [islamicicons.vyagranexus.org](https://islamicicons.vyagranexus.org)
- **GitHub**: [github.com/RheinSullivan/islamicIcons](https://github.com/RheinSullivan/islamicIcons)
- **Issues**: [Report bugs or request features](https://github.com/RheinSullivan/islamicIcons/issues)
- **Donate**: [Buy Me a Coffee](https://buymeacoffee.com/rheinsullivan)

---

<p align="center">
  Made with care by the Islamic Icons Community
  <br>
  <strong><a href="https://vyagranexus.org">Vyagra Nexus</a> | Indonesia</strong>
  <br>
  Free Palestine and Sudan
</p>

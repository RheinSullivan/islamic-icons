# Changelog

All notable changes to Atsarul Mujahidin are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-09-05

### Changed

- **BREAKING: Svelte 5 Compatibility** - All Svelte components now use Svelte 5 runes mode with `$props()` instead of `export let`
- **BREAKING: Import Paths** - Svelte components now use direct file imports: `atsarul-mujahidin/svelte/fill/ComponentName` instead of `atsarul-mujahidin/svelte/component-name-fill`
- Updated all Svelte components to use `{...restProps}` instead of `{...$$restProps}` for props spreading

### Fixed

- Fixed Svelte 5 compatibility issues with `$$restProps` that caused runtime errors
- Fixed package.json exports to support both wildcard patterns and direct file imports

### Migration Guide

If upgrading from 0.1.0, update your Svelte imports:

**Before (0.1.0):**
```svelte
import Kaaba from 'atsarul-mujahidin/svelte/kaaba-fill';
import PalestineFlag from 'atsarul-mujahidin/svelte/palestine-flag-color';
```

**After (0.1.1):**
```svelte
import Kaaba from 'atsarul-mujahidin/svelte/fill/Kaaba';
import PalestineFlag from 'atsarul-mujahidin/svelte/color/PalestineFlag';
```

Component naming follows PascalCase (e.g., `PrayerTime`, `QuranBook`, `MuslimFamily`).

## [0.1.0] - 2026-09-01

### Added

- **76 logical icons** across 12 semantic categories
- **Three style variants** per icon when the source artwork permits: `fill`, `outline`, `color`
- **Source-aware metadata** for every icon with creator, source URL, and license tracking
- **TypeScript-first** API with bundled `.d.ts` types
- **Framework-agnostic** core package - no React, Vue, Svelte, or other framework runtime dependencies
- **Per-category exports** under `atsarul-mujahidin/icons/<category>` with `fill`, `outline`, `color`, `original`, and `alternate` variants
- **Aliases** for common icon names (e.g. `allah` → `allah-calligraphy`, `tasbih` → `tasbih-ring`)
- **External source manifests** under `atsarul-mujahidin/sources/<slug>.json`
- **Catalog** with full metadata: `import { catalog, categories, sources, metadata } from 'atsarul-mujahidin'`
- **SvelteKit Web Docs** (`web-docs/`) with icon explorer, search, filter, copy, and download
- **SVG validation pipeline** that checks for malformed XML, missing `viewBox`, duplicate IDs, broken same-document hrefs, embedded scripts, and external href references
- **Duplicate icon detection** via SHA-256 fingerprinting
- **Source manifest** for community uploads, Google Material Icons, SVG Repo candidates, and Mary Akveo
- **Donation transparency** page with full allocation policy and reporting structure
- **Deno support** via the `npm:atsarul-mujahidin` specifier
- **MIT license** with full attribution to upstream sources

### Source lanes

- **Community** - original artwork supplied for this project
- **Google Material Icons** - Apache-2.0, vendored with provenance
- **External discovery** - CC0 candidates from SVG Repo and public-domain vectors from Mary Akveo

### Categories

`charity`, `flags`, `food`, `god`, `lifestyle`, `mosque`, `patterns`, `people`, `prayer`, `prophet`, `quran`, `ramadan`

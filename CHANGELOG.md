# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-09-05

### Changed
- **BREAKING**: Updated Svelte components to use Svelte 5 runes mode (`$props()`)
- Replaced `$$restProps` with `$props()` destructuring for Svelte 5 compatibility
- Updated component import paths to support direct file imports (e.g., `atsarul-mujahidin/svelte/fill/Kaaba`)

### Fixed
- Svelte 5 compatibility issues with runes mode
- Component prop spreading now works correctly with `{...restProps}`

### Migration Guide
If you're upgrading from 0.1.0 to 0.1.1, update your imports:

**Before (0.1.0):**
```javascript
import Kaaba from 'atsarul-mujahidin/svelte/kaaba-fill';
```

**After (0.1.1):**
```javascript
import Kaaba from 'atsarul-mujahidin/svelte/fill/Kaaba';
```

## [0.1.0] - 2026-09-04

### Added
- Initial release of Atsarul Mujahidin icon library
- 81+ Islamic icons across 14 categories
- Support for React, Vue, Svelte, Angular, and vanilla JavaScript
- Three variants: fill, outline, and color
- Source attribution and metadata for all icons
- TypeScript support with full type definitions
- Framework-agnostic design
- Community-driven with contribution guidelines

### Categories
- Animal, Charity, Flags, Food, God, Lifestyle
- Mosque, Muslim Brand, Ornament, Patterns
- Prayer, Prophet, Calligraphy, Quran

### Features
- SVG optimization for web performance
- WebP support for raster icons
- Comprehensive documentation
- MIT licensed
- npm package distribution

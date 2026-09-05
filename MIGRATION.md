# Migration Guide: 0.1.0 → 0.1.1

This guide helps you upgrade from Atsarul Mujahidin v0.1.0 to v0.1.1.

## Breaking Changes

### Svelte 5 Compatibility

Version 0.1.1 upgrades all Svelte components to Svelte 5 runes mode. This change was necessary to support Svelte 5's new reactivity system and ensure future compatibility.

**Impact:** If you're using Svelte components from this library, you'll need to update your import paths.

### Import Path Changes

The import path structure for Svelte components has changed to follow a more conventional pattern.

#### Before (0.1.0)

```svelte
<script>
  import Kaaba from 'atsarul-mujahidin/svelte/kaaba-fill';
  import KaabaSimple from 'atsarul-mujahidin/svelte/kaaba-simple-fill';
  import PalestineFlag from 'atsarul-mujahidin/svelte/palestine-flag-color';
  import Zakat from 'atsarul-mujahidin/svelte/zakat-outline';
</script>

<Kaaba size={24} />
<KaabaSimple size={32} />
<PalestineFlag size={48} />
<Zakat size={24} />
```

#### After (0.1.1)

```svelte
<script>
  import Kaaba from 'atsarul-mujahidin/svelte/fill/Kaaba';
  import KaabaSimple from 'atsarul-mujahidin/svelte/fill/KaabaSimple';
  import PalestineFlag from 'atsarul-mujahidin/svelte/color/PalestineFlag';
  import Zakat from 'atsarul-mujahidin/svelte/outline/Zakat';
</script>

<Kaaba size={24} />
<KaabaSimple size={32} />
<PalestineFlag size={48} />
<Zakat size={24} />
```

### Component Naming Convention

Component names now use PascalCase and are organized by variant folder:

- **Pattern**: `atsarul-mujahidin/svelte/{variant}/{ComponentName}`
- **Variants**: `fill`, `outline`, `color`

#### Conversion Rules

| Old Format | New Format |
|------------|------------|
| `kaaba-fill` | `fill/Kaaba` |
| `prayer-time-fill` | `fill/PrayerTime` |
| `quran-book-fill` | `fill/QuranBook` |
| `muslim-family-fill` | `fill/MuslimFamily` |
| `palestine-flag-color` | `color/PalestineFlag` |
| `zakat-outline` | `outline/Zakat` |

**Formula**: 
1. Remove the `-{variant}` suffix
2. Convert from kebab-case to PascalCase
3. Move to `{variant}/` directory

Examples:
- `dua-hands-fill` → `fill/DuaHands`
- `allah-caligraphy-fill` → `fill/AllahCaligraphy`
- `crescent-star-frame-outline` → `outline/CrescentStarFrameOutline`

## Migration Steps

### Step 1: Update Package Version

```bash
npm install atsarul-mujahidin@0.1.1
# or
yarn add atsarul-mujahidin@0.1.1
# or
pnpm add atsarul-mujahidin@0.1.1
# or
bun add atsarul-mujahidin@0.1.1
```

### Step 2: Update Svelte Project (if using Svelte 5)

If you're using Svelte 5, the components will work seamlessly. If you're still on Svelte 4, consider upgrading to Svelte 5 first:

```bash
npm install svelte@^5.0.0
```

### Step 3: Find and Replace Imports

Use your editor's find-and-replace feature to update imports:

**Find (regex):**
```regex
from ['"]atsarul-mujahidin/svelte/([\w-]+)-(fill|outline|color)['"]
```

**Replace with:**
```
from 'atsarul-mujahidin/svelte/$2/{PascalCase($1)}'
```

Note: You'll need to manually convert kebab-case to PascalCase. Most modern editors can help with this.

### Step 4: Manual Conversion Helper

Here's a list of all icon names for reference:

#### Fill Variants
- `adhan-call` → `AdhanCall`
- `allah-caligraphy` → `AllahCaligraphy`
- `allah-hand` → `AllahHand`
- `arabic-calligraphy-1` → `ArabicCalligraphy1`
- `arabic-calligraphy-2` → `ArabicCalligraphy2`
- `basmallah` → `Basmallah`
- `bismillah-calligraphy` → `BismillahCalligraphy`
- `camel` → `Camel`
- `camel-people` → `CamelPeople`
- `cow` → `Cow`
- `crescent-star-frame` → `CrescentStarFrame`
- `dua-hands` → `DuaHands`
- `fast` → `Fast`
- `fasting` → `Fasting`
- `goat` → `Goat`
- `kaaba` → `Kaaba`
- `kaaba-simple` → `KaabaSimple`
- `ketupat` → `Ketupat`
- `man-praying` → `ManPraying`
- `moon-start` → `MoonStart`
- `mosque-dome` → `MosqueDome`
- `mosque-dome-simple` → `MosqueDomeSimple`
- `mosque-maps` → `MosqueMaps`
- `mosque-simple` → `MosqueSimple`
- `muhammad-calligraphy` → `MuhammadCalligraphy`
- `muslim-family` → `MuslimFamily`
- `muslim-family-child` → `MuslimFamilyChild`
- `muslim-man` → `MuslimMan`
- `muslim-praying-1` → `MuslimPraying1`
- `muslim-praying-2` → `MuslimPraying2`
- `muslim-woman` → `MuslimWoman`
- `prayer-beads-tasbih` → `PrayerBeadsTasbih`
- `prayer-mat` → `PrayerMat`
- `prayer-position` → `PrayerPosition`
- `prayer-rug` → `PrayerRug`
- `prayer-time` → `PrayerTime`
- `qibla-direction` → `QiblaDirection`
- `quran-book` → `QuranBook`
- `quran-stand` → `QuranStand`
- `ruku-bowing` → `RukuBowing`
- `sajadah-prayer-mat` → `SajadahPrayerMat`
- `salah-praying` → `SalahPraying`
- `shadaqah-hand` → `ShadaqahHand`
- `sujud-prostration` → `SujudProstration`
- `takbir-hands` → `TakbirHands`
- `woman-hijab` → `WomanHijab`
- `wudhu-ablution` → `WudhuAblution`

#### Outline Variants
- `allah-hand-outline` → `AllahHandOutline`
- `crescent-star-frame-outline` → `CrescentStarFrameOutline`
- `crescent-star-outline` → `CrescentStarOutline`
- `fast-outline` → `FastOutline`
- `islamic-pattern-1` → `IslamicPattern1`
- `islamic-pattern-3` → `IslamicPattern3`
- `islamic-pattern-4` → `IslamicPattern4`
- `islamic-pattern-5` → `IslamicPattern5`
- `islamic-pattern-6` → `IslamicPattern6`
- `islamic-pattern-7` → `IslamicPattern7`
- `ketupat-outline` → `KetupatOutline`
- `ketupat-side-outline` → `KetupatSideOutline`
- `lantern-outline` → `LanternOutline`
- `moon-star-outline` → `MoonStarOutline`
- `prayer-beads-outline` → `PrayerBeadsOutline`
- `quran-holder-outline` → `QuranHolderOutline`
- `quran-stand-outline` → `QuranStandOutline`
- `shadaqah-hand-outline` → `ShadaqahHandOutline`
- `tasbih-beads-outline` → `TasbihBeadsOutline`
- `woman-hijab-outline` → `WomanHijabOutline`
- `zakat` → `Zakat`

#### Color Variants
- `islamic-pattern-color-1` → `IslamicPatternColor1`
- `islamic-pattern-color-2` → `IslamicPatternColor2`
- `mosque-color` → `MosqueColor`
- `palestine-brush` → `PalestineBrush`
- `palestine-flag` → `PalestineFlag`
- `palestine-relief` → `PalestineRelief`

### Step 5: Verify Your Build

After updating imports, verify your application builds successfully:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
```

## Non-Breaking Changes

### React and Vue Components

React and Vue component imports remain **unchanged** and work exactly as before:

```jsx
// React - NO CHANGES NEEDED
import { Kaaba } from 'atsarul-mujahidin/react/fill/Kaaba.jsx';
```

```vue
<!-- Vue - NO CHANGES NEEDED -->
<script setup>
import Kaaba from 'atsarul-mujahidin/vue/fill/Kaaba.vue';
</script>
```

### Icon URL Exports

Icon URL exports remain **unchanged**:

```ts
// NO CHANGES NEEDED
import { mosque, mosqueOutline } from 'atsarul-mujahidin/icons/mosque.js';
```

### Metadata and Categories

Metadata and category exports remain **unchanged**:

```ts
// NO CHANGES NEEDED
import { catalog, categories, sources } from 'atsarul-mujahidin';
```

## Need Help?

If you encounter issues during migration:

1. Check the [README.md](./README.md) for updated examples
2. Review the [CHANGELOG.md](./CHANGELOG.md) for detailed changes
3. Open an issue on [GitHub](https://github.com/RheinSullivan/islamic-icons/issues)
4. Visit our [documentation](https://atsarul-mujahidin.vyagra.dev)

## Why This Change?

This breaking change was necessary to:

1. **Support Svelte 5**: Svelte 5 introduces runes mode with `$props()` instead of `export let`
2. **Better Organization**: Component files are now organized by variant folders (`fill/`, `outline/`, `color/`)
3. **Consistent Naming**: PascalCase component names follow standard naming conventions
4. **Improved DX**: Direct file imports make it clearer what you're importing

We apologize for the inconvenience, but this change ensures Atsarul Mujahidin stays compatible with the latest web technologies and provides a better developer experience going forward.

---

**Version**: 0.1.1  
**Date**: September 5, 2026  
**License**: MIT

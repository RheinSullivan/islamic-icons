# Contributing to Atsarul Mujahidin

Thank you for your interest in contributing to Atsarul Mujahidin! This document provides guidelines for contributing to the project.

## 🤲 Ways to Contribute

- **Add new icons** - Submit original Islamic icon designs
- **Improve existing icons** - Enhance quality or add variants
- **Fix bugs** - Report and fix issues
- **Improve documentation** - Help others understand the project
- **Translate** - Add support for more languages
- **Share feedback** - Suggest improvements or new features

## 📋 Before You Start

### Prerequisites

- Git installed
- Node.js 18+ or Bun runtime
- Basic knowledge of SVG
- Familiarity with your chosen framework (React, Vue, Svelte)

### Setup Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/islamic-icons.git
cd islamic-icons

# Install dependencies
bun install

# Build library
cd library
bun run build

# Run documentation website
cd ../web-docs
bun install
bun run dev
```

## 🎨 Adding New Icons

### 1. Prepare Your Icon

**Requirements:**
- SVG format only
- Clean, optimized SVG (no unnecessary elements)
- Must include `viewBox` attribute
- No embedded scripts or external references
- Use `currentColor` for themeable elements
- Appropriate for Islamic/Muslim context

**Variants:**
- `fill.svg` - Solid/filled style (required)
- `outline.svg` - Line/stroke style (optional)
- `color.svg` - Multi-color style (optional)

**Example SVG:**
```xml
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="currentColor"/>
</svg>
```

### 2. Choose Correct Category

Place your icon in the appropriate category folder:

```
library/assets/icons/
├── mosque/        # Mosques, Islamic architecture, Kaaba
├── prayer/        # Prayer-related (salah, dua, wudhu, qibla)
├── quran/         # Quran, holy book related
├── god/           # Allah calligraphy, tawhid symbols
├── prophet/       # Prophet Muhammad calligraphy
├── qalligraphy/   # Arabic calligraphy, Bismillah
├── ornamen/       # Decorative Islamic patterns, crescent moon
├── patterns/      # Geometric Islamic patterns
├── food/          # Halal food, Ramadan iftar, ketupat
├── lifestyle/     # Muslim family, hijab, daily life
├── charity/       # Zakat, sadaqah
├── flags/         # Islamic country flags, Palestine
└── animal/        # Halal animals (livestock)
```

### 3. File Naming Convention

```
library/assets/icons/[category]/[icon-name]/[variant].svg
```

**Examples:**
- `library/assets/icons/prayer/dua-hands/fill.svg`
- `library/assets/icons/mosque/kaaba/outline.svg`
- `library/assets/icons/flags/palestine-flag/color.svg`

**Icon name rules:**
- Use lowercase
- Use hyphens for spaces (kebab-case)
- Be descriptive and specific
- Avoid abbreviations

### 4. Add Icon Metadata (Optional)

If your icon has aliases or special attribution, add to `library/assets/icon-aliases.json`:

```json
{
  "dua-hands": {
    "aliases": ["dua", "supplication", "pray"],
    "attribution": {
      "creator": "Your Name",
      "source": "Original artwork",
      "license": "MIT"
    }
  }
}
```

### 5. Build and Test

```bash
cd library

# Run build pipeline
bun run build

# Validate icons
bun run icons:validate

# Check for errors
bun run lint
```

### 6. Test in Website

```bash
cd ../web-docs
bun run dev
```

Visit http://localhost:5173 and verify your icon appears correctly:
- Browse to its category
- Check all variants load
- Test search functionality
- Verify metadata displays correctly

### 7. Submit Pull Request

```bash
git checkout -b feature/add-new-icon
git add library/assets/icons/
git commit -m "feat: add [icon-name] icon"
git push origin feature/add-new-icon
```

Create a PR with:
- **Title:** `feat: add [icon-name] icon`
- **Description:**
  - What the icon represents
  - Category justification
  - Source/inspiration (if applicable)
  - License verification
- **Screenshots:** Show the icon rendered

## 🐛 Reporting Bugs

### Before Submitting

- Search existing issues to avoid duplicates
- Test with the latest version
- Gather reproduction steps

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Install package '...'
2. Import component '...'
3. Use with props '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Package version: [e.g., 0.1.1]
- Framework: [e.g., React 18, Vue 3, Svelte 5]
- Node version: [e.g., 18.17.0]
- Browser: [e.g., Chrome 120]
```

Submit at: https://github.com/RheinSullivan/islamic-icons/issues

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features.

**Additional context**
Any other context, mockups, or examples.
```

## 📝 Improving Documentation

Documentation improvements are always welcome:

- Fix typos or unclear instructions
- Add examples for different frameworks
- Translate to other languages
- Improve API documentation

**Files to edit:**
- `README.md` - Main repository README
- `library/README.md` - NPM package README
- `web-docs/src/routes/` - Website content
- Code comments and JSDoc

## 🌍 Translation

We welcome translations to make the project accessible to more Muslims worldwide.

**Languages needed:**
- Arabic (العربية)
- Urdu (اردو)
- Turkish (Türkçe)
- Malay (Bahasa Melayu)
- Others

**Translation files:**
- `web-docs/src/lib/i18n.ts`

## 🔍 Code Style

### JavaScript/TypeScript

- Use TypeScript for type safety
- Follow existing code style
- Add JSDoc comments for public APIs
- Use meaningful variable names

### SVG

- Use `currentColor` for themeable fills/strokes
- Include `viewBox` attribute
- Remove unnecessary attributes
- Optimize with SVGO (but keep readability)

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add prayer time icon with fill and outline variants
fix: correct viewBox dimensions for mosque icon
docs: update installation guide with Svelte 5 examples
```

## ✅ Pull Request Checklist

Before submitting your PR:

- [ ] Tested locally in at least one framework
- [ ] Build passes: `bun run build`
- [ ] Validation passes: `bun run lint`
- [ ] Icons appear correctly in web-docs
- [ ] No console errors or warnings
- [ ] Commit messages follow conventional format
- [ ] PR description explains changes clearly
- [ ] Attribution provided for external sources
- [ ] License compatibility verified

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Original icon artwork must be:
- Your own creation, OR
- Licensed under MIT, CC0, Apache-2.0, or Public Domain

## 🤝 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

**Expected behavior:**
- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

**Unacceptable behavior:**
- Harassment or discrimination
- Trolling or inflammatory comments
- Personal or political attacks
- Publishing others' private information

## 💬 Getting Help

- **GitHub Issues:** https://github.com/RheinSullivan/islamic-icons/issues
- **GitHub Discussions:** https://github.com/RheinSullivan/islamic-icons/discussions
- **Email:** rheinsullivan@vyagra.dev

## 🎖️ Recognition

All contributors are recognized in:
- [CONTRIBUTORS.md](CONTRIBUTORS.md)
- Package `contributors` field
- Git commit history
- Release notes

---

**Thank you for contributing to Atsarul Mujahidin!**

*Create something that leaves a lasting أثر*

🕌 Free Palestine | ☪️ Support Sudan | 🤲 Sadaqah Jariyah

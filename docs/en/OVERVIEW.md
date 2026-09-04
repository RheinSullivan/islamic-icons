# Overview

Everything you need to browse, install, use, source and contribute to Atsarul Mujahidin.

## Introduction

Atsarul Mujahidin is a framework-agnostic collection of Islamic SVG and WebP artwork. **Atsarul Mujahidin** (آثَارُ المُجَاهِدِيْنَ) means **Traces of the Mujahidin** in Arabic - representing something you create and leave behind for the fighters. The name embodies the philosophy of building meaningful work that has lasting impact for those who struggle.

## Philosophy & Purpose

This library was created with a specific mission: to provide high-quality Islamic iconography while supporting humanitarian causes. Every icon in this collection serves a dual purpose - practical utility in modern web development and symbolic representation of Islamic values and practices.

The library is designed around three core principles:

- **Recognizable Iconography:** Icons that Muslims and developers immediately understand - mosque, Kaaba, prayer beads, Quran, lantern, and more.
- **Traceable Sources:** Every asset carries full provenance - creator attribution, source URL, license terms, and redistribution permissions are recorded in metadata.
- **Framework Agnostic:** Not tied to React or any single framework. Assets are ordinary SVG/WebP files with pleasant adapter layers for React, Vue, Svelte, Angular, Astro and plain HTML.

## What Makes This Different

Most icon libraries treat Google Image Search as a license. Atsarul Mujahidin treats discovery and licensing as separate concerns. Google is a discovery tool only - an icon enters the distributable library only after its original source and redistribution terms are verified and recorded.

The collection intentionally does not promise a fixed number of icons. Contributors can add one icon, ten icons, or remove an icon when licensing changes. The catalog is generated from assets and metadata at build time, ensuring accuracy and traceability.

> **Core rule:** Google is a discovery tool, not a license. An icon only enters the distributable library after its original source and redistribution terms are recorded in the asset metadata.

## Technical Architecture

The library ships as a standard npm package with the following structure:

- **Source Assets:** Original SVG/WebP files organized by semantic category (worship, ramadan, symbols, etc.)
- **Framework Adapters:** Pre-built components for React, Vue, Svelte, Angular, Astro
- **Vanilla JS:** Web Component with CDN support (like Bootstrap Icons)
- **Metadata:** JSON files containing source URL, license, creator, and attribution requirements
- **Build Pipeline:** Bun-powered catalog generation, validation, and packaging

## Humanitarian Support

Atsarul Mujahidin accepts public donations with 100% financial transparency. Minimum 70% of all funds go directly to humanitarian aid (Palestine relief, orphanages, low-income families, elderly care, disaster relief). Up to 30% supports infrastructure (server, CDN, domain costs) required to keep the library available.

Read more in the [Donations & Humanitarian Aid](./DONATIONS.md) documentation.

## Open Source & Community

This is a community-driven project. Contributors supply artwork, improve documentation, add framework adapters, and help review source licenses. The library welcomes contributions from developers, designers, and anyone who wants to build something meaningful for the Muslim tech community.

See the [Contributing Guide](../CONTRIBUTING.md) to get started.

## Next Steps

- [Installation](./INSTALLATION.md) - Install the library in your project
- [Usage](./USAGE.md) - Learn how to use icons in your framework
- [Variants](./VARIANTS.md) - Understand fill, outline, and color variants
- [Frameworks](./FRAMEWORKS.md) - Framework-specific examples
- [Sources](./SOURCES.md) - Source attribution and provenance

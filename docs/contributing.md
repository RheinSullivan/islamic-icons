# Contributing

Add an SVG or WebP under the source area, preserve the original file, and add metadata for:

- semantic name
- category
- creator
- license
- original URL
- source family
- whether a variant is original or normalized

Do not create fake outline/color variants from artwork that cannot be normalized safely.

Run:

```bash
bun run icons:catalog
bun run icons:package
bun run icons:validate
```

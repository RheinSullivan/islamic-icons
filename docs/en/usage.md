# Usage & Styling

## Available Icons

Browse all icons at [islamicicons.vyagranexus.org/icons](https://islamicicons.vyagranexus.org/icons)

## REST API

Islamic Icons provides a REST API for programmatic access to icon metadata.

### Base URL

```
https://islamicicons.vyagranexus.org/api
```

### Endpoints

#### Get All Icons

```http
GET /api/icons
```

Query parameters:
- `category` - Filter by category (mosque, prayer, quran, etc.)
- `source` - Filter by source (community, svg-repo)
- `search` - Search by name, title, or aliases
- `variant` - Filter by variant availability (fill, outline, color)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50)

Example:
```bash
curl https://islamicicons.vyagranexus.org/api/icons?category=mosque&limit=10
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "name": "mosque",
      "title": "Mosque",
      "category": "mosque",
      "aliases": ["masjid"],
      "sources": [
        {
          "id": "community",
          "label": "Community",
          "variants": ["fill", "outline", "original"],
          "license": "CC BY 4.0",
          "author": "contributor-name",
          "url": "https://source-url.com"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 73,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "0.1.0"
  }
}
```

#### Get Specific Icon

```http
GET /api/icons/:name
```

Example:
```bash
curl https://islamicicons.vyagranexus.org/api/icons/kaaba
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "kaaba",
    "title": "Kaaba",
    "category": "quran",
    "aliases": ["mecca", "holy"],
    "sources": [
      {
        "id": "community",
        "label": "Community",
        "variants": ["fill", "outline"],
        "license": "CC BY 4.0",
        "author": "contributor-name",
        "url": "https://source-url.com",
        "paths": {
          "fill": "/assets/icons/quran/kaaba/fill.svg",
          "outline": "/assets/icons/quran/kaaba/outline.svg"
        }
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "0.1.0"
  }
}
```

#### Get Categories

```http
GET /api/categories
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "mosque",
      "name": "Mosque",
      "count": 6
    },
    {
      "id": "prayer",
      "name": "Prayer",
      "count": 10
    }
  ],
  "total": 12,
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "0.1.0"
  }
}
```

#### Get Sources

```http
GET /api/sources
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "community",
      "label": "Community",
      "count": 50
    },
    {
      "id": "svg-repo",
      "label": "SVG Repo",
      "count": 23
    }
  ],
  "total": 2,
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "0.1.0"
  }
}
```

### Error Responses

```json
{
  "success": false,
  "error": "Icon not found",
  "message": "No icon found with name: invalid-name"
}
```

### Rate Limiting

The API is currently not rate-limited but this may change in future versions. Please be respectful with requests.

### CORS

CORS is enabled for all origins. You can make requests from any domain.

### Usage Example

```javascript
// Fetch all mosque icons
async function getMosqueIcons() {
  const response = await fetch(
    'https://islamicicons.vyagranexus.org/api/icons?category=mosque'
  );
  const data = await response.json();
  return data.data;
}

// Search for specific icon
async function searchIcon(query) {
  const response = await fetch(
    `https://islamicicons.vyagranexus.org/api/icons?search=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.data;
}

// Get icon details
async function getIconDetails(name) {
  const response = await fetch(
    `https://islamicicons.vyagranexus.org/api/icons/${name}`
  );
  const data = await response.json();
  return data.data;
}
```

## Code Optimization

### Tree Shaking

Islamic Icons is fully tree-shakeable. Only import what you use:

```jsx
// ✅ Good - only bundles Kaaba and Mosque
import { Kaaba, Mosque } from 'islamic-icons/react';

// ❌ Bad - bundles entire library
import * as Icons from 'islamic-icons/react';
```

### Bundle Size

- Per icon: ~1-3KB (gzipped)
- With tree shaking: Only what you import
- No runtime dependencies

## Accessibility

### Alt Text

```jsx
// React with img wrapper
<div role="img" aria-label="Kaaba icon">
  <Kaaba size={48} />
</div>

// Or semantic HTML
<figure>
  <Kaaba size={48} />
  <figcaption className="sr-only">Kaaba</figcaption>
</figure>
```

### Focus States

```css
.icon-button:focus-visible {
  outline: 2px solid #328460;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Screen Readers

```jsx
<button 
  aria-label="Open prayer times"
  onClick={openPrayerTimes}
>
  <PrayerMan size={24} aria-hidden="true" />
</button>
```

## Official Packages

### Icon Availability

Check which variant an icon has:

```javascript
// All icons have at least one variant
// Common variants:
- fill: Solid filled icon
- outline: Stroke-only icon  
- color: Multi-color icon
- original: Original source style
```

### Official Packages

| Framework | Import Path |
|-----------|-------------|
| React | `islamic-icons/react` |
| Vue | `islamic-icons/vue` |
| Svelte | `islamic-icons/svelte` |
| Angular | `islamic-icons/angular` |
| Astro | `islamic-icons/astro` |
| Static | Direct asset path |

## Community

Found a bug or want to contribute?

- [GitHub Issues](https://github.com/RheinSullivan/islamic-icons/issues)
- [Contributing Guide](/docs/contributing)
- [Code of Conduct](/docs/code-of-conduct)

Next: [Advanced Topics](/docs/advanced)

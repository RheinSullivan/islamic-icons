# Atsarul Mujahidin Universal API & Cross-Language Guide

Welcome to the **Atsarul Mujahidin Universal API**. While our primary NPM package provides native components for JavaScript frameworks (React, Vue, Svelte, Angular, Astro), this API and CDN ecosystem enables developers to consume all 81+ authentic Islamic icons seamlessly across **any programming language, mobile platform, or backend architecture**.

---

## 🌐 1. Public CDN Endpoints (Zero-Setup)

You can consume icon SVGs and metadata directly from global high-performance CDNs without running any server or installing node packages.

### jsDelivr CDN
- **Catalog JSON**:
  ```
  https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/api/catalog.json
  ```
- **Categories JSON**:
  ```
  https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/api/categories.json
  ```
- **Direct JavaScript Icon Module**:
  ```
  https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1/fill/mosque-simple.js
  ```

### unpkg CDN
- **Catalog JSON**:
  ```
  https://unpkg.com/atsarul-mujahidin@0.1.1/api/catalog.json
  ```

---

## 🚀 2. Standalone REST API Server

If you prefer a dedicated microservice in your internal network, Docker container, or Kubernetes cluster, `atsarul-mujahidin` includes a lightweight, zero-dependency HTTP server.

### Starting the Server
```bash
# Using Node.js (18+)
node library/api/server.js

# Using Bun
bun library/api/server.js
```
The server listens on `http://localhost:3000` (or `PORT` environment variable).

### Available Endpoints

| Endpoint | Method | Response | Description |
| :--- | :--- | :--- | :--- |
| `/api/catalog` | `GET` | `application/json` | Returns all 81 icons with titles, categories, and variants |
| `/api/categories` | `GET` | `application/json` | Returns all 14 semantic categories |
| `/api/metadata` | `GET` | `application/json` | Library version, total counts, and licensing |
| `/api/icons/:name` | `GET` | `application/json` | Detailed metadata for an icon (e.g., `/api/icons/kaaba`) |
| `/api/icons/:name/:variant.svg` | `GET` | `image/svg+xml` | Raw SVG stream with CORS enabled for mobile/web apps |
| `/api/search?q=mosque` | `GET` | `application/json` | Search icons by title, alias, or keyword |
| `/health` | `GET` | `application/json` | Liveness/readiness probe |

---

## 📱 3. Cross-Language & Mobile Integration Examples

### Flutter / Dart

Use the popular [`flutter_svg`](https://pub.dev/packages/flutter_svg) package to render icons dynamically over HTTPS or via local cache:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class MosqueIconWidget extends StatelessWidget {
  const MosqueIconWidget({super.key});

  @override
  Widget build(BuildContext context) {
    // Stream directly from the Atsarul Mujahidin API or CDN
    return SvgPicture.network(
      'https://atsarulmujahidin.rheinsullivan.web.id/api/icons/mosque-simple/fill.svg',
      width: 48,
      height: 48,
      colorFilter: const ColorFilter.mode(Color(0xFF10B981), BlendMode.srcIn),
      placeholderBuilder: (BuildContext context) => const CircularProgressIndicator(),
    );
  }
}
```

### Android (Kotlin & Jetpack Compose)

Using [Coil](https://coil-kt.github.io/coil/) with SVG decoder:

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.decode.SvgDecoder
import coil.request.ImageRequest

@Composable
fun IslamicIcon(iconName: String, variant: String = "fill", modifier: Modifier = Modifier) {
    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data("https://atsarulmujahidin.rheinsullivan.web.id/api/icons/$iconName/$variant.svg")
            .decoderFactory(SvgDecoder.Factory())
            .crossfade(true)
            .build(),
        contentDescription = iconName,
        modifier = modifier
    )
}
```

### iOS (Swift & SwiftUI)

Using Swift and SwiftUI:

```swift
import SwiftUI

struct IslamicIconView: View {
    let iconName: String
    let variant: String
    
    var iconUrl: URL? {
        URL(string: "https://atsarulmujahidin.rheinsullivan.web.id/api/icons/\(iconName)/\(variant).svg")
    }
    
    var body: some View {
        AsyncImage(url: iconUrl) { phase in
            switch phase {
            case .empty:
                ProgressView()
            case .success(let image):
                image
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 48, height: 48)
            case .failure:
                Image(systemName: "photo")
            @unknown default:
                EmptyView()
            }
        }
    }
}
```

### Python (Django, Flask, FastAPI)

Fetch icon metadata or SVG strings to render server-side:

```python
import urllib.request
import json

def get_islamic_icon_svg(icon_name: str, variant: str = "fill") -> str:
    """Fetch raw SVG string from the Atsarul Mujahidin API."""
    url = f"https://atsarulmujahidin.rheinsullivan.web.id/api/icons/{icon_name}/{variant}.svg"
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "AtsarulMujahidin-PythonClient/1.0"}
    )
    with urllib.request.urlopen(request) as response:
        return response.read().decode("utf-8")

# Example usage in FastAPI or Flask template
svg_markup = get_islamic_icon_svg("kaaba", "fill")
```

### PHP / Laravel

In a Laravel Blade component or native PHP script:

```php
<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class IslamicIcon extends Component
{
    public string $name;
    public string $variant;

    public function __construct(string $name, string $variant = 'fill')
    {
        $this->name = $name;
        $this->variant = $variant;
    }

    public function render()
    {
        // Cache the SVG for 24 hours to ensure high performance
        $cacheKey = "islamic_icon_{$this->name}_{$this->variant}";
        
        $svgContent = Cache::remember($cacheKey, 86400, function () {
            $response = Http::get("https://atsarulmujahidin.rheinsullivan.web.id/api/icons/{$this->name}/{$this->variant}.svg");
            return $response->successful() ? $response->body() : '';
        });

        return view('components.islamic-icon', ['svg' => $svgContent]);
    }
}
```

### Go (Golang)

In a Go web service or CLI tool:

```go
package main

import (
	"fmt"
	"io"
	"net/http"
)

func FetchIslamicIcon(iconName string, variant string) (string, error) {
	url := fmt.Sprintf("https://atsarulmujahidin.rheinsullivan.web.id/api/icons/%s/%s.svg", iconName, variant)
	
	response, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to fetch icon: status %d", response.StatusCode)
	}

	bodyBytes, err := io.ReadAll(response.Body)
	if err != nil {
		return "", err
	}

	return string(bodyBytes), nil
}
```

---

## 🛡️ License & Human-Centric Attribution

All icons provided through the API remain 100% open-source under the **MIT License**. Each icon response includes provenance metadata preserving attribution to our volunteer designers and the global Muslim open-source community.

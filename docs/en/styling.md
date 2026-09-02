# Styling

## Color

### Single Color (Fill/Outline)

```jsx
// React
<Kaaba size={48} variant="outline" color="#328460" />

// Vue
<Kaaba :size="48" variant="outline" color="#328460" />

// Svelte
<Kaaba size={48} variant="outline" color="#328460" />
```

### CSS Variables

```css
:root {
  --islamic-green: #328460;
  --islamic-gold: #d7b66b;
}

.icon {
  color: var(--islamic-green);
}
```

```jsx
<Kaaba className="icon" size={48} variant="outline" />
```

## Sizing

### Fixed Size

```jsx
<Kaaba size={24} />  // 24px
<Mosque size={48} /> // 48px
<Quran size={64} />  // 64px
```

### Responsive Size

```jsx
<Kaaba size="100%" />   // Fill container
<Mosque size="2rem" />  // CSS units
<Quran size="clamp(24px, 5vw, 48px)" />
```

### With Tailwind

```jsx
<Kaaba className="w-12 h-12" />  // 48px
<Mosque className="w-16 h-16" /> // 64px
```

## Stroke Width

For outline variants only:

```jsx
<Mosque 
  size={48} 
  variant="outline" 
  strokeWidth={1.5}  // Default: 2
/>

// Thin stroke
<Quran variant="outline" strokeWidth={1} />

// Thick stroke
<Kaaba variant="outline" strokeWidth={3} />
```

## Variants

### Fill

Solid filled icons:

```jsx
<Kaaba variant="fill" />
<Mosque variant="fill" color="#328460" />
```

### Outline

Stroke-only icons:

```jsx
<Kaaba variant="outline" />
<Mosque variant="outline" strokeWidth={2} />
```

### Color

Multi-color icons (pre-colored):

```jsx
<Kaaba variant="color" />
// Note: color prop ignored for color variants
```

### Original

Original source style:

```jsx
<Kaaba variant="original" />
// Preserves original artwork styling
```

## CSS Styling

### Custom Classes

```jsx
<Kaaba 
  className="custom-icon" 
  size={48} 
  variant="fill"
/>
```

```css
.custom-icon {
  color: #328460;
  transition: color 0.2s;
}

.custom-icon:hover {
  color: #73e0ae;
}
```

### Inline Styles

```jsx
<Kaaba 
  style={{ 
    color: '#328460',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
  }}
  size={48}
/>
```

## Animation

### CSS Animations

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.icon-animated {
  animation: pulse 2s ease-in-out infinite;
}
```

```jsx
<Kaaba className="icon-animated" size={48} />
```

### Rotation

```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.icon-rotate {
  animation: rotate 2s linear infinite;
}
```

### Scale on Hover

```css
.icon-hover {
  transition: transform 0.2s;
}

.icon-hover:hover {
  transform: scale(1.1);
}
```

## Responsive Design

### Breakpoints

```jsx
// Tailwind
<Kaaba className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />

// CSS
.icon-responsive {
  width: 32px;
  height: 32px;
}

@media (min-width: 768px) {
  .icon-responsive {
    width: 48px;
    height: 48px;
  }
}

@media (min-width: 1024px) {
  .icon-responsive {
    width: 64px;
    height: 64px;
  }
}
```

## Dark Mode

### Automatic

```jsx
// Tailwind dark mode
<Kaaba className="text-islamic-green dark:text-islamic-green-light" />
```

### Manual

```jsx
import { useTheme } from './theme';

function ThemedIcon() {
  const { theme } = useTheme();
  
  return (
    <Kaaba 
      color={theme === 'dark' ? '#73e0ae' : '#328460'}
      size={48}
      variant="outline"
    />
  );
}
```

### CSS Variables

```css
:root {
  --icon-color: #328460;
}

[data-theme="dark"] {
  --icon-color: #73e0ae;
}

.icon {
  color: var(--icon-color);
}
```

## Accessibility

### High Contrast

```css
@media (prefers-contrast: high) {
  .icon {
    color: #000;
    stroke-width: 2.5;
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .icon-animated {
    animation: none;
  }
}
```

Next: [Advanced Topics](/docs/advanced)

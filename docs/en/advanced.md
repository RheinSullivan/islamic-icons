# Advanced Topics

## TypeScript

### Type Definitions

Islamic Icons includes full TypeScript support:

```typescript
import { Kaaba, type IconProps } from 'islamic-icons/react';

// All props are typed
const props: IconProps = {
  size: 48,
  variant: 'fill',
  color: '#328460',
  className: 'icon',
  strokeWidth: 2
};

function Icon() {
  return <Kaaba {...props} />;
}
```

### Icon Component Type

```typescript
import type { ComponentType } from 'react';
import type { IconProps } from 'islamic-icons/react';

type IconComponent = ComponentType<IconProps>;

function IconWrapper({ Icon }: { Icon: IconComponent }) {
  return <Icon size={48} variant="fill" />;
}
```

### Variant Types

```typescript
type IconVariant = 'fill' | 'outline' | 'color' | 'original';

const variant: IconVariant = 'fill'; // ✅
const invalid: IconVariant = 'solid'; // ❌ Type error
```

## Global Styling

### CSS Custom Properties

```css
/* global.css */
:root {
  --islamic-icon-size: 24px;
  --islamic-icon-color: #328460;
  --islamic-icon-stroke: 2;
}

.islamic-icon {
  width: var(--islamic-icon-size);
  height: var(--islamic-icon-size);
  color: var(--islamic-icon-color);
  stroke-width: var(--islamic-icon-stroke);
}
```

### Theme Provider (React)

```tsx
import { createContext, useContext } from 'react';

const IconContext = createContext({
  size: 24,
  variant: 'fill' as const,
  color: '#328460'
});

export function IconProvider({ children, ...config }) {
  return (
    <IconContext.Provider value={config}>
      {children}
    </IconContext.Provider>
  );
}

export function useIconConfig() {
  return useContext(IconContext);
}

// Usage
function App() {
  return (
    <IconProvider size={48} variant="outline">
      <Kaaba /> {/* Uses context defaults */}
    </IconProvider>
  );
}
```

## With Lucide Lab

Islamic Icons is designed to work alongside other icon libraries:

```jsx
import { Kaaba } from 'islamic-icons/react';
import { Home, User } from 'lucide-react';

function App() {
  return (
    <nav>
      <Home size={24} />
      <User size={24} />
      <Kaaba size={24} variant="fill" />
    </nav>
  );
}
```

## Filled Icons Strategy

Islamic Icons uses semantic naming for filled vs outline:

```jsx
// ❌ Don't create separate components
<KaabaFilled />
<KaabaOutline />

// ✅ Use variant prop
<Kaaba variant="fill" />
<Kaaba variant="outline" />
```

## Combining Icons

### Layered Icons

```jsx
function LayeredIcon() {
  return (
    <div className="relative inline-block">
      <Kaaba 
        size={48} 
        variant="fill" 
        color="#328460"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Star 
          size={24} 
          variant="fill" 
          color="#d7b66b"
        />
      </div>
    </div>
  );
}
```

### Icon Badges

```jsx
function IconWithBadge() {
  return (
    <div className="relative inline-block">
      <Mosque size={48} variant="outline" />
      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-islamic-green text-[10px] font-bold text-white">
        3
      </span>
    </div>
  );
}
```

## Performance Optimization

### Code Splitting

```jsx
import { lazy, Suspense } from 'react';

const Kaaba = lazy(() => 
  import('islamic-icons/react').then(mod => ({ default: mod.Kaaba }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Kaaba size={48} />
    </Suspense>
  );
}
```

### Dynamic Imports

```jsx
async function loadIcon(name: string) {
  const module = await import('islamic-icons/react');
  return module[name];
}

// Usage
const IconComponent = await loadIcon('Kaaba');
```

### Bundle Analysis

```bash
# Analyze what's bundled
npm install -D @next/bundle-analyzer

# Check icon bundle size
npm run build -- --analyze
```

## Server-Side Rendering

### Next.js App Router

```tsx
// app/page.tsx
import { Kaaba } from 'islamic-icons/react';

export default function Page() {
  return <Kaaba size={48} variant="fill" />;
}
```

### Next.js Pages Router

```tsx
// pages/index.tsx
import { Kaaba } from 'islamic-icons/react';

export default function Home() {
  return <Kaaba size={48} variant="fill" />;
}
```

### SvelteKit

```svelte
<!-- src/routes/+page.svelte -->
<script>
  import { Kaaba } from 'islamic-icons/svelte';
</script>

<Kaaba size={48} variant="fill" />
```

## Testing

### Jest / Vitest

```tsx
import { render } from '@testing-library/react';
import { Kaaba } from 'islamic-icons/react';

test('renders Kaaba icon', () => {
  const { container } = render(<Kaaba size={48} variant="fill" />);
  expect(container.querySelector('svg')).toBeInTheDocument();
});
```

### Mock Icons

```tsx
// __mocks__/islamic-icons/react.tsx
export const Kaaba = ({ size }: { size?: number }) => (
  <div data-testid="kaaba-icon" style={{ width: size, height: size }} />
);
```

## Custom Icon Wrapper

```tsx
import type { ComponentType } from 'react';
import type { IconProps } from 'islamic-icons/react';

interface CustomIconProps extends IconProps {
  label?: string;
  badge?: number;
}

function createIconWrapper(Icon: ComponentType<IconProps>) {
  return function CustomIcon({ label, badge, ...props }: CustomIconProps) {
    return (
      <div className="relative inline-flex flex-col items-center gap-1">
        <div className="relative">
          <Icon {...props} />
          {badge && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {badge}
            </span>
          )}
        </div>
        {label && <span className="text-xs">{label}</span>}
      </div>
    );
  };
}

// Usage
const KaabaWithLabel = createIconWrapper(Kaaba);
<KaabaWithLabel size={48} label="Kaaba" badge={5} />
```

## VSCode Integration

### IntelliSense

Islamic Icons provides full TypeScript definitions for autocomplete:

```tsx
import { Kaaba } from 'islamic-icons/react';

// Hover over Kaaba to see available props
// - size?: number | string
// - variant?: 'fill' | 'outline' | 'color' | 'original'
// - color?: string
// - etc.
```

### Snippets

Create `.vscode/islamic-icons.code-snippets`:

```json
{
  "Islamic Icon": {
    "prefix": "ii",
    "body": [
      "<${1:Kaaba} size={${2:48}} variant=\"${3:fill}\" />"
    ],
    "description": "Islamic Icons component"
  }
}
```

Next: [API Reference](/docs/api)

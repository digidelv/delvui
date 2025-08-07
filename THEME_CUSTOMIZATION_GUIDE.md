# DelvUI Theme Customization Guide

## 🎨 Complete Theme Control

DelvUI provides **granular control** over every single CSS property through our comprehensive token system. You can customize everything from border radius to hover states, just like PrimeNG/PrimeVue but across **all frameworks**.

## 📦 Token Architecture

### Granular Button Tokens

Every Button property is customizable via tokens:

```typescript
// Access any button property
button.root.borderRadius                    // --delvui-button-border-radius
button.root.roundedBorderRadius            // --delvui-button-rounded-border-radius
button.root.paddingX                       // --delvui-button-padding-x
button.root.paddingY                       // --delvui-button-padding-y
button.root.primary.background             // --delvui-button-primary-background
button.root.primary.hoverBackground        // --delvui-button-primary-hover-background
button.root.primary.focusRing.shadow       // --delvui-button-primary-focus-ring-shadow
button.outlined.primary.borderColor        // --delvui-button-outlined-primary-border-color
button.text.danger.hoverBackground         // --delvui-button-text-danger-hover-background
```

### Token Structure

```typescript
interface ButtonTokens {
  root: {
    // Layout & Spacing
    borderRadius: string;
    roundedBorderRadius: string;
    gap: string;
    paddingX: string;
    paddingY: string;
    iconOnlyWidth: string;
    
    // Typography  
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    
    // Size variants (sm, md, lg, xl)
    sm: { fontSize, paddingX, paddingY, iconOnlyWidth, height, minWidth };
    md: { fontSize, paddingX, paddingY, iconOnlyWidth, height, minWidth };
    lg: { fontSize, paddingX, paddingY, iconOnlyWidth, height, minWidth };
    xl: { fontSize, paddingX, paddingY, iconOnlyWidth, height, minWidth };
    
    // Effects
    raisedShadow: string;
    hoverShadow: string;
    activeShadow: string;
    
    // Focus ring
    focusRing: { width, style, offset };
    
    // Transitions
    transitionDuration: string;
    transitionTimingFunction: string;
    
    // All variants (primary, secondary, success, info, warning, danger, help, contrast)
    primary: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      focusBackground: string;
      disabledBackground: string;
      
      borderColor: string;
      hoverBorderColor: string;
      activeBorderColor: string;
      focusBorderColor: string;
      disabledBorderColor: string;
      
      color: string;
      hoverColor: string;
      activeColor: string;
      focusColor: string;
      disabledColor: string;
      
      focusRing: { color, shadow };
    };
    // ... all other variants
  };
  
  // Outlined variants
  outlined: {
    primary: { background, hoverBackground, activeBackground, borderColor, color, etc... };
    secondary: { ... };
    // ... all variants
  };
  
  // Text/Ghost variants  
  text: {
    primary: { background, hoverBackground, color, hoverColor, etc... };
    // ... all variants
  };
  
  // Link variant
  link: { color, hoverColor, textDecoration, etc... };
  
  // Icon & Loading tokens
  icon: { size, sm: {size}, md: {size}, lg: {size}, xl: {size} };
  loading: { size, color, sm: {size}, etc... };
}
```

## 🎛️ CLI Theme Tools

### Generate Themes

```bash
# Generate from preset
delv theme generate --preset material --format css
delv theme gen --preset apple --framework react --output ./src/theme

# Interactive generation
delv theme generate --interactive

# All formats
delv theme gen --preset dark --format css     # CSS variables
delv theme gen --preset dark --format scss    # SCSS variables  
delv theme gen --preset dark --format js      # JavaScript tokens
delv theme gen --preset dark --format ts      # TypeScript tokens
delv theme gen --preset dark --format json    # JSON tokens
```

### Customize Themes Interactively

```bash
# Interactive customization wizard
delv theme customize --preset default

# Custom theme from existing
delv theme custom --preset material --output ./themes/my-theme
```

### List Available Presets

```bash
delv theme list
```

**Available Presets:**
- `default` - Modern DelvUI default theme
- `dark` - Dark mode variant  
- `material` - Material Design 3 inspired
- `apple` - iOS/Apple HIG inspired
- `bootstrap` - Bootstrap 5 familiar styling
- `chakra` - Chakra UI smooth animations

### Preview Themes

```bash
# Preview in browser
delv theme preview --preset dark
delv theme preview --preset material
```

### Build & Deploy

```bash
# Build optimized theme
delv theme build --minify --output ./dist/theme

# Watch for changes
delv theme watch

# Validate theme config
delv theme validate --customizations ./theme.config.js
```

## 🎨 Theme Usage Examples

### 1. CSS Variables (Direct)

```css
:root {
  /* Override any button property */
  --delvui-button-border-radius: 12px;
  --delvui-button-primary-background: #7c3aed;
  --delvui-button-primary-hover-background: #6d28d9;
  --delvui-button-padding-x: 1.5rem;
  --delvui-button-lg-font-size: 1.125rem;
  --delvui-button-focus-ring-width: 3px;
  --delvui-button-transition-duration: 300ms;
}
```

### 2. React Theme Provider

```tsx
import { DelvUIProvider } from '@delvui/react';
import { createTheme } from '@delvui/tokens';

// Create custom theme
const myTheme = createTheme('default', {
  components: {
    button: {
      root: {
        borderRadius: '12px',
        primary: {
          background: '#7c3aed',
          hoverBackground: '#6d28d9',
        },
        lg: {
          fontSize: '1.125rem',
          paddingX: '1.5rem',
        },
      },
    },
  },
});

function App() {
  return (
    <DelvUIProvider theme={myTheme}>
      <Button variant="primary" size="lg">Custom Button</Button>
    </DelvUIProvider>
  );
}
```

### 3. Vue Theme Configuration

```vue
<template>
  <DelvUIProvider :theme="customTheme">
    <Button variant="primary" size="lg">Custom Button</Button>
  </DelvUIProvider>
</template>

<script setup>
import { DelvUIProvider, Button } from '@delvui/vue';
import { createTheme } from '@delvui/tokens';

const customTheme = createTheme('material', {
  components: {
    button: {
      root: {
        borderRadius: '16px', // More rounded for Material
        raisedShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transitionDuration: '300ms',
        
        primary: {
          background: '#4caf50', // Material Green
          hoverBackground: '#43a047',
        },
      },
    },
  },
});
</script>
```

### 4. Angular Theme Service

```typescript
// theme.service.ts
import { Injectable } from '@angular/core';
import { createTheme, applyThemePreset } from '@delvui/tokens';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = createTheme('default', {});

  setTheme(preset: string, customizations?: any) {
    this.currentTheme = createTheme(preset, customizations);
    this.applyThemeToDOM();
  }

  customizeButton(overrides: any) {
    this.currentTheme = createTheme(this.currentTheme, {
      components: {
        button: overrides,
      },
    });
    this.applyThemeToDOM();
  }

  private applyThemeToDOM() {
    const cssVars = generateCSSVariables(this.currentTheme);
    Object.entries(cssVars).forEach(([property, value]) => {
      document.documentElement.style.setProperty(`--${property}`, value);
    });
  }
}
```

## 🎯 Preset Customization Examples

### Material Design Button

```javascript
// theme.config.js
module.exports = {
  name: 'Material Design',
  extends: 'default',
  
  components: {
    button: {
      root: {
        borderRadius: '16px',
        raisedShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14)',
        hoverShadow: '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14)',
        transitionDuration: '300ms',
        
        label: {
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.025em',
        },
        
        primary: {
          background: '#4caf50',
          hoverBackground: '#43a047',
          activeBackground: '#388e3c',
        },
      },
    },
  },
};
```

### iOS/Apple Style Button

```javascript
// apple-theme.config.js
module.exports = {
  name: 'Apple Design',
  extends: 'default',
  
  components: {
    button: {
      root: {
        borderRadius: '8px',
        fontWeight: '600',
        transitionDuration: '150ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        
        label: {
          fontWeight: '600',
          letterSpacing: '-0.01em',
        },
        
        sm: {
          fontSize: '0.8125rem',
          height: '1.875rem',
        },
        
        primary: {
          background: '#007AFF',
          hoverBackground: '#0056b3',
        },
      },
    },
  },
};
```

### Bootstrap Familiar Button

```javascript
// bootstrap-theme.config.js
module.exports = {
  name: 'Bootstrap Style',
  extends: 'default',
  
  components: {
    button: {
      root: {
        borderRadius: '0.25rem',
        fontWeight: '400',
        borderWidth: '1px',
        raisedShadow: 'none',
        hoverShadow: 'none',
        activeShadow: 'inset 0 3px 5px rgba(0, 0, 0, 0.125)',
        
        sm: {
          fontSize: '0.875rem',
          paddingX: '0.5rem',
          paddingY: '0.25rem',
          height: 'auto',
        },
        
        md: {
          fontSize: '1rem',
          paddingX: '0.75rem',
          paddingY: '0.375rem',
          height: 'auto',
        },
        
        focusRing: {
          width: '0.25rem',
          offset: '0',
        },
      },
    },
  },
};
```

## 🛠️ Advanced Customization

### Runtime Theme Switching

```typescript
// React example
function ThemeControls() {
  const [currentTheme, setCurrentTheme] = useState('default');
  
  const switchTheme = (preset: string) => {
    const theme = createTheme(preset, {
      // Add runtime customizations
      components: {
        button: {
          root: {
            borderRadius: preset === 'material' ? '16px' : '8px',
            transitionDuration: preset === 'apple' ? '150ms' : '200ms',
          },
        },
      },
    });
    
    setCurrentTheme(theme);
  };
  
  return (
    <div>
      <button onClick={() => switchTheme('default')}>Default</button>
      <button onClick={() => switchTheme('dark')}>Dark</button>
      <button onClick={() => switchTheme('material')}>Material</button>
      <button onClick={() => switchTheme('apple')}>Apple</button>
    </div>
  );
}
```

### Dynamic Token Updates

```javascript
// Update specific tokens at runtime
function updateButtonStyle(property, value) {
  document.documentElement.style.setProperty(
    `--delvui-button-${property.replace(/\./g, '-')}`, 
    value
  );
}

// Examples
updateButtonStyle('root.borderRadius', '20px');
updateButtonStyle('root.primary.background', '#ff6b6b');
updateButtonStyle('root.lg.paddingX', '2rem');
updateButtonStyle('outlined.secondary.hoverBackground', '#f0f0f0');
```

### Component-Specific Overrides

```scss
// SCSS with component-specific overrides
.my-special-button {
  // Override specific tokens for this instance
  --delvui-button-border-radius: 50px;
  --delvui-button-primary-background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  --delvui-button-primary-hover-background: linear-gradient(45deg, #ff5252, #26a69a);
  --delvui-button-padding-x: 2rem;
  --delvui-button-transition-duration: 400ms;
  --delvui-button-hover-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```

## 📋 Token Reference

### Complete Button Token List

**Layout & Spacing:**
- `button.root.borderRadius`
- `button.root.roundedBorderRadius`
- `button.root.gap`
- `button.root.paddingX`
- `button.root.paddingY`
- `button.root.iconOnlyWidth`

**Size Variants (sm/md/lg/xl):**
- `button.root.{size}.fontSize`
- `button.root.{size}.paddingX`
- `button.root.{size}.paddingY`
- `button.root.{size}.iconOnlyWidth`
- `button.root.{size}.height`
- `button.root.{size}.minWidth`

**Typography:**
- `button.root.fontSize`
- `button.root.fontWeight`
- `button.root.lineHeight`
- `button.root.label.fontWeight`
- `button.root.label.letterSpacing`
- `button.root.label.textTransform`

**Effects & Shadows:**
- `button.root.raisedShadow`
- `button.root.hoverShadow`
- `button.root.activeShadow`

**Focus Ring:**
- `button.root.focusRing.width`
- `button.root.focusRing.style`
- `button.root.focusRing.offset`

**Transitions:**
- `button.root.transitionDuration`
- `button.root.transitionTimingFunction`

**Variant States (for each variant: primary, secondary, success, info, warning, danger, help, contrast):**
- `button.root.{variant}.background`
- `button.root.{variant}.hoverBackground`
- `button.root.{variant}.activeBackground`
- `button.root.{variant}.focusBackground`
- `button.root.{variant}.disabledBackground`
- `button.root.{variant}.borderColor`
- `button.root.{variant}.hoverBorderColor`
- `button.root.{variant}.activeBorderColor`
- `button.root.{variant}.focusBorderColor`
- `button.root.{variant}.disabledBorderColor`
- `button.root.{variant}.color`
- `button.root.{variant}.hoverColor`
- `button.root.{variant}.activeColor`
- `button.root.{variant}.focusColor`
- `button.root.{variant}.disabledColor`
- `button.root.{variant}.focusRing.color`
- `button.root.{variant}.focusRing.shadow`

**Outlined Variants:**
- `button.outlined.{variant}.background`
- `button.outlined.{variant}.hoverBackground`
- `button.outlined.{variant}.activeBackground`
- `button.outlined.{variant}.borderColor`
- `button.outlined.{variant}.color`
- `button.outlined.{variant}.hoverColor`

**Text/Ghost Variants:**
- `button.text.{variant}.background`
- `button.text.{variant}.hoverBackground`
- `button.text.{variant}.activeBackground`
- `button.text.{variant}.color`
- `button.text.{variant}.hoverColor`

**Link Variant:**
- `button.link.color`
- `button.link.hoverColor`
- `button.link.activeColor`
- `button.link.textDecoration`
- `button.link.hoverTextDecoration`

## 🚀 Get Started

1. **Install DelvUI CLI:**
   ```bash
   npm install -g @delvui/cli
   ```

2. **Generate your first custom theme:**
   ```bash
   delv theme generate --interactive
   ```

3. **Preview themes:**
   ```bash
   delv theme preview --preset material
   ```

4. **Customize everything:**
   ```bash
   delv theme customize --preset default
   ```

Now you have **complete control** over every CSS property in your design system, with the flexibility to create unlimited theme variations while maintaining consistency across all frameworks!

---

*Every single pixel is customizable. Every state, every variant, every property - all through our comprehensive token system.*
# @delvui/angular

Angular components for the DelvUI design system.

## Installation

```bash
npm install @delvui/angular
```

## Usage

```typescript
// app.module.ts
import { ButtonModule, IconModule, SpinnerModule } from '@delvui/angular';

@NgModule({
  imports: [
    ButtonModule,
    IconModule,
    SpinnerModule
  ],
  // ...
})
export class AppModule { }
```

```html
<!-- your.component.html -->
<delv-button variant="primary" size="md">Click me</delv-button>
<delv-icon name="heart" size="md"></delv-icon>
<delv-spinner size="md"></delv-spinner>
```

## Components

- **ButtonComponent** - Interactive button with multiple variants
- **IconComponent** - Scalable SVG icons
- **SpinnerComponent** - Loading indicators

## Angular Version Support

- Angular 16+ (recommended)
- Angular 15+ (with compatibility)

## Documentation

Visit [https://delvui.dev](https://delvui.dev) for complete documentation.

## License

MIT
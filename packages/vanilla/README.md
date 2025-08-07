# @delvui/vanilla

Vanilla JavaScript Web Components for the DelvUI design system.

## Installation

```bash
npm install @delvui/vanilla
```

## Usage

```html
<!-- Import the components -->
<script type="module">
  import { Button, Icon, Spinner } from '@delvui/vanilla';
</script>

<!-- Use the web components -->
<delv-button variant="primary" size="md">Click me</delv-button>
<delv-icon name="heart" size="md"></delv-icon>
<delv-spinner size="md"></delv-spinner>
```

### With bundlers

```javascript
import { Button, Icon, Spinner } from '@delvui/vanilla';

// Components are automatically registered as custom elements
const button = document.createElement('delv-button');
button.setAttribute('variant', 'primary');
button.textContent = 'Click me';
document.body.appendChild(button);
```

## Components

- **Button** - Interactive button as a Web Component
- **Icon** - Scalable SVG icons as Web Components  
- **Spinner** - Loading indicators as Web Components

## Browser Support

- All modern browsers that support Web Components
- Custom Elements v1
- Shadow DOM v1

## Documentation

Visit [https://delvui.dev](https://delvui.dev) for complete documentation.

## License

MIT
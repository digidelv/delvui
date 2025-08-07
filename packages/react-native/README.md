# @delvui/react-native

React Native components for the DelvUI design system.

## Installation

```bash
npm install @delvui/react-native
```

## Usage

```jsx
import React from 'react';
import { View } from 'react-native';
import { Button, Icon, ThemeProvider } from '@delvui/react-native';

export default function App() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1, padding: 20 }}>
        <Button variant="primary" size="md">
          Click me
        </Button>
        <Icon name="heart" size={24} color="#ff0000" />
      </View>
    </ThemeProvider>
  );
}
```

## Components

- **Button** - Touch-optimized button for mobile
- **Icon** - Scalable mobile-friendly icons
- **ThemeProvider** - Theme context for dark/light modes

## Platform Support

- iOS
- Android
- Expo

## Documentation

Visit [https://delvui.dev](https://delvui.dev) for complete documentation.

## License

MIT
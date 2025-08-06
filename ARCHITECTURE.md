# DelvUI Design System Architecture

## 📁 Project Structure

```
delvui/
├── frameworks/                     # Framework-specific implementations
│   ├── react/                     # React implementation
│   ├── vue/                       # Vue implementation  
│   ├── angular/                   # Angular implementation
│   ├── react-native/              # React Native implementation
│   └── vanilla/                   # Vanilla JS implementation
├── showcase/                      # Showcase applications
│   ├── web/                       # Web showcase
│   ├── mobile/                    # Mobile showcase
│   └── docs/                      # Documentation site
├── builder/                       # Visual builder system
│   ├── core/                      # Builder core logic
│   ├── ui/                        # Builder UI components
│   └── plugins/                   # Builder plugins
├── packages/                      # Core packages
│   ├── core/                      # Atomic design types
│   ├── tokens/                    # Design tokens
│   └── cli/                       # CLI tools
└── tools/                         # Development tools
    ├── build/                     # Build scripts
    ├── test/                      # Testing utilities
    └── scripts/                   # Utility scripts
```

## 🧬 Atomic Design Architecture

### Atoms (Level 1)
- **Button**: Interactive button component
- **Input**: Text input field
- **Icon**: Scalable icon component
- **Badge**: Status indicator
- **Avatar**: User profile image
- **Spinner**: Loading indicator

### Molecules (Level 2)
- **SearchBox**: Search input + button
- **FormField**: Label + input + validation
- **Card**: Content container
- **Toast**: Notification message
- **Pagination**: Page navigation

### Organisms (Level 3)
- **Header**: Site navigation
- **DataTable**: Complex data table
- **ContactForm**: Form with validation
- **ProductCard**: Product display
- **UserProfile**: User information

### Templates (Level 4)
- **DashboardTemplate**: Dashboard layout
- **LandingTemplate**: Landing page layout
- **AuthTemplate**: Authentication layout

### Pages (Level 5)
- **HomePage**: Complete home page
- **LoginPage**: Login page
- **DashboardPage**: Dashboard page

## 🎨 Design Token System

- **Colors**: Brand, semantic, extended palettes
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent spacing scale
- **Motion**: Animation curves and durations
- **Shadows**: Elevation system
- **Borders**: Border styles and radii

## 🏗️ Builder System

- **Visual Editor**: Drag & drop interface
- **Component Library**: Available components
- **Property Panel**: Component configuration
- **Code Generator**: Export to framework code
- **Theme Builder**: Custom theme creation
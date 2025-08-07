# @delvui/cli

Command-line interface for the DelvUI design system.

## Installation

```bash
# Install globally
npm install -g @delvui/cli

# Or use npx
npx @delvui/cli --help
```

## Usage

### Initialize a new project

```bash
delvui init my-project
# or
delv init my-project
```

### Generate components

```bash
# Generate an atom
delvui generate atom MyButton --framework react --tests --stories

# Generate a molecule
delvui generate molecule SearchBox --framework vue --tests

# Generate an organism
delvui generate organism DataTable --framework angular --tests --stories --docs
```

### Available commands

- `delvui init <name>` - Initialize a new project
- `delvui generate <type> <name>` - Generate atomic design components
- `delvui add <component>` - Add components to existing project
- `delvui update` - Update DelvUI packages
- `delvui build` - Build design system assets
- `delvui serve` - Serve component documentation
- `delvui doctor` - Check project health

## Supported Frameworks

- React (with TypeScript)
- Vue (2 & 3 with TypeScript)
- Angular (with TypeScript)
- React Native (with TypeScript)
- Vanilla JavaScript/TypeScript

## Documentation

Visit [https://delvui.dev](https://delvui.dev) for complete documentation.

## License

MIT
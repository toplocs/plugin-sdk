# @toplocs/plugin-dev-sdk

Development SDK for TopLocs plugins that provides a comprehensive development environment for testing and debugging plugins.

## Features

- **Plugin Environment**: Interactive development environment with entity/page selection
- **Component Testing**: Test plugin components in isolation
- **Federation Support**: Test module federation loading
- **Hot Reload**: Development server with hot reload support
- **Tailwind CSS**: Pre-configured styling

## Installation

```bash
npm install @toplocs/plugin-dev-sdk
```

## Usage

```typescript
import { createPluginDevelopmentEnvironment } from '@toplocs/plugin-dev-sdk'
import '@toplocs/plugin-dev-sdk/style.css'

const app = createPluginDevelopmentEnvironment()
app.mount('#app')
```

## Components

- `PluginEnvironment` - Main development environment
- `DirectComponent` - Direct component renderer
- `PluginComponent` - Federated component loader
- `App` - Application wrapper

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Link for local development
npm link
```

## License

MIT
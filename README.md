# TopLocs Plugin Development SDK

[![npm version](https://img.shields.io/npm/v/@toplocs/plugin-dev-sdk)](https://www.npmjs.com/package/@toplocs/plugin-dev-sdk)
[![GitHub](https://img.shields.io/github/license/toplocs/plugin-dev-sdk)](https://github.com/toplocs/plugin-dev-sdk/blob/main/LICENSE)

A comprehensive development SDK for TopLocs plugins, providing an interactive development environment with Vue 3, TypeScript, and module federation support.

## 🚀 Features

- **🎯 Interactive Development Environment**: Entity/page selection with live component testing
- **⚡ Hot Reload**: Real-time development with instant updates
- **🧩 Module Federation**: Test federated plugin loading and component isolation
- **🎨 Tailwind CSS**: Pre-configured styling with full design system
- **📱 Responsive Design**: Mobile-first development environment
- **🔧 TypeScript**: Full type safety and IntelliSense support
- **🏗️ Entity/Page/Slot Architecture**: Support for TopLocs' plugin architecture

## 📦 Installation

### For New Plugins

```bash
# Install as dependency
npm install git+https://github.com/toplocs/plugin-dev-sdk.git

# Or with pnpm
pnpm add git+https://github.com/toplocs/plugin-dev-sdk.git
```

### For Plugin Development

```bash
# Clone and setup
git clone https://github.com/toplocs/plugin-dev-sdk.git
cd plugin-dev-sdk
npm install
npm run build
```

## 🎯 Quick Start

### Basic Usage

```typescript
// index.ts - Your plugin's development entry point
import { createPluginDevelopmentEnvironment, type PluginDevConfig } from '@toplocs/plugin-dev-sdk';
import '@toplocs/plugin-dev-sdk/style.css';

// Import your plugin configuration and components
import pluginConfig from './src/index';
import SidebarComponent from './src/views/info/Sidebar.vue';
import ContentComponent from './src/views/settings/Content.vue';

// Configure the development environment
const devConfig: PluginDevConfig = {
  pluginConfig,
  components: {
    Sidebar: SidebarComponent,
    Content: ContentComponent
  }
};

// Create and mount the development environment
const app = createPluginDevelopmentEnvironment(devConfig);
app.mount('#app');
```

### Plugin Configuration

Your plugin should export a configuration object:

```typescript
// src/index.ts - Plugin configuration
export interface BasePluginConfig {
  id: string;
  name: string;
  url: string;
  version?: string;
  description?: string;
  author?: string;
  slots: Array<PluginSlot>;
}

export interface PluginSlot {
  entity: 'Topic' | 'Location';    // Which entity type
  page: 'Info' | 'Settings';       // Which page within the entity  
  slot: 'Content' | 'Sidebar';     // Which slot on the page
  component: string;                // Component name to load
}

const pluginConfig: BasePluginConfig = {
  id: 'my_plugin',
  name: 'My Plugin',
  url: 'http://localhost:3006/assets/plugin.js',
  version: '1.0.0',
  description: 'Description of my plugin',
  author: 'Your Name',
  slots: [
    { entity: 'Topic', page: 'Info', slot: 'Sidebar', component: 'Sidebar' },
    { entity: 'Topic', page: 'Settings', slot: 'Content', component: 'Content' },
    { entity: 'Location', page: 'Info', slot: 'Sidebar', component: 'Sidebar' },
    { entity: 'Location', page: 'Settings', slot: 'Content', component: 'Content' }
  ]
};

export default pluginConfig;
```

## 🏗️ Development Environment Features

### Entity and Page Selection

The development environment provides:

- **Entity Selector**: Choose between Topic and Location entities
- **Page Tabs**: Switch between Info and Settings pages  
- **Slot Visualization**: See Content and Sidebar slots for each combination
- **Real-time Updates**: Changes reflect immediately

### Component Testing

- **Direct Component Testing**: Test components directly in development mode
- **Federation Testing**: Test module federation loading in preview mode
- **Slot Validation**: Visual indicators for provided vs. missing slots
- **Props Testing**: Pass dynamic props to components

### Development Modes

#### Development Mode (Hot Reload)
```bash
npm run dev
```
- Direct component imports from source
- Hot reload on file changes
- Instant feedback loop

#### Preview Mode (Federation)
```bash
npm run build && npm run preview
```
- Tests actual module federation
- Simulates production environment
- Validates federated component loading

## 🔧 API Reference

### `createPluginDevelopmentEnvironment(config?: PluginDevConfig)`

Creates a Vue application instance configured for plugin development.

**Parameters:**
- `config` (optional): Development configuration object

**Returns:** Vue application instance

### `PluginDevConfig`

Configuration interface for the development environment:

```typescript
interface PluginDevConfig {
  pluginConfig?: BasePluginConfig;     // Your plugin's configuration
  components?: Record<string, any>;    // Component map for direct rendering
  importPaths?: {                      // Custom import paths (future use)
    configPath?: string;
    sidebarPath?: string;
    contentPath?: string;
  };
}
```

### Components

#### `PluginEnvironment`
Main development interface with entity/page selection and component rendering.

#### `DirectComponent`  
Renders Vue components directly for development testing.

#### `PluginComponent`
Loads and renders federated components for integration testing.

## 🎨 Styling and Theming

The SDK includes Tailwind CSS with TopLocs design tokens:

```css
/* Pre-configured classes available */
.border-blue-600     /* TopLocs primary blue */
.text-gray-900       /* Primary text color */
.bg-green-100        /* Success background */
.text-green-800      /* Success text */
```

### Custom Styling

Import your own styles after the SDK styles:

```typescript
import '@toplocs/plugin-dev-sdk/style.css';
import './my-custom-styles.css';  // Your overrides
```

## 🚀 Integration with TopLocs

### Module Federation Setup

Your `vite.config.ts` should expose components for federation:

```typescript
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'my-plugin',
      filename: 'plugin.js',
      exposes: {
        './PluginConfig': './src/index.ts',
        './InfoSidebar': './src/views/info/Sidebar.vue',
        './SettingsContent': './src/views/settings/Content.vue',
      },
      shared: ['vue', 'vue-router']
    })
  ]
});
```

### Development Workflow

1. **Setup**: Install SDK and configure your plugin
2. **Develop**: Use hot reload mode for rapid iteration
3. **Test**: Switch to preview mode to test federation
4. **Integrate**: Test in actual TopLocs environment
5. **Deploy**: Build and deploy your plugin

## 📁 Project Structure

Recommended plugin structure when using the SDK:

```
my-plugin/
├── src/                        # Plugin source code
│   ├── components/            # Plugin components
│   ├── views/
│   │   ├── info/
│   │   │   └── Sidebar.vue   # Info page sidebar
│   │   └── settings/
│   │       └── Content.vue   # Settings page content
│   └── index.ts              # Plugin configuration
├── dev/                       # Development files (optional)
├── index.ts                   # Development entry point
├── index.html                 # Development HTML
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 🔧 Development Scripts

Add these scripts to your plugin's `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build", 
    "preview": "vite preview",
    "type-check": "vue-tsc --build --force",
    "lint": "eslint . --fix"
  }
}
```

## 🤝 Contributing

We welcome contributions to the TopLocs Plugin Development SDK!

### Development Setup

```bash
# Clone the repository
git clone https://github.com/toplocs/plugin-dev-sdk.git
cd plugin-dev-sdk

# Install dependencies
npm install

# Start development
npm run dev

# Build for testing
npm run build
```

### Contribution Guidelines

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

## 📝 Examples

### Link Plugin Example

See the [link-plugin](https://github.com/toplocs/link-plugin) for a complete example of SDK integration.

### Minimal Plugin Example

```typescript
// Minimal plugin setup
import { createPluginDevelopmentEnvironment } from '@toplocs/plugin-dev-sdk';
import '@toplocs/plugin-dev-sdk/style.css';

const app = createPluginDevelopmentEnvironment({
  pluginConfig: {
    id: 'simple_plugin',
    name: 'Simple Plugin',
    url: 'http://localhost:3006/assets/plugin.js',
    slots: [
      { entity: 'Topic', page: 'Info', slot: 'Sidebar', component: 'HelloWorld' }
    ]
  },
  components: {
    HelloWorld: { template: '<div>Hello from my plugin!</div>' }
  }
});

app.mount('#app');
```

## 🐛 Troubleshooting

### Common Issues

**Federation not working?**
- Ensure `@originjs/vite-plugin-federation` is installed in your plugin
- Check that components are properly exposed in vite.config.ts
- Verify the plugin URL is accessible

**Styles not loading?**
- Import SDK styles: `import '@toplocs/plugin-dev-sdk/style.css'`
- Check Tailwind configuration includes the SDK dist files

**TypeScript errors?**
- Ensure you're using the exported interfaces
- Check that component props are properly typed

### Debug Mode

Enable debug logging:

```typescript
// Add to your development setup
localStorage.setItem('toplocs-debug', 'true');
```

## 📚 Related Resources

- [TopLocs Documentation](https://toplocs.github.io/toplocs-workspace/)
- [Plugin Development Guide](https://github.com/toplocs/toplocs-workspace)
- [Module Federation Docs](https://module-federation.github.io/)
- [Vue 3 Documentation](https://vuejs.org/)

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🏷️ Changelog

### v1.0.0
- Initial release
- Vue 3 + TypeScript support
- Module federation integration
- Entity/page/slot architecture
- Tailwind CSS styling
- Hot reload development
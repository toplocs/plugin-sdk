# TopLocs Plugin SDK

> Official SDK for developing plugins for the TopLocs decentralized community platform

[![npm version](https://img.shields.io/npm/v/@toplocs/plugin-sdk.svg)](https://www.npmjs.com/package/@toplocs/plugin-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The TopLocs Plugin SDK provides a complete development environment for building, testing, and deploying plugins for the TopLocs platform. It includes hot module reloading, TypeScript support, and a visual development environment that simulates the TopLocs plugin system.

## 🚀 Features

- **🔥 Hot Module Reloading** - Instant feedback during development
- **🧩 Module Federation** - Production-ready plugin architecture
- **📦 TypeScript First** - Full type safety and IntelliSense support
- **🎨 Tailwind CSS** - Pre-configured styling system
- **🖼️ Visual Dev Environment** - See your plugin in context
- **🔧 Zero Config** - Works out of the box

## 📦 Installation

```bash
npm install @toplocs/plugin-sdk
# or
pnpm add @toplocs/plugin-sdk
# or
yarn add @toplocs/plugin-sdk
```

## 🏁 Quick Start

### 1. Create Your Plugin Structure

```typescript
// dev.ts
import { createPluginDevelopmentEnvironment } from '@toplocs/plugin-sdk';
import pluginConfig from './plugin.config';
import TopicContent from './components/TopicContent.vue';
import TopicSidebar from './components/TopicSidebar.vue';

const app = createPluginDevelopmentEnvironment({
  pluginConfig,
  components: {
    TopicContent,
    TopicSidebar
  }
});

app.mount('#app');
```

### 2. Define Plugin Configuration

```typescript
// plugin.config.ts
import type { BasePluginConfig } from '@toplocs/plugin-sdk';

const config: BasePluginConfig = {
  id: 'my-awesome-plugin',
  name: 'My Awesome Plugin',
  url: 'http://localhost:3006/assets/plugin.js',
  version: '1.0.0',
  description: 'Adds awesome features to TopLocs',
  author: 'Your Name',
  slots: [
    {
      entity: 'Topic',
      page: 'Info',
      slot: 'Content',
      component: 'TopicContent'
    },
    {
      entity: 'Topic',
      page: 'Info', 
      slot: 'Sidebar',
      component: 'TopicSidebar'
    }
  ]
};

export default config;
```

### 3. Configure Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'my-awesome-plugin',
      filename: 'plugin.js',
      exposes: {
        './TopicContent': './src/components/TopicContent.vue',
        './TopicSidebar': './src/components/TopicSidebar.vue'
      },
      shared: ['vue', 'vue-router']
    })
  ]
});
```

## 🏗️ Plugin Architecture

### Slot System

TopLocs plugins integrate into specific "slots" within the platform:

| Entity | Pages | Available Slots |
|--------|-------|----------------|
| Topic | Info, Settings | Content, Sidebar |
| Location | Info, Settings | Content, Sidebar |

### Component Props

Every plugin component receives standardized props:

```typescript
interface PluginComponentProps {
  parentId: string;      // ID of the parent entity (topic/location)
  query: LocationQuery;  // Route query parameters
}
```

### Example Component

```vue
<template>
  <div class="plugin-content">
    <h2>{{ title }}</h2>
    <p>Viewing {{ entityType }} with ID: {{ parentId }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  parentId: string;
  query: Record<string, any>;
}>();

const entityType = computed(() => 
  props.parentId.startsWith('topic-') ? 'Topic' : 'Location'
);

const title = computed(() => 
  `My Plugin - ${entityType.value}`
);
</script>
```

## 🛠️ Development Workflow

### Development Mode

```bash
npm run dev
```

- Starts development server with HMR
- Visual environment at `http://localhost:5173`
- Instant component updates
- Vue DevTools support

### Preview Mode

```bash
npm run build
npm run preview
```

- Tests production build
- Module Federation enabled
- Simulates real plugin loading

### Development Environment Features

The SDK provides a visual development environment with:

- **Entity Selector**: Switch between Topic/Location contexts
- **Page Navigation**: Test different page contexts (Info/Settings)
- **Slot Visualization**: See how your components fit
- **Live Reload**: Instant updates as you code

## 📚 API Reference

### Main Functions

#### `createPluginDevelopmentEnvironment(config)`

Creates a Vue application configured for plugin development.

```typescript
function createPluginDevelopmentEnvironment(config: PluginDevConfig): App<Element>
```

**Parameters:**
- `config.pluginConfig`: Your plugin configuration
- `config.components`: Map of component names to Vue components
- `config.importPaths`: (Optional) Custom import paths

**Returns:** Configured Vue application instance

### TypeScript Types

```typescript
export interface BasePluginConfig {
  id: string;
  name: string;
  url: string;
  version?: string;
  description?: string;
  author?: string;
  slots: PluginSlot[];
}

export interface PluginSlot {
  entity: 'Topic' | 'Location';
  page: 'Info' | 'Settings';
  slot: 'Content' | 'Sidebar';
  component: string;
}

export interface PluginDevConfig {
  pluginConfig?: BasePluginConfig;
  components?: Record<string, any>;
  importPaths?: {
    configPath?: string;
    sidebarPath?: string;
    contentPath?: string;
  };
}
```

### Exported Components

- `PluginEnvironment`: Main development environment component
- `DirectComponent`: Direct component renderer (dev mode)
- `PluginComponent`: Federation component loader (preview mode)

## 🎯 Best Practices

1. **Component Organization**
   ```
   src/
   ├── components/
   │   ├── TopicContent.vue
   │   ├── TopicSidebar.vue
   │   └── shared/
   ├── plugin.config.ts
   └── dev.ts
   ```

2. **State Management**
   - Use Vue 3 Composition API
   - Leverage `provide/inject` for plugin-wide state
   - Keep components self-contained

3. **Styling**
   - Use Tailwind classes for consistency
   - Scope custom styles to avoid conflicts
   - Follow TopLocs design system

4. **Performance**
   - Lazy load heavy components
   - Optimize bundle size
   - Use Vue's async components

## 🔧 Troubleshooting

### Common Issues

**Module Federation Errors**
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run build
```

**Type Errors**
```bash
# Ensure TypeScript is configured correctly
npm run type-check
```

**HMR Not Working**
- Check Vite config
- Ensure components are properly exported
- Verify dev server is running

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © TopLocs Team

## 🔗 Links

- [TopLocs Platform](https://github.com/toplocs/tribelike)
- [Plugin Examples](https://github.com/toplocs/demo-plugin)
- [Documentation](https://toplocs.github.io/toplocs-workspace/)
- [NPM Package](https://www.npmjs.com/package/@toplocs/plugin-sdk)

---

Made with ❤️ by the TopLocs team
// Main export for the plugin development SDK
export { default as createPluginDevelopmentEnvironment } from './main'
export { default as PluginEnvironment } from './components/PluginEnvironment.vue'
export { default as DirectComponent } from './components/DirectComponent.vue'
export { default as PluginComponent } from './components/PluginComponent.vue'
export { default as App } from './App.vue'

// Export types
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
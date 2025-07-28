// Main export for the plugin development SDK
export { default as createPluginDevelopmentEnvironment } from './main'
export { default as PluginEnvironment } from './components/PluginEnvironment.vue'
export { default as DirectComponent } from './components/DirectComponent.vue'
export { default as PluginComponent } from './components/PluginComponent.vue'
export { default as App } from './App.vue'

// Export info page components
export { 
  PluginInfoPage,
  PluginHeader,
  PluginSection,
  PluginFeatureGrid,
  PluginCodeBlock,
  PluginLinks
} from './components/info-page'

// Export types
export type { BasePluginConfig, PluginSlot, PluginDevConfig, FederationMethods } from './types'
export type { PluginInfoProps } from './components/info-page'
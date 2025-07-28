<template>
  <div class="plugin-info-page">
    <div class="container">
      <PluginHeader
        :title="pluginConfig.name"
        :subtitle="pluginConfig.description"
        :icon="icon"
        :status="status"
      />

      <PluginSection v-if="about" title="About">
        <p>{{ about }}</p>
        <PluginFeatureGrid v-if="features" :features="features" />
      </PluginSection>

      <PluginSection v-if="architecture" title="Architecture">
        <p>{{ architecture.description }}</p>
        <ul v-if="architecture.points">
          <li v-for="(point, index) in architecture.points" :key="index">
            <strong v-if="point.label">{{ point.label }}:</strong> {{ point.text }}
          </li>
        </ul>
      </PluginSection>

      <PluginSection title="Integration">
        <p>To use this plugin in your TopLocs instance, add it to your plugin configuration:</p>
        <PluginCodeBlock :code="integrationCode" />
        <div v-if="pluginConfig.slots && pluginConfig.slots.length > 0">
          <p>The plugin exposes components for the following slots:</p>
          <ul>
            <li v-for="slot in formattedSlots" :key="slot">
              <span class="highlight">{{ slot.path }}</span> - {{ slot.description }}
            </li>
          </ul>
        </div>
      </PluginSection>

      <PluginSection v-if="endpoints" title="Plugin Endpoints">
        <p>The plugin is served via GitHub Pages with the following key endpoints:</p>
        <ul>
          <li><strong>Plugin Entry:</strong> <span class="highlight">{{ endpoints.plugin }}</span></li>
          <li><strong>Landing Page:</strong> <span class="highlight">{{ endpoints.landing }}</span></li>
          <li v-if="endpoints.demo"><strong>Live Demo:</strong> <span class="highlight">{{ endpoints.demo }}</span></li>
        </ul>
      </PluginSection>

      <PluginSection v-if="development" title="Development">
        <div v-if="development.stack">
          <p>The {{ pluginConfig.name }} Plugin is built with:</p>
          <ul>
            <li v-for="tech in development.stack" :key="tech">{{ tech }}</li>
          </ul>
        </div>
        
        <div v-if="development.setup">
          <p>To run locally:</p>
          <PluginCodeBlock :code="development.setup" />
        </div>
        
        <div v-if="development.urls">
          <p><strong>Development URLs:</strong></p>
          <ul>
            <li v-for="url in development.urls" :key="url.label">
              {{ url.label }}: <span class="highlight">{{ url.url }}</span>
            </li>
          </ul>
        </div>
      </PluginSection>

      <PluginSection title="Resources">
        <PluginLinks :links="computedLinks" />
      </PluginSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BasePluginConfig } from '../../types'
import PluginHeader from './PluginHeader.vue'
import PluginSection from './PluginSection.vue'
import PluginFeatureGrid from './PluginFeatureGrid.vue'
import PluginCodeBlock from './PluginCodeBlock.vue'
import PluginLinks from './PluginLinks.vue'

export interface PluginInfoProps {
  pluginConfig: BasePluginConfig
  icon?: string
  status?: string
  about?: string
  features?: Array<{
    icon: string
    title: string
    description: string
  }>
  architecture?: {
    description: string
    points?: Array<{
      label?: string
      text: string
    }>
  }
  endpoints?: {
    plugin?: string
    landing?: string
    demo?: string
  }
  development?: {
    stack?: string[]
    setup?: string
    urls?: Array<{
      label: string
      url: string
    }>
  }
  slotDescriptions?: Record<string, string>
  links?: Array<{
    href: string
    label: string
    primary?: boolean
  }>
}

const props = withDefaults(defineProps<PluginInfoProps>(), {
  icon: '🔌'
})

const defaultLinks = computed(() => [
  { href: `https://github.com/toplocs/${props.pluginConfig.id.replace(/_/g, '-')}`, label: 'GitHub Repository', primary: true },
  { href: 'https://github.com/toplocs/tribelike', label: 'TopLocs Platform' },
  { href: 'https://toplocs.github.io/toplocs-workspace/', label: 'Documentation' }
])

const computedLinks = computed(() => props.links || defaultLinks.value)

const integrationCode = computed(() => {
  return JSON.stringify({
    id: props.pluginConfig.id,
    name: props.pluginConfig.name,
    url: props.endpoints?.plugin || props.pluginConfig.url,
    version: props.pluginConfig.version || '1.0.0',
    description: props.pluginConfig.description,
    author: props.pluginConfig.author || 'TopLocs Team'
  }, null, 2)
})

const formattedSlots = computed(() => {
  if (!props.pluginConfig.slots) return []
  
  const uniqueSlots = new Map()
  props.pluginConfig.slots.forEach(slot => {
    const path = `${slot.page}/${slot.slot}`
    if (!uniqueSlots.has(path)) {
      uniqueSlots.set(path, {
        path,
        description: props.slotDescriptions?.[`${slot.page}/${slot.slot}`] || `${slot.component} component`
      })
    }
  })
  
  return Array.from(uniqueSlots.values())
})
</script>

<style scoped>
.plugin-info-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

ul {
  margin-left: 2rem;
  margin-top: 0.5rem;
}

.highlight {
  background: #e8f4ff;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
}

@media (max-width: 600px) {
  .container {
    padding: 1rem;
  }
}
</style>
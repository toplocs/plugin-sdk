<template>
  <header class="plugin-header">
    <h1>{{ icon }} TopLocs {{ title }} Plugin</h1>
    <p class="subtitle">{{ subtitle }}</p>
    <span v-if="status" class="status-badge" :class="statusClass">{{ status }}</span>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  subtitle?: string
  icon?: string
  status?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '🔌'
})

const statusClass = computed(() => {
  if (!props.status) return ''
  
  const statusLower = props.status.toLowerCase()
  if (statusLower.includes('federated') || statusLower.includes('modern')) return 'status-modern'
  if (statusLower.includes('hybrid')) return 'status-hybrid'
  if (statusLower.includes('legacy')) return 'status-legacy'
  return ''
})
</script>

<style scoped>
.plugin-header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.status-modern {
  background: #27ae60;
}

.status-hybrid {
  background: #f39c12;
}

.status-legacy {
  background: #95a5a6;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
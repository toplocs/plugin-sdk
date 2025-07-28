<template>
  <div class="feature-grid">
    <div v-for="feature in features" :key="feature.title" class="feature">
      <h3>{{ feature.icon }} {{ feature.title }}</h3>
      <p>{{ feature.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

interface Props {
  features: Feature[]
}

defineProps<Props>()
</script>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.feature {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.feature h3 {
  color: #34495e;
  margin-bottom: 0.5rem;
}

.feature p {
  margin: 0;
  color: #666;
}
</style>
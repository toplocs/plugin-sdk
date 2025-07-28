<template>
  <div class="links">
    <a v-for="link in links" 
       :key="link.href" 
       :href="link.href" 
       :class="['link-button', { 'secondary': !link.primary }]"
       target="_blank"
       rel="noopener noreferrer">
      {{ link.label }}
    </a>
  </div>
</template>

<script setup lang="ts">
interface Link {
  href: string
  label: string
  primary?: boolean
}

interface Props {
  links: Link[]
}

defineProps<Props>()
</script>

<style scoped>
.links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.link-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.link-button:hover {
  background: #2980b9;
}

.link-button.secondary {
  background: #95a5a6;
}

.link-button.secondary:hover {
  background: #7f8c8d;
}
</style>
<template>
  <div class="code-block">
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
interface Props {
  code: string
}

defineProps<Props>()
</script>

<style scoped>
.code-block {
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-family: 'Courier New', monospace;
}

code {
  color: #333;
}
</style>
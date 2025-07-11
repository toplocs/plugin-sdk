<template>
  <Suspense>
    <template #default>
      <component
        v-if="RemoteComponent"
        :is="RemoteComponent"
        :parentId="route.params.id"
        :query="route.query"
      />
      <div v-else>
        <i class="text-sm text-gray-400">
          {{ plugin.name }} is not available
        </i>
      </div>
    </template>
    <template #fallback>
      <div>Loading remote component...</div>
    </template>
  </Suspense>
</template>

//
<script setup lang="ts">
// Federation methods will be loaded dynamically
const loadFederationMethods = async () => {
  try {
    const federation = await import('virtual:__federation__');
    return {
      getRemote: federation.__federation_method_getRemote,
      setRemote: federation.__federation_method_setRemote,
      unwrapModule: federation.__federation_method_unwrapDefault,
    };
  } catch (e) {
    console.warn('Federation not available, federation features will be disabled');
    return {
      getRemote: () => Promise.reject('Federation not available'),
      setRemote: () => {},
      unwrapModule: (x: any) => x,
    };
  }
};
import { onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  plugin: Object,
  position: String,
});
const route = useRoute();
const RemoteComponent = shallowRef();

const loadPlugin = async () => {
  try {
    const { getRemote, setRemote, unwrapModule } = await loadFederationMethods();
    const plugin = props.plugin;
    if (plugin) {
      setRemote(plugin.name, {
        url: () => Promise.resolve(plugin.url),
        format: 'esm',
        from: 'vite'
      });

      const module = await getRemote(plugin.name, `./${props.position}`);
      const component = await unwrapModule(module);

      RemoteComponent.value = component;
    }
  } catch (e) {
    console.error('Failed to load remote plugin:', e);

  }
};

onMounted(async () => {
  await loadPlugin();
});
</script>

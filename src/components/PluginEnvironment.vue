<template>
  <div class="p-4 max-w-6xl mx-auto">
    <div class="flex items-center justify-between border-b-2 border-blue-600 pb-2 mb-2">
      <h1 class="text-3xl font-bold text-gray-900">Plugin DevEnv</h1>
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Entity:</span>
          <select 
            v-model="selectedEntity" 
            class="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Topic">Topic</option>
            <option value="Location">Location</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Mode:</span>
          <span 
            class="px-3 py-1 rounded-full text-sm font-semibold"
            :class="isPreviewMode ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
          >
            {{ isPreviewMode ? 'Preview (Federation)' : 'Dev (Hot Reload)' }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Tab Bar -->
    <div class="mb-4">
      <div class="flex border-b border-gray-200">
        <button
          v-for="page in pages"
          :key="page"
          @click="selectedPage = page"
          class="px-4 py-2 text-sm font-medium transition-colors duration-200"
          :class="selectedPage === page 
            ? 'text-blue-600 border-b-2 border-blue-600' 
            : 'text-gray-500 hover:text-gray-700'"
        >
          {{ page }}
        </button>
      </div>
    </div>
    
    <!-- Selected Entity and Page Components -->
    <div class="mb-4">
      <div class="flex gap-8 min-h-96 overflow-x-auto">
        <div v-for="slot in slots" :key="`${selectedEntity}-${selectedPage}-${slot}`" 
             :class="slot === 'Content' ? 'flex-1 min-w-96' : 'w-72 min-w-72 flex-shrink-0'">

          <div class="border-2 rounded-lg p-4 bg-white min-h-72"
               :class="isSlotProvided(selectedEntity, selectedPage, slot) ? 'border-blue-600' : 'border-gray-300'">
            <!-- Slot is provided by plugin -->
            <template v-if="isSlotProvided(selectedEntity, selectedPage, slot)">
              <!-- Dev mode: Direct component rendering -->
              <DirectComponent
                v-if="getSlotComponent(selectedEntity, selectedPage, slot)"
                :component="getSlotComponent(selectedEntity, selectedPage, slot)"
                :parentId="selectedEntity.toLowerCase() + '-' + selectedPage.toLowerCase()"
              />
              <!-- Preview mode: Federated component via PluginComponent -->
              <PluginComponent 
                v-else
                :plugin="{name: 'link-plugin', url: 'http://localhost:3006/assets/plugin.js'}"
                :position="getSlotComponentName(selectedEntity, selectedPage, slot)"
                :parentId="selectedEntity.toLowerCase() + '-' + selectedPage.toLowerCase()"
              />
            </template>
            <!-- Slot is not provided by plugin -->
            <template v-else>
              <div class="flex items-center justify-center h-full text-gray-500">
                <div class="text-center">
                  <div class="text-lg font-medium mb-2">No Component</div>
                  <div class="text-sm">This slot is not provided by the plugin</div>
                  <div class="text-xs mt-1 text-gray-400">
                    {{ selectedEntity }} → {{ selectedPage }} → {{ slot }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-between border-b-2 border-blue-600 pb-2 mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Plugin Registry</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DirectComponent from './DirectComponent.vue';
import PluginComponent from './PluginComponent.vue';

// Federation will be loaded dynamically
let federationMethods: any = null;

const loadFederationMethods = async () => {
  if (federationMethods) return federationMethods;
  
  try {
    const federation = await import('virtual:__federation__');
    federationMethods = {
      getRemote: federation.__federation_method_getRemote,
      setRemote: federation.__federation_method_setRemote,
      unwrapModule: federation.__federation_method_unwrapDefault,
    };
    return federationMethods;
  } catch (e) {
    console.warn('Federation not available, federation features will be disabled');
    federationMethods = {
      getRemote: () => Promise.reject('Federation not available'),
      setRemote: () => {},
      unwrapModule: (x: any) => x,
    };
    return federationMethods;
  }
};

interface BasePluginConfig {
  id: string;
  name: string;
  url: string;
  version?: string;
  description?: string;
  author?: string;
  slots: Array<PluginSlot>;
}

interface PluginSlot {
  entity: 'Topic' | 'Location';
  page: 'Info' | 'Settings';
  slot: 'Content' | 'Sidebar';
  component: string;
}

// Props
const props = defineProps({
  devConfig: {
    type: Object,
    default: () => ({})
  }
});

// Mode detection
const isPreviewMode = ref(false);
const pluginConfig = ref<BasePluginConfig | null>(null);
const components = ref({});

// Slot structure constants
const pages = ['Info', 'Settings'];
const slots = ['Content', 'Sidebar'];

// State management for selected entity and page
const selectedEntity = ref('Topic');
const selectedPage = ref('Info');

const getSlotComponent = (entity: string, page: string, slot: string) => {
  if (!pluginConfig.value || isPreviewMode.value) return null;
  
  const matchingSlot = pluginConfig.value.slots.find(s => 
    s.entity === entity && s.page === page && s.slot === slot
  );
  
  if (!matchingSlot) return null;
  
  return components.value[matchingSlot.component];
};

const getSlotComponentName = (entity: string, page: string, slot: string) => {
  if (!pluginConfig.value) return '';
  
  const matchingSlot = pluginConfig.value.slots.find(s => 
    s.entity === entity && s.page === page && s.slot === slot
  );
  
  return matchingSlot ? matchingSlot.component : '';
};

const isSlotProvided = (entity: string, page: string, slot: string) => {
  if (!pluginConfig.value) return false;
  
  return pluginConfig.value.slots.some(s => 
    s.entity === entity && s.page === page && s.slot === slot
  );
};

// Check if preview mode (plugin server at 3006) is running
async function detectMode() {
  
  try {
    await fetch('http://localhost:3006/assets/plugin.js', {
      method: 'HEAD',
    });

    isPreviewMode.value = true;
  } catch {
    isPreviewMode.value = false;
  }
}

const loadPluginConfig = async (pluginUrl: string) => {
  try {
    const { getRemote, setRemote, unwrapModule } = await loadFederationMethods();
    
    setRemote('plugin', {
      url: () => Promise.resolve(pluginUrl),
      format: 'esm',
      from: 'vite'
    });

    const module = await getRemote('plugin', './PluginConfig');
    const component = await unwrapModule(module);
    return component;
  } catch (e) {
    console.error('Failed to load remote plugin config:', e);
  }
};

// Load plugin in appropriate mode
async function loadPlugin() {
  await detectMode();
  
  if (isPreviewMode.value) {
    pluginConfig.value = await loadPluginConfig('http://localhost:3006/assets/plugin.js');
  } else {
    console.log('Dev mode: Loading direct imports from ../src');
    await loadDirectImports();
  }
  console.log("Plugin Config: ", pluginConfig.value);
}

// Load components directly from source in dev mode
async function loadDirectImports() {
  try {
    // Use provided config and components from devConfig
    if (props.devConfig.pluginConfig) {
      pluginConfig.value = props.devConfig.pluginConfig;
    }
    
    if (props.devConfig.components) {
      components.value = props.devConfig.components;
    }
    
    console.log('Direct imports loaded from devConfig:', {
      pluginConfig: pluginConfig.value,
      components: Object.keys(components.value)
    });
  } catch (error) {
    console.error('Failed to load direct imports:', error);
  }
}

onMounted(() => {
  loadPlugin();
});

</script>
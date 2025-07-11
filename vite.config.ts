import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ command }) => {
  const isLib = command === 'build'
  
  return {
    plugins: [
      vue(),
      // Only use federation plugin when not building as library
      !isLib && federation({
        name: 'plugin-dev-sdk',
        filename: 'plugin-dev-sdk.js',
        exposes: {},
        shared: ['vue', 'vue-router']
      })
    ].filter(Boolean),
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'PluginDevSdk',
        fileName: 'index',
        formats: ['es', 'cjs']
      },
      rollupOptions: {
        external: ['vue', 'vue-router', 'virtual:__federation__', '@originjs/vite-plugin-federation'],
        output: {
          globals: {
            vue: 'Vue',
            'vue-router': 'VueRouter'
          }
        }
      },
      cssCodeSplit: false
    } : {},
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
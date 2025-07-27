import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import PluginEnvironment from './components/PluginEnvironment.vue';
import type { PluginDevConfig } from './types';
import './style.css';

function createPluginDevelopmentEnvironment(config: PluginDevConfig = {}) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: PluginEnvironment,
        props: {
          devConfig: config
        }
      },
      {
        path: '/:id',
        component: PluginEnvironment,
        props: route => ({
          devConfig: config,
          id: route.params.id
        })
      }
    ]
  });
  const app = createApp(App);
  app.use(router);
  
  // Provide the dev config globally
  app.provide('devConfig', config);
  
  return app;
};

export default createPluginDevelopmentEnvironment;
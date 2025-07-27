export interface BasePluginConfig {
  id: string;
  name: string;
  url: string;
  version?: string;
  description?: string;
  author?: string;
  slots: Array<PluginSlot>;
}

export interface PluginSlot {
  entity: 'Topic' | 'Location';
  page: 'Info' | 'Settings';
  slot: 'Content' | 'Sidebar';
  component: string;
}

export interface PluginDevConfig {
  pluginConfig?: BasePluginConfig;
  components?: Record<string, any>;
  importPaths?: {
    configPath?: string;
    sidebarPath?: string;
    contentPath?: string;
  };
}

export interface FederationMethods {
  getRemote: (name: string, path: string) => Promise<any>;
  setRemote: (name: string, config: any) => void;
  unwrapModule: (module: any) => any;
}
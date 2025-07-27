/// <reference types="vite/client" />

declare module 'virtual:__federation__' {
  export const __federation_method_getRemote: (name: string, path: string) => Promise<any>;
  export const __federation_method_setRemote: (name: string, config: any) => void;
  export const __federation_method_unwrapDefault: (module: any) => any;
}
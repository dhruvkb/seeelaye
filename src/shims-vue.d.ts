/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component

  import type { Binary } from '@/bins/type'
  export const binary: Binary
}

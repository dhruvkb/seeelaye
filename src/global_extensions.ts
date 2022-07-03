import type { Seeelaye } from '@/base/seeelaye'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $seeelaye: Seeelaye
  }
}

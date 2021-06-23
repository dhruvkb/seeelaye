import { Seeelaye } from '@/models/seeelaye'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $seeelaye: Seeelaye
  }
}

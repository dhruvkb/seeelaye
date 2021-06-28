import type { IArg } from '@/models/arg'

import { Seeelaye } from '@/base/seeelaye'

export interface BinaryOptions {
  command?: string
  description?: string
  argSpec?: {
    posArgs?: IArg[]
    kwArgs?: IArg[]
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $seeelaye: Seeelaye
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ComponentCustomOptions extends BinaryOptions {
  }
}

import type { IArg } from '@/models/arg'

import { Seeelaye } from '@/base/seeelaye'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $seeelaye: Seeelaye
  }

  export interface ComponentCustomOptions {
    command?: string
    description?: string
    argSpec?: {
      posArgs?: IArg[]
      kwArgs?: IArg[]
    }
  }
}

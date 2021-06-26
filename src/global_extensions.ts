import { Seeelaye } from '@/models/seeelaye'
import { IArg } from '@/models/arg'

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

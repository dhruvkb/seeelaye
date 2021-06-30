import type { IArg } from '@/models/arg'
import type { FsNode } from '@/models/fs_tree'

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
    node?: FsNode | null
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ComponentCustomOptions extends BinaryOptions {
  }
}

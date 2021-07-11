import type { NodeArg } from '@/models/arg'
import type { FsNode } from '@/models/fs_tree'

import { useSeeelaye } from '@/base/injection'

export interface IPathComposition {
  processNode: () => void
}

export const pathComposition = (nodeArg: NodeArg): IPathComposition => {
  const seeelaye = useSeeelaye()

  // Methods
  const processNode = () => {
    const node = seeelaye.compute<FsNode | null>('nodeLocatedAt', { path: nodeArg.value })
    if (node !== null) {
      nodeArg.setNode(node)
    }
  }

  return {
    processNode,
  }
}

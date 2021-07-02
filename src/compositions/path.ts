import type { IArg } from '@/models/arg'

import { useSeeelaye } from '@/base/injection'
import { FsNode, FsNodeType } from '@/models/fs_tree'

export interface IPathComposition {
  node: FsNode | null
  isNodeFound: boolean
}

type INodeArg = IArg<string> & { nodeType: FsNodeType }

export const pathComposition = (path: string, nodeArg: INodeArg): IPathComposition => {
  const seeelaye = useSeeelaye()

  const node = seeelaye.compute<FsNode | null>('nodeLocatedAt', { path })
  const isNodeFound = node !== null && node.isType(nodeArg.nodeType)

  return {
    node,
    isNodeFound,
  }
}

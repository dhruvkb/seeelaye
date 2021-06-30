import type { GetterTree } from 'vuex'

import type { FsNode } from '@/models/fs_tree'
import { specialNames } from '@/models/fs_tree'
import { TerminalState } from '@/store/state'

export interface TerminalGetterTree<S, RS> extends GetterTree<S, RS> {
  nodeLocatedAt(state: S): (payload: { path: string }) => FsNode | null
}

export const getGetters = <RS>(): TerminalGetterTree<TerminalState, RS> => ({
  nodeLocatedAt(state: TerminalState) {
    return (payload: { path: string }): FsNode | null => {
      const { path } = payload
      let node = state.currentNode

      const parts = path
        .replace(/\/+/g, '/')
        .split(/(?<=\/)/)
      for (let i = 0; i < parts.length; i += 1) {
        const part = parts[i]

        if (!node) return null

        if (i === 0 && state.tree?.hasName(part)) {
          node = state.tree
        } else if (specialNames.CURRENT_DIR.includes(part)) {
          // Do nothing as . refers to the current directory.
        } else if (specialNames.PARENT_DIR.includes(part)) {
          node = node.parent
        } else {
          node = node.children.find((child) => child.hasName(part)) ?? null
        }
      }

      return node
    }
  },
})

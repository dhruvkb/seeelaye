import { MutationTree } from 'vuex'

import { FsNode } from '@/models/fs_tree'
import { TerminalState } from '@/store/modules/terminal/state'

export interface TerminalMutationTree<S> extends MutationTree<S> {
  setTree(state: S, payload: { tree: FsNode }): void

  setCurrentNode(state: S, payload: { currentNode: FsNode }): void
}

export const mutations: TerminalMutationTree<TerminalState> = {
  setTree(state: TerminalState, payload: { tree: FsNode }) {
    state.tree = payload.tree
  },
  setCurrentNode(state: TerminalState, payload: { currentNode: FsNode }) {
    state.currentNode = payload.currentNode
  },
}

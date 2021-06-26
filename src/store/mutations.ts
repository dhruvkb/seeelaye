import { MutationTree } from 'vuex'

import { FsNode } from '@/models/fs_tree'
import { TerminalState } from '@/store/state'
import { Interaction } from '@/models/interaction'

export interface TerminalMutationTree<S> extends MutationTree<S> {
  setUsername(state: S, payload: { username: string }): void

  setHostname(state: S, payload: { hostname: string }): void

  setTree(state: S, payload: { tree: FsNode }): void

  setCurrentNode(state: S, payload: { currentNode: FsNode }): void

  setIsReady(state: S, payload: { isReady: boolean }): void

  pushInteraction(state: S, payload: { interaction: Interaction }): void

  hideInteractions(state: S): void
}

export const mutations: TerminalMutationTree<TerminalState> = {
  setUsername(state: TerminalState, payload: { username: string }) {
    state.username = payload.username
  },

  setHostname(state: TerminalState, payload: { hostname: string }) {
    state.hostname = payload.hostname
  },

  setTree(state: TerminalState, payload: { tree: FsNode }) {
    state.tree = payload.tree
  },

  setCurrentNode(state: TerminalState, payload: { currentNode: FsNode }) {
    state.currentNode = payload.currentNode
  },

  setIsReady(state: TerminalState, payload: { isReady: boolean }) {
    state.isReady = payload.isReady
  },

  pushInteraction(state: TerminalState, payload: { interaction: Interaction }) {
    state.history.push(payload.interaction)
  },

  hideInteractions(state: TerminalState) {
    state.history.forEach((interaction) => {
      interaction.hide()
    })
  },
}

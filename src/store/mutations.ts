import type { MutationTree } from 'vuex'

import type { FsNode } from '@/models/fs_tree'
import type { Interaction } from '@/models/interaction'
import type { TerminalState } from '@/store/state'

export interface TerminalMutationTree<S> extends MutationTree<S> {
  setUsername(state: S, payload: { username: string }): void

  setHostname(state: S, payload: { hostname: string }): void

  setTree(state: S, payload: { tree: FsNode }): void

  setCurrentNode(state: S, payload: { currentNode: FsNode }): void

  setIsReady(state: S, payload: { isReady: boolean }): void

  pushInteraction(state: S, payload: { interaction: Interaction }): void

  deleteInteractions(state: S): void

  hideInteractions(state: S): void

  setInput(state: S, payload: { input: string }): void
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

  deleteInteractions(state: TerminalState) {
    state.history = []
  },

  pushInteraction(state: TerminalState, payload: { interaction: Interaction }) {
    state.history.push(payload.interaction)
  },

  hideInteractions(state: TerminalState) {
    state.history.forEach((interaction) => {
      interaction.hide()
    })
  },

  setInput(state: TerminalState, payload: { input: string }) {
    state.input = payload.input
  },
}

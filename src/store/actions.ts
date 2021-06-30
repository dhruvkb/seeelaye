import type { ActionContext, ActionTree } from 'vuex'

import type { TerminalState } from '@/store/state'

import { Interaction } from '@/models/interaction'

export interface TerminalActionTree<S, RS> extends ActionTree<S, RS> {
  executeCmd(context: ActionContext<S, RS>, payload: { rawInput: string }): Promise<void>
}

export const getActions = <RS>(): TerminalActionTree<TerminalState, RS> => ({
  async executeCmd(context: ActionContext<TerminalState, RS>, payload: { rawInput: string }) {
    const { state, commit } = context
    const { rawInput } = payload

    // Guards
    if (!state.isReady) {
      console.error(`Command '${rawInput}' rejected as terminal is busy`)
      return
    }

    if (!state.currentNode) {
      console.error('Cannot determine working directory')
      return
    }

    const ctx = {
      wd: state.currentNode,
    }

    commit('setIsReady', { isReady: false })
    const interaction = new Interaction(ctx, rawInput)
    commit('pushInteraction', { interaction })
    interaction.processOutput()
  },
})

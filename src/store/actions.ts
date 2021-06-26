import { ActionContext, ActionTree } from 'vuex'
import { TerminalState } from '@/store/state'

import { Interaction } from '@/models/interaction'

export interface TerminalActionTree<S, RS> extends ActionTree<S, RS> {
  executeCmd(context: ActionContext<S, RS>, payload: { rawInput: string }): void
}

export const getActions = <RS>(): TerminalActionTree<TerminalState, RS> => ({
  executeCmd(context: ActionContext<TerminalState, RS>, payload: { rawInput: string }) {
    const { state, commit } = context
    if (!state.currentNode) {
      console.error('Cannot determine working directory')
      return
    }

    const { rawInput } = payload
    const ctx = {
      wd: state.currentNode,
    }

    if (!state.isReady) {
      console.error(`Command '${rawInput}' rejected as terminal is busy`)
      return
    }

    commit('setIsReady', { isReady: false })
    const interaction = new Interaction(ctx, rawInput)
    commit('pushInteraction', { interaction })
    interaction.processOutput()
  },
})

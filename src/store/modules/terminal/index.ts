import { Module } from 'vuex'

import { RootState } from '@/store/modules/state'

import { state, TerminalState } from '@/store/modules/terminal/state'
import { mutations } from '@/store/modules/terminal/mutations'

export const module: Module<TerminalState, RootState> = {
  namespaced: true,
  state,
  mutations,
}

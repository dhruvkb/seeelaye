import { Module } from 'vuex'

import { state, TerminalState } from '@/store/state'
import { mutations } from '@/store/mutations'

export const getVuexModule = <T>(): Module<TerminalState, T> => ({
  namespaced: true,
  state,
  mutations,
})

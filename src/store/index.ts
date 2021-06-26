import { Module } from 'vuex'

import { state, TerminalState } from '@/store/state'
import { mutations } from '@/store/mutations'
import { getActions } from '@/store/actions'

/**
 * Create and return a Vuex module that holds the state, mutations and actions
 * that are used by see·el·aye.
 */
export const getVuexModule = <RS>(): Module<TerminalState, RS> => ({
  namespaced: true,
  state,
  mutations,
  actions: getActions<RS>(),
})

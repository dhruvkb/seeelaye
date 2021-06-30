import type { Module } from 'vuex'

import type { TerminalState } from '@/store/state'

import { state } from '@/store/state'
import { getGetters } from '@/store/getters'
import { mutations } from '@/store/mutations'
import { getActions } from '@/store/actions'

/**
 * Create and return a Vuex module that holds the state, mutations and actions
 * that are used by see·el·aye.
 */
export const getVuexModule = <RS>(): Module<TerminalState, RS> => ({
  namespaced: true,
  state,
  getters: getGetters<RS>(),
  mutations,
  actions: getActions<RS>(),
})

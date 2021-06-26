import { createStore, createLogger } from 'vuex'
import { getVuexModule, TerminalState } from '../src'

interface RootState {
  terminal: TerminalState
}

const store = createStore<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createLogger(),
  ],
  modules: {
    terminal: getVuexModule<RootState>(),
  },
})

export default store

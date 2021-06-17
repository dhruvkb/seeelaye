import { createStore } from 'vuex'

import { RootState } from '@/store/modules/state'

import { module as terminal } from '@/store/modules/terminal/index'

const store = createStore<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    terminal,
  },
})

export default store

import { Seeelaye } from '../src'
import { root, a } from '../tests/fixtures/fs_tree.fix'

import store from './store'

const seeelaye = new Seeelaye(store, 'terminal')

seeelaye.commit('setTree', { tree: root })
seeelaye.commit('setCurrentNode', { currentNode: a })
seeelaye.commit('setIsReady', { isReady: true })

export default seeelaye

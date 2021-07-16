import { Seeelaye } from '../src'
import store from './store'

import { getTree } from '../tests/fixtures/fs_tree.fix'

const seeelaye = new Seeelaye(store, 'terminal')

const [root, a] = getTree()

seeelaye.commit('setTree', { tree: root })
seeelaye.commit('setCurrentNode', { currentNode: a })

export default seeelaye

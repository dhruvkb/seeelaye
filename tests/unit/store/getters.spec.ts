import { state, TerminalState } from '@/store/state'
import { getGetters, TerminalGetterTree } from '@/store/getters'
import { FsNode, FsNodeType } from '@/models/fs_tree'

interface RootState {
  term: TerminalState
}

describe('Vuex getters', () => {
  let termState: TerminalState

  let getters: TerminalGetterTree<TerminalState, RootState>

  let a: FsNode   // a
  let ab: FsNode  // ├── ab
  let abd: FsNode // │   └── abd
  let ac: FsNode  // └── ac

  beforeEach(() => {
    termState = state()

    a = new FsNode(FsNodeType.FOLDER, 'a', ['~'])
    ab = new FsNode(FsNodeType.FOLDER, 'ab')
    ab.parent = a
    a.children.push(ab)
    abd = new FsNode(FsNodeType.FOLDER, 'abd')
    abd.parent = ab
    ab.children.push(abd)
    ac = new FsNode(FsNodeType.FOLDER, 'ac')
    ac.parent = a
    a.children.push(ac)

    termState.tree = a
    termState.currentNode = ab

    getters = getGetters<RootState>()
  })

  describe('nodeLocatedAt', () => {
    let nodeLocatedAt: (payload: { path: string }) => FsNode | null

    beforeEach(() => {
      nodeLocatedAt = getters.nodeLocatedAt(termState)
    })

    it('gets node at relative path from current node', () => {
      expect(nodeLocatedAt({ path: 'abd' })).toEqual(abd)
    })

    it('resolves special names', () => {
      expect(nodeLocatedAt({ path: './abd' })).toEqual(abd)
      expect(nodeLocatedAt({ path: '../ac' })).toEqual(ac)
    })

    it('resolves root node at the start of the path', () => {
      expect(nodeLocatedAt({ path: '~/ac' })).toEqual(ac)
    })
  })
})

import { Component } from 'vue'

import { FsNode, FsNodeType, useSeeelaye } from '../src'

export const terminalContent = (): Component => ({
  setup() {
    const seeelaye = useSeeelaye()

    const root = new FsNode(FsNodeType.FOLDER, '~') // root/
    const a = new FsNode(FsNodeType.FOLDER, 'a')    // ├── a/
    const ab = new FsNode(FsNodeType.FILE, 'ab')    // │   └── ab
    const c = new FsNode(FsNodeType.FOLDER, 'c')    // └── c/

    a.parent = root
    root.children.push(a)
    ab.parent = a
    a.children.push(ab)
    c.parent = root
    root.children.push(c)

    seeelaye.commit('setTree', { tree: root })
    seeelaye.commit('setCurrentNode', { currentNode: a })
  },
  template: `
    <div class="terminal-content">
      <story/>
    </div>
  `,
})

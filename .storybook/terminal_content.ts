import { Component } from 'vue'

import { useSeeelaye, FsNode, FsNodeType } from '../src'

export const terminalContent = (): Component => ({
  setup() {
    const seeelaye = useSeeelaye()
    const root = new FsNode(FsNodeType.FOLDER, '~')
    seeelaye.commit('setTree', { tree: root })
    seeelaye.commit('setCurrentNode', { currentNode: root })
  },
  template: `
    <div class="terminal-content">
      <story/>
    </div>
  `,
})

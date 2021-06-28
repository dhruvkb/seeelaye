import type { FsNode } from '@/models/fs_tree'
import type { Interaction } from '@/models/interaction'

export interface TerminalState {
  username: string
  hostname: string

  tree: FsNode | null
  currentNode: FsNode | null

  history: Interaction[]
  isReady: boolean
}

export const state = (): TerminalState => ({
  username: 'guest',
  hostname: 'seeelaye',

  tree: null,
  currentNode: null,

  history: [] as Interaction[],
  isReady: true,
})

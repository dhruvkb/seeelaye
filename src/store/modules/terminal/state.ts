import { FsNode } from '@/models/fs_tree'

export interface TerminalState {
  username: string
  hostname: string

  currentNode: FsNode | null
  tree: FsNode | null

  history: Interaction[]
  isReady: boolean

  commandInput: string
}

export const state = (): TerminalState => ({
  username: 'guest',
  hostname: 'username',

  currentNode: null,
  tree: null,

  history: [] as Interaction[],
  isReady: true,

  commandInput: '',
})

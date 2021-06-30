import type { Handler } from 'arg'
import type { FsNodeType } from '@/models/fs_tree'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IArg<T = any> {
  name: string
  aliases?: string[]
  description: string

  type: Handler<T>
  default?: T

  nodeType?: FsNodeType
}

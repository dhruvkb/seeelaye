import type { Handler } from 'arg'

import type { Binary } from '@/bins/type'
import type { FsNodeType } from '@/models/fs_tree'

export enum ArgType {
  POSITIONAL = 'pos',
  KEYWORD = 'kw'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IArg<T = any> {
  name: string
  description: string
  aliases?: string[]
  isRequired?: boolean

  type: Handler<T>
  default?: T

  nodeType?: FsNodeType
}

export const argRepr = (arg: IArg, argType: ArgType): string => {
  let repr = arg.name
  // Prefix '--' before keyword arguments
  if (argType === ArgType.KEYWORD) {
    repr = `--${repr}`
  }
  // Suffix default value for non-Boolean values
  if (arg.type !== Boolean && arg.default) {
    repr = `${repr}='${arg.default}'`
  }
  // Depict all aliases with slashes
  if (arg.aliases) {
    arg.aliases.forEach((alias) => {
      repr = `${repr}/-${alias}`
    })
  }
  // Surround optional arguments with []
  if (!arg.isRequired) {
    repr = `[${repr}]`
  }

  return repr
}

export const allArgs = (binary: Binary): string[] => {
  const { argSpec } = binary
  const kwArgs = argSpec?.kwArgs ?? []
  const posArgs = argSpec?.posArgs ?? []

  return [
    ...kwArgs.map((arg) => argRepr(arg, ArgType.KEYWORD)),
    ...posArgs.map((arg) => argRepr(arg, ArgType.POSITIONAL)),
  ]
}

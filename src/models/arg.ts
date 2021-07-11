import type { FsNodeType, FsNode } from '@/models/fs_tree'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler<T = any> = (value: string) => T extends unknown ? any : T;

export enum ArgType {
  /**
   * A positional argument is identified by its position relative to other
   * arguments in the absence of a preceding keyword.
   */
  POSITIONAL = 'pos',
  /**
   * A keyword argument is identified by a keyword (the name or an alias) that
   * is specified before the argument value.
   */
  KEYWORD = 'kw'
}

/**
 * Represents an argument accepted by a binary.
 */
export class Arg<T> {
  /**
   * whether the argument is a positional argument or keyword argument
   */
  type: ArgType

  /**
   * the name of the argument; In the case of keyword arguments, values for this
   * argument should be passed with `--<name> <value>`.
   */
  name: string
  /**
   * the description for this argument; This is used in manual pages for this
   * command.
   */
  description: string

  /**
   * the function that will be invoked to parse the argument; All arguments are
   * read as strings so this function should accept a string and return the
   * data type of the argument `T`.
   */
  handler: Handler<T>
  /**
   * the default value of this argument; This value is used if an optional
   * argument is not passed a value. Not providing a default value marks the
   * argument as required.
   */
  defaultValue?: T
  /**
   * the value of this argument after parsing the argument vector
   */
  value!: T

  /**
   * a list of aliases for this argument; This only makes sense for keyword
   * arguments where `--<name>` can be replaced with `-<alias>`.
   */
  aliases: string[]

  /**
   * Create a new object of class `Arg`.
   *
   * @param type - the positional/keyword nature of the argument
   * @param name - the name of the argument
   * @param description - the description for the argument used in `man` pages
   * @param handler - a function for parsing arguments from strings
   * @param defaultValue - the default value of the argument
   * @param aliases - a list of other names that can refer to this argument
   */
  constructor(
    type: ArgType,
    name: string,
    description: string,
    handler: Handler<T>,
    defaultValue?: T,
    aliases: string[] = [],
  ) {
    this.type = type
    this.name = name
    this.description = description

    this.handler = handler

    if (defaultValue !== undefined) {
      this.defaultValue = defaultValue
      this.value = defaultValue
    }

    this.aliases = aliases
  }

  /**
   * Get whether the argument is required, based on whether a default value
   * of the argument was provided.
   *
   * @returns whether this argument requires a value
   */
  get isRequired(): boolean {
    return this.defaultValue === undefined
  }

  /**
   * Get the textual representation of the argument. Shows the argument's name,
   * its aliases, it's default value and whether the argument is required.
   *
   * @returns the string representation of the argument
   */
  get repr(): string {
    let repr = this.name
    // Prefix '--' before keyword arguments
    if (this.type === ArgType.KEYWORD) {
      repr = `--${repr}`
    }
    // Depict all aliases with slashes
    if (this.aliases) {
      this.aliases.forEach((alias) => {
        repr = `${repr}/-${alias}`
      })
    }
    // Suffix default value for non-Boolean values
    if (this.defaultValue && typeof this.defaultValue !== 'boolean') {
      repr = `${repr}='${this.defaultValue}'`
    }
    // Surround optional arguments with []
    if (!this.isRequired) {
      repr = `[${repr}]`
    }

    return repr
  }

  /**
   * Set the parsed value of the argument after parsing the argument vector.
   * @param value - the value of the argument after parsing the argument vector
   */
  setValue(value: T): void {
    this.value = value
  }
}

/**
 * Represents an argument that refers to the name or path of a file-system node.
 */
export class NodeArg extends Arg<string> {
  /**
   * the type of file-system node whose path counts as a valid value for this
   * argument; Not setting this value treats paths to both files and folders as
   * equally valid.
   */
  fsNodeType?: FsNodeType
  /**
   * the node associated with the path given in the argument
   */
  node?: FsNode

  /**
   * Create a new object of class `NodeArg`.
   *
   * @param type - the positional/keyword nature of the argument
   * @param name - the name of the argument
   * @param description - the description for the argument used in `man` pages
   * @param fsNodeType - the type of node to accept in the argument
   * @param defaultValue - the default value of the argument
   * @param aliases - a list of other names that can refer to this argument
   */
  constructor(
    type: ArgType,
    name: string,
    description: string,
    fsNodeType?: FsNodeType,
    defaultValue?: string,
    aliases?: string[],
  ) {
    super(type, name, description, String, defaultValue, aliases)
    this.fsNodeType = fsNodeType
  }

  /**
   * Get whether a node exists at the path given as the argument value.
   * @returns whether a node exists at the path given as the argument value
   */
  get isNodeFound(): boolean {
    return this.node !== null
  }

  /**
   * Get whether the node is of the correct type.
   * @returns whether the node is of the correct type
   */
  get isNodeValidType(): boolean {
    if (!this.node) return false
    if (!this.fsNodeType) return true

    return this.node.isType(this.fsNodeType)
  }

  /**
   * Set the file-system node at the path referenced by the argument value.
   * @param node - the file-system node at the given path
   */
  setNode(node: FsNode): void {
    this.node = node
  }
}

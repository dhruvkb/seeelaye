export enum FsNodeType {
  FILE = 'file',
  FOLDER = 'folder'
}

/**
 * Split the given file name into a name and an extension. Extension here is
 * defined as the substring of the name after the last dot/full stop/period.
 *
 * @param fullName - then name of the node
 */
export const nameExtSplit = (fullName: string): [string, string | null] => {
  if (!fullName.includes('.')) {
    return [fullName, null]
  }
  const lastDot = fullName.lastIndexOf('.')
  const name = fullName.substring(0, lastDot)
  const extension = fullName.substring(lastDot + 1)
  return [name, extension]
}

/**
 * Maps extensions to programming languages. This is used when setting up
 * syntax highlighting for files.
 */
export const extLang: Record<string, string | string[] | undefined> = Object.freeze({
  java: 'java',
  js: 'javascript',
  md: 'markdown',
  py: 'python',
  rb: 'ruby',
  rst: 'markdown', // TODO: Use a proper language parser
  tex: 'latex',
  vue: ['xml', 'javascript'],
  yml: 'yaml',
})

export interface IFsNode {
  name: string
  aliases?: string[]
  children?: IFsNode[]
}

/**
 * A class that implements one node in a file-system tree. Each node may either
 * be a file or a folder and may have children if it is a folder.
 */
export class FsNode implements IFsNode {
  type: FsNodeType
  name: string
  aliases: string[]
  parent!: FsNode
  children: FsNode[]

  /**
   * Create a new object of class `FsNode`.
   *
   * @param type - whether the node represents a file or a folder
   * @param name - the name of the node
   * @param aliases - the list of alternative names of the node
   */
  constructor(type: FsNodeType, name: string, aliases: string[] = []) {
    this.type = type
    this.name = name
    this.aliases = aliases
    this.parent = this
    this.children = []
  }

  /**
   * Determine whether this node represents a file system folder.
   * @returns whether this node represents a file system folder
   */
  get isFolder(): boolean {
    return this.isType(FsNodeType.FOLDER)
  }

  /**
   * Determine whether this node represents a file system file.
   * @returns whether this node represents a file system file
   */
  get isFile(): boolean {
    return this.isType(FsNodeType.FILE)
  }

  /**
   * Determine whether this node is the root of the file system.
   * @returns whether this node is the root of the file system
   */
  get isRoot(): boolean {
    return this.parent === this
  }

  /**
   * Get all forms of the name for this node. This includes the primary name
   * and all aliases, with and without the extension.
   *
   * In addition to the name and all aliases, for
   * - files, the name without the extension
   * - folders, the name with the trailing slash
   * - the root node, a single slash
   * is also accepted.
   *
   * Duplicates names are removed.
   *
   * @returns the list of all valid names for the node
   */
  get allNames(): string[] {
    const allNames = [this.name, ...this.aliases]
    if (this.isFile) {
      allNames.forEach((name) => {
        const [nameMinusExt] = nameExtSplit(name)
        allNames.push(nameMinusExt)
      })
    }
    if (this.isFolder) {
      allNames.forEach((name) => {
        allNames.push(`${name}/`)
      })
    }
    if (this.isRoot) {
      allNames.push('/')
    }
    return Array.from(new Set(allNames))
  }

  /**
   * Get the list of languages present in the file based on the extension.
   * Evaluates to `null` if
   * - the node is a folder
   * - the node does not have an extension.
   *
   * @returns the list of languages that apply to the file
   */
  get language(): string[] | null {
    if (this.isFolder) return null

    const [, ext] = nameExtSplit(this.name)
    if (!ext) return null

    const language = extLang[ext]
    if (!language) return null

    if (Array.isArray(language)) {
      return language
    }
    return [language]
  }

  /**
   * Get the absolute path to this node. The absolute path of the root node is
   * the name itself. For any other node it is the name of the node prefixed
   * with the absolute path of its parent with the '/' separator.
   */
  get absolutePath(): string {
    if (this.isRoot) {
      return this.name
    }
    return `${this.parent.absolutePath}/${this.name}`
  }

  /**
   * Determine whether this node represents a file system file or folder.
   * @param type - the type of the node to compare this node with
   * @returns whether this node is of the given node type
   */
  isType(type: FsNodeType): boolean {
    return this.type === type
  }

  /**
   * Determine whether this node has the given name as one of its names.
   * @param name - the name to check for association with the node
   * @param isPartial - whether to allow partial matches
   */
  hasName(name: string, isPartial = false): boolean {
    const allNames = this.allNames.map((nodeName) => nodeName.toLowerCase())
    if (isPartial) {
      return allNames.some((nodeName) => nodeName.includes(name.toLowerCase()))
    }
    return allNames.includes(name.toLowerCase())
  }

  /**
   * Traverse the tree using the DFT algorithm. DFT was preferred over BFT
   * because it requires less code.
   *
   * The argument is a callback function that accepts a node and returns
   * a boolean value, which if `false`, stops further traversal.
   *
   * @param func - the function to execute on each node
   * @returns whether to continue traversal
   */
  traverse(func: (node: FsNode) => boolean): boolean {
    let shouldContinue = func(this)
    if (!shouldContinue) {
      return shouldContinue
    }

    Array.from(this.children.values())
      .every((child) => {
        shouldContinue = child.traverse(func)
        return shouldContinue
      })
    return shouldContinue
  }

  /**
   * Get the descendant of the node with the given name. Returns null if no
   * matching node is found.
   *
   * @param name - the name to use for matching nodes
   */
  descendantNamed(name: string): FsNode | null {
    let result: FsNode | null = null
    this.traverse((node) => {
      if (node.hasName(name)) {
        result = node
        return false
      }
      return true
    })
    return result
  }

  /**
   * Parse a POJO representation of a file system node or subtree into an
   * `FsNode` object.
   *
   * @param pojo - the POJO representation to parse
   * @returns the parsed `FsNode` instance generated from the POJO
   */
  static parse(pojo: IFsNode): FsNode {
    const type = pojo.children ? FsNodeType.FOLDER : FsNodeType.FILE
    const node = new FsNode(type, pojo.name, pojo.aliases)
    if (pojo.children) {
      pojo.children.forEach((childPojo) => {
        const childNode = FsNode.parse(childPojo)
        node.children.push(childNode)
        childNode.parent = node
      })
    }
    return node
  }
}

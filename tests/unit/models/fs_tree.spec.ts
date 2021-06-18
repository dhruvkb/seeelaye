import { FsNode, FsNodeType, nameExtensionSplit } from '@/models/fs_tree'

describe('nameExtensionSplit', () => {
  it('handles node names without extension', () => {
    const [name, ext] = nameExtensionSplit('name')
    expect(name).toEqual('name')
    expect(ext).toBeNull()
  })

  it('handles simple names', () => {
    const [name, ext] = nameExtensionSplit('name.ext')
    expect(name).toEqual('name')
    expect(ext).toEqual('ext')
  })

  it('handles names with multiple dots', () => {
    const [name, ext] = nameExtensionSplit('name.name.ext')
    expect(name).toEqual('name.name')
    expect(ext).toEqual('ext')
  })

  it('handles names ending with a dot', () => {
    const [name, ext] = nameExtensionSplit('name.')
    expect(name).toEqual('name')
    expect(ext).toEqual('')
  })

  it('handles names starting with a dot', () => {
    const [name, ext] = nameExtensionSplit('.ext')
    expect(name).toEqual('')
    expect(ext).toEqual('ext')
  })
})

describe('FsNode', () => {
  describe('constructor', () => {
    it('requires a type and a name to construct the object', () => {
      const node = new FsNode(FsNodeType.FILE, 'name')
      expect(node).toBeInstanceOf(FsNode)
    })
  })

  describe('isFile/isFolder', () => {
    it('returns true for files', () => {
      const node = new FsNode(FsNodeType.FILE, 'name')
      expect(node.isFile).toBe(true)
      expect(node.isFolder).toBe(false)
    })

    it('returns false for folders', () => {
      const node = new FsNode(FsNodeType.FOLDER, 'name')
      expect(node.isFile).toBe(false)
      expect(node.isFolder).toBe(true)
    })
  })

  describe('isRoot', () => {
    it('checks if node is parent of itself', () => {
      const node = new FsNode(FsNodeType.FOLDER, 'name')
      expect(node.isRoot).toBe(true)
      node.parent = new FsNode(FsNodeType.FOLDER, 'parent')
      expect(node.isRoot).toBe(false)
    })
  })

  describe('allNames', () => {
    it('includes all names and aliases', () => {
      const node = new FsNode(FsNodeType.FOLDER, 'name', ['alias'])
      expect(node.allNames).toContain('name')
      expect(node.allNames).toContain('alias')
    })

    it('adds trailing slash for folders', () => {
      const node = new FsNode(FsNodeType.FOLDER, 'name', ['alias'])
      expect(node.allNames).toContain('name/')
      expect(node.allNames).toContain('alias/')
    })

    it('includes just a slash for root directory', () => {
      const node = new FsNode(FsNodeType.FOLDER, '~')
      node.parent = node
      expect(node.allNames).toContain('/')
    })
  })

  describe('isType', () => {
    it('checks type for files', () => {
      const node = new FsNode(FsNodeType.FILE, 'name')
      expect(node.isType(FsNodeType.FILE)).toBe(true)
      expect(node.isType(FsNodeType.FOLDER)).toBe(false)
    })

    it('checks type for folders', () => {
      const node = new FsNode(FsNodeType.FOLDER, 'name')
      expect(node.isType(FsNodeType.FILE)).toBe(false)
      expect(node.isType(FsNodeType.FOLDER)).toBe(true)
    })
  })
})

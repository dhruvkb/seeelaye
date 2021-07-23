import type { IFsNode } from '@/models/fs_tree'

import {
  FsNode,
  FsNodeType,
  nameExtSplit,
  pathSplit,
} from '@/models/fs_tree'
import { getTree } from '../../fixtures/fs_tree.fix'

describe('nameExtensionSplit', () => {
  it('handles node names without extension', () => {
    const [name, ext] = nameExtSplit('name')
    expect(name).toEqual('name')
    expect(ext).toBeNull()
  })

  it('handles simple names', () => {
    const [name, ext] = nameExtSplit('name.ext')
    expect(name).toEqual('name')
    expect(ext).toEqual('ext')
  })

  it('handles names with multiple dots', () => {
    const [name, ext] = nameExtSplit('name.name.ext')
    expect(name).toEqual('name.name')
    expect(ext).toEqual('ext')
  })

  it('handles names ending with a dot', () => {
    const [name, ext] = nameExtSplit('name.')
    expect(name).toEqual('name')
    expect(ext).toEqual('')
  })

  it('handles names starting with a dot', () => {
    const [name, ext] = nameExtSplit('.ext')
    expect(name).toEqual('')
    expect(ext).toEqual('ext')
  })
})

describe('pathSplit', () => {
  it('cleans multiple slashes', () => {
    const path = 'a//b//c'
    expect(pathSplit(path)).toEqual(['a/', 'b/', 'c'])
  })

  it('keeps slash with preceding part', () => {
    const path = 'a/b/c/'
    expect(pathSplit(path)).toEqual(['a/', 'b/', 'c/'])
  })

  it('creates blank node for paths starting with slash', () => {
    const path = '/a/b/c'
    expect(pathSplit(path)).toEqual(['/', 'a/', 'b/', 'c'])
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
      expect(node.allNames).toContain('/')
    })
  })

  describe('language', () => {
    it('returns null for folders', () => {
      const node = new FsNode(FsNodeType.FOLDER, 'name')
      expect(node.language).toBeNull()
    })

    it('returns null for files without extensions', () => {
      const node = new FsNode(FsNodeType.FILE, 'name')
      expect(node.language).toBeNull()
    })

    it('returns null for files with unknown extensions', () => {
      const node = new FsNode(FsNodeType.FILE, 'name.txt')
      expect(node.language).toBeNull()
    })

    it('returns languages wrapped in an array', () => {
      const node = new FsNode(FsNodeType.FILE, 'name.py')
      expect(node.language).toEqual(['python'])
    })

    it('returns array of languages', () => {
      const node = new FsNode(FsNodeType.FILE, 'Name.vue')
      expect(node.language).toEqual(['xml', 'javascript', 'typescript'])
    })
  })

  describe('absolutePath', () => {
    it('returns node name for root node', () => {
      const node = new FsNode(FsNodeType.FOLDER, '~')
      expect(node.absolutePath).toEqual('~')
    })

    it('joins ancestry for non-root node', () => {
      const a = new FsNode(FsNodeType.FOLDER, 'a')
      const b = new FsNode(FsNodeType.FOLDER, 'b')
      b.parent = a
      a.children.push(b)
      const c = new FsNode(FsNodeType.FOLDER, 'c')
      c.parent = b
      b.children.push(c)
      expect(c.absolutePath).toEqual('a/b/c')
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

  describe('hasName', () => {
    it('compares name ignoring case', () => {
      const node = new FsNode(FsNodeType.FOLDER, 'nAmE', ['aLiAs'])
      expect(node.hasName('NaMe')).toBe(true)
      expect(node.hasName('NaMe/')).toBe(true)
      expect(node.hasName('alias')).toBe(true)
      expect(node.hasName('ALIAS/')).toBe(true)
    })

    it('checks partial match if set', () => {
      const node = new FsNode(FsNodeType.FOLDER, 'name')
      expect(node.hasName('n', true)).toBe(true)
      expect(node.hasName('nA', true)).toBe(true)
      expect(node.hasName('Am', true)).toBe(true)
      expect(node.hasName('mE/', true)).toBe(true)
    })
  })

  describe('traverse', () => {
    let root: FsNode
    let a: FsNode
    let ab: FsNode
    let c: FsNode

    beforeEach(() => {
      [root, a, ab, c] = getTree()
    })

    it('covers all nodes depth wise', () => {
      const callback = jest.fn((node: FsNode) => node !== null)
      root.traverse(callback)
      expect(callback.mock.calls.length).toEqual(4)
      expect(callback.mock.calls.map((call) => call[0])).toEqual([root, a, ab, c])
    })

    it('stops when the callback returns false', () => {
      const callback = jest.fn((node: FsNode) => node !== a)
      root.traverse(callback)
      expect(callback.mock.calls.length).toEqual(2)
      expect(callback.mock.calls.map((call) => call[0])).toEqual([root, a])
    })
  })

  describe('descendantNamed', () => {
    let root: FsNode
    let ab: FsNode

    beforeEach(() => {
      [root, , ab] = getTree()
    })

    it('returns node with matching name', () => {
      const match = root.descendantNamed('ab')
      expect(match).toEqual(ab)
    })

    it('returns null if no match found', () => {
      const match = root.descendantNamed('none')
      expect(match).toBeNull()
    })
  })

  describe('parse', () => {
    let fs: IFsNode

    beforeEach(() => {
      fs = {
        name: 'parent',
        children: [
          {
            name: 'child',
            aliases: ['offspring'],
          },
        ],
      }
    })

    it('converts the POJO into class instances', () => {
      const node = FsNode.parse(fs)
      expect(node).toBeInstanceOf(FsNode)
      expect(node.children[0]).toBeInstanceOf(FsNode)
    })

    it('maps parent-child relationships', () => {
      const node = FsNode.parse(fs)
      expect(node.children.length).toEqual(1)
      expect(node.children[0].parent).toEqual(node)
    })

    it('sets node type based on presence of children', () => {
      const node = FsNode.parse(fs)
      expect(node.isFolder).toBe(true)
      expect(node.children[0].isFile).toBe(true)
    })

    it('records node aliases', () => {
      const node = FsNode.parse(fs)
      expect(node.children[0].aliases).toContain('offspring')
    })

    it('sets top-level node as root', () => {
      const node = FsNode.parse(fs)
      expect(node.isRoot).toBe(true)
    })
  })
})

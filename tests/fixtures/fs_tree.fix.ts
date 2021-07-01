import { FsNode, FsNodeType } from '@/models/fs_tree'

/**
 * Get a simple tree of nodes to use as a test of the tree capabilities.
 * Provides a tuple of 4 `FsNode` instances, named `~`, `a`, `ab` and `c`
 * respectively.
 *
 * ```txt
 * ~/
 * ├── a/
 * │   └── ab
 * └── c/
 * ```
 */
export const getTree = (): [FsNode, FsNode, FsNode, FsNode] => {
  const root = new FsNode(FsNodeType.FOLDER, '~') // ~/
  const a = new FsNode(FsNodeType.FOLDER, 'a')    // ├── a/
  const ab = new FsNode(FsNodeType.FILE, 'ab')    // │   └── ab
  const c = new FsNode(FsNodeType.FOLDER, 'c')    // └── c/

  a.parent = root
  root.children.push(a)

  ab.parent = a
  a.children.push(ab)

  c.parent = root
  root.children.push(c)

  return [root, a, ab, c]
}

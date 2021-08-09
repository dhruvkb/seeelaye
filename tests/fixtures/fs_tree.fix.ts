import { FsNode, FsNodeType } from '@/models/fs_tree'

/*
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

export const root = new FsNode(FsNodeType.FOLDER, '~')
export const a = new FsNode(FsNodeType.FOLDER, 'a', ['ax'])
export const ab = new FsNode(FsNodeType.FILE, 'ab')
export const c = new FsNode(FsNodeType.FOLDER, 'c')

a.parent = root
root.children.push(a)

ab.parent = a
a.children.push(ab)

c.parent = root
root.children.push(c)

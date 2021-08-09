import type { Binary } from '@/models/bin'
import type { FsNode } from '@/models/fs_tree'

/**
 * Represents a suggestion offered by the autocompletion engine. The suggestion
 * could be an executable binary or a navigable node.
 */
export interface ISuggestion<T extends FsNode | Binary = FsNode | Binary> {
  /**
   * the actual entity to suggest
   */
  entity: T
  /**
   * a string representation of this entity
   */
  text: string
}

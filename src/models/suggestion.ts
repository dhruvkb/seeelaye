import type { Binary } from '@/models/bin'
import type { FsNode } from '@/models/fs_tree'

export enum EntityType {
  /**
   * A node represents an entity on the file system. This is represented by the
   * model `FsNode` in see·el·aye.
   */
  NODE = 'node',
  /**
   * A binary represents an executable program. This is represented by the model
   * `Binary` in see·el·aye.
   */
  BINARY = 'bin'
}

/**
 * Represents a suggestion offered by the autocompletion engine. The suggestion
 * could be an executable binary or a navigable node.
 */
export interface ISuggestion<T extends FsNode | Binary = FsNode | Binary> {
  /**
   * whether the suggested entity is a binary or a node
   */
  entityType: EntityType
  /**
   * the actual entity to suggest
   */
  value: T
  /**
   * a string representation of this entity
   */
  text: string
}

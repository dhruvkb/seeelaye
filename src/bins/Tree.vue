<template>
  <div class="tree">
    <template v-if="isNodeFound">
      <slot/>
      {{ shape }}
      <Navigable
        :node="node"
        :show-aliases="args.verbose"/>
      <Tree
        v-for="(child, index) in node.children"
        :key="index"
        :argv="[
          ...args.verbose ? ['--verbose']: [],
          child.absolutePath
        ]"
        allow-files
        is-subtree>
        <slot/>
        {{ childShape }}
      </Tree>
    </template>
    <template v-else>
      <strong class="error">{{ args.dirpath }}</strong> is not a valid directory.
    </template>
  </div>
</template>

<script lang="ts">
  import type { IBinary } from '@/models/bin'
  import type { IArg } from '@/models/arg'

  import { computed, defineComponent } from 'vue'

  import Navigable from '@/components/navigable/Navigable.vue'
  import { binProps, binComposition } from '@/compositions/bin'
  import { pathComposition } from '@/compositions/path'
  import { FsNodeType } from '@/models/fs_tree'

  export const binary: IBinary = {
    name: 'Tree',
    command: 'tree',
    description: 'List contents of directory recursively like a tree.',
    argSpec: {
      kwArgs: [
        {
          name: 'verbose',
          description: 'whether to display more information on-screen',
          aliases: ['v'],
          type: Boolean,
          default: false,
        } as IArg<boolean>,
      ],
      posArgs: [
        {
          name: 'dirpath',
          description: 'the path or name of the directory whose contents to list',
          type: String,
          default: '.',
          nodeType: FsNodeType.FOLDER,
        } as IArg<string>,
      ],
    },
  }

  /**
   * Lists contents of directory recursively like a tree.
   */
  export default defineComponent({
    name: 'Tree',
    components: {
      Navigable,
    },
    props: {
      ...binProps,
      /**
       * whether to allow the node at `args.dirpath` to be a file; This is used
       * internally as a workaround to display children nodes that are files.
       */
      allowFiles: {
        type: Boolean,
        default: false,
      },
      /**
       * whether the tree is a subtree invoked by the `Tree` component; This
       * determines whether the terminal will be set to ready on mount.
       */
      isSubtree: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { slots }) {
      const isRoot = computed(() => !slots.default)

      const { processedArgs } = binComposition(binary, isRoot.value)
      const args = processedArgs(props.argv)

      const { node } = pathComposition(
        args.dirpath as string,
        binary.argSpec.posArgs[0] as IArg<string> & { nodeType: FsNodeType },
      )
      const isNodeFound = node !== null && (props.allowFiles || node.isFolder)

      const shapes = {
        pipe: '│',
        tee: '├',
        bend: '└',
        dash: '─',
        space: '\xa0',
      }
      const isLastChild = computed(() => {
        if (!node) return false
        const siblings = node.parent.children
        return siblings.indexOf(node) === siblings.length - 1
      })
      const shape = computed(() => {
        if (isRoot.value) {
          return ''
        }
        if (isLastChild.value) {
          return `${shapes.bend}${shapes.dash.repeat(2)}`
        }
        return `${shapes.tee}${shapes.dash.repeat(2)}`
      })
      const childShape = computed(() => {
        if (isRoot.value) {
          return ''
        }
        if (isLastChild.value) {
          return `${shapes.space.repeat(3)}`
        }
        return `${shapes.pipe}${shapes.space.repeat(2)}`
      })

      return {
        args,
        node,
        isNodeFound,
        shape,
        childShape,
      }
    },
  })
</script>

<template>
  <div class="cd">
    <template v-if="!isNodeFound">
      <strong class="error">{{ args.dirpath }}</strong> is not a valid directory.
    </template>
    <template v-else-if="args.verbose">
      Changed to <Navigable :node="node" :is-clickable="false"/>.
    </template>
  </div>
</template>

<script lang="ts">
  import type { IBinary } from '@/models/bin'
  import type { IArg } from '@/models/arg'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'
  import Navigable from '@/components/navigable/Navigable.vue'
  import { binProps, binComposition } from '@/compositions/bin'
  import { pathComposition } from '@/compositions/path'
  import { FsNodeType } from '@/models/fs_tree'

  export const binary: IBinary = {
    name: 'ChangeDir',
    command: 'cd',
    description: 'Switch to the given directory as the working directory.',
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
          description: 'the path or name of the directory to switch to',
          type: String,
          default: '~',
          nodeType: FsNodeType.FOLDER,
        } as IArg<string>,
      ],
    },
  }

  /**
   * Switches to the given directory as the working directory.
   */
  export default defineComponent({
    name: 'ChangeDir',
    props: binProps,
    components: {
      Navigable,
    },
    setup(props) {
      const { processedArgs } = binComposition(binary)
      const args = processedArgs(props.argv)

      const { node, isNodeFound } = pathComposition(
        args.dirpath as string,
        binary.argSpec.posArgs[0] as IArg<string> & { nodeType: FsNodeType },
      )

      const seeelaye = useSeeelaye()
      if (isNodeFound) {
        seeelaye.commit('setCurrentNode', {
          currentNode: node,
        })
      }

      return {
        args,
        node,
        isNodeFound,
      }
    },
  })
</script>

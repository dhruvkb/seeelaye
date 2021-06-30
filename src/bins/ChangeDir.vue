<template>
  <div class="cd">
    <template v-if="!isNodeFound">
      <strong>{{ args.dirpath }}</strong> is not a valid directory.
    </template>
    <template v-else-if="args.verbose">
      Changed to {{ node.name }}.
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import pathMixin from '@/mixins/path'

  import { IArg } from '@/models/arg'
  import { FsNodeType } from '@/models/fs_tree'

  /**
   * Switches to the given directory as the working directory.
   */
  export default defineComponent({
    name: 'ChangeDir',
    command: 'cd',
    description: 'Switch to the given directory as the working directory.',
    argSpec: {
      kwArgs: [
        {
          name: 'verbose',
          description: 'whether to display more messages on screen',
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
    mixins: [
      pathMixin('dirpath'),
    ],
    created() {
      if (this.isNodeFound) {
        this.$seeelaye.commit('setCurrentNode', {
          currentNode: this.node,
        })
      }
    },
  })
</script>

<template>
  <div class="list">
    <ul v-if="node && isNodeFound">
      <template v-if="args.all">
        <li>
          <Navigable :node="node">{{ specialNames.CURRENT_DIR[0] }}</Navigable>
        </li>
        <li>
          <Navigable :node="node.parent">{{ specialNames.PARENT_DIR[0] }}</Navigable>
        </li>
      </template>
      <li
        v-for="(child, index) in node.children"
        :key="index">
        <Navigable :node="child"/>
      </li>
    </ul>
    <template v-else>
      <strong class="error">{{ args.dirpath }}</strong> is not a valid directory.
    </template>
  </div>
</template>

<script lang="ts">
  import type { Binary } from '@/bins/type'
  import type { IArg } from '@/models/arg'

  import { defineComponent } from 'vue'

  import Navigable from '@/components/navigable/Navigable.vue'
  import { binProps, binComposition } from '@/compositions/bin'
  import { pathComposition } from '@/compositions/path'
  import { FsNodeType, specialNames } from '@/models/fs_tree'

  export const binary: Binary = {
    name: 'List',
    command: 'ls',
    description: 'List the contents of the given directory.',
    argSpec: {
      kwArgs: [
        {
          name: 'all',
          description: 'whether to display hidden files and directories',
          aliases: ['a'],
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
   * Lists the contents of the given directory.
   */
  export default defineComponent({
    name: 'List',
    components: {
      Navigable,
    },
    props: binProps,
    setup(props) {
      const { processedArgs } = binComposition(binary)
      const args = processedArgs(props.argv)

      const { node, isNodeFound } = pathComposition(
        args.dirpath as string,
        binary.argSpec.posArgs[0] as IArg<string> & { nodeType: FsNodeType },
      )

      return {
        specialNames,

        args,
        node,
        isNodeFound,
      }
    },
  })
</script>

<style scoped lang="css">
  .list ul {
    column-count: 2;
  }
</style>

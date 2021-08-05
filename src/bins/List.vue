<template>
  <div class="list">
    <ul v-if="node && isNodeOk">
      <template v-if="all">
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
      <strong class="error">{{ dirpath }}</strong> is not a valid directory.
    </template>
  </div>
</template>

<script lang="ts">
  import { Binary } from '@/models/bin'
  import { Arg, ArgType, NodeArg } from '@/models/arg'
  import { FsNodeType, specialNames } from '@/models/fs_tree'

  import { defineComponent } from 'vue'

  import Navigable from '@/components/navigable/Navigable.vue'
  import { binComposition, binProps } from '@/compositions/bin'

  const dirpathFn = () => new NodeArg(
    ArgType.POSITIONAL,
    'dirpath',
    'the path or name of the directory whose contents to list',
    FsNodeType.FOLDER,
    specialNames.CURRENT_DIR[0],
  )
  const allFn = () => new Arg<boolean>(
    ArgType.KEYWORD,
    'all',
    'whether to display hidden files and directories',
    Boolean,
    false,
    ['a'],
  )
  export const binaryFn = (): Binary<[NodeArg], [Arg<boolean>]> => {
    const dirpath = dirpathFn()
    const all = allFn()
    return new Binary<[NodeArg], [Arg<boolean>]>(
      'List',
      'ls',
      'List the contents of the given directory.',
      [dirpath],
      [all],
    )
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
      const binary = binaryFn()
      const dirpath = binary.args[0] as NodeArg
      const all = binary.kwargs[0]

      binComposition()
      binary.processArgs(props.argv)

      const dirpathValue = dirpath.value
      const allValue = all.value

      const { processNode } = pathComposition(dirpath)
      processNode()

      const { node } = dirpath
      const isNodeOk = dirpath.isNodeFound && dirpath.isNodeValidType

      return {
        specialNames,

        dirpath: dirpathValue,
        all: allValue,

        node,
        isNodeOk,
      }
    },
  })
</script>

<style scoped lang="css">
  .list ul {
    column-count: 2;
  }
</style>

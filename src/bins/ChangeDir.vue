<template>
  <div class="cd">
    <template v-if="!isNodeOk">
      <strong class="error">{{ dirpath }}</strong> is not a valid directory.
    </template>
    <template v-else-if="verbose">
      Changed to <Navigable :node="node" :is-clickable="false"/>.
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import { Binary } from '@/models/bin'
  import { Arg, ArgType, NodeArg } from '@/models/arg'
  import { FsNodeType, specialNames } from '@/models/fs_tree'

  import { binComposition, binProps } from '@/compositions/bin'

  import Navigable from '@/components/navigable/Navigable.vue'

  const dirpathFn = () => new NodeArg(
    ArgType.POSITIONAL,
    'dirpath',
    'the path or name of the directory to switch to',
    FsNodeType.FOLDER,
    specialNames.HOME_DIR[0],
  )
  const verboseFn = () => new Arg(
    ArgType.KEYWORD,
    'verbose',
    'whether to display more information on-screen',
    Boolean,
    false,
    ['v'],
  )
  export const binaryFn = (): Binary<[NodeArg], [Arg<boolean>]> => {
    const dirpath = dirpathFn()
    const verbose = verboseFn()
    return new Binary<[NodeArg], [Arg<boolean>]>(
      'ChangeDir',
      'cd',
      'Switch to the given directory as the working directory.',
      [dirpath],
      [verbose],
    )
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
      const binary = binaryFn()
      const dirpath = binary.args[0]
      const verbose = binary.kwargs[0]

      binComposition()
      binary.processArgs(props.argv)

      const verboseValue = verbose.value

      const dirpathValue = dirpath.handlerValue
      const node = dirpath.value
      const isNodeOk = dirpath.isNodeFound && dirpath.isNodeValidType

      const seeelaye = useSeeelaye()
      if (isNodeOk) {
        seeelaye.commit('setCurrentNode', {
          currentNode: node,
        })
      }

      return {
        dirpath: dirpathValue,
        verbose: verboseValue,

        node,
        isNodeOk,
      }
    },
  })
</script>

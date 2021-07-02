<template>
  <div class="bad">
    Command <strong class="error">{{ args.bin }}</strong> does not exist in the
    CLI. Try <Executable :bin="helpBinary"/>.
  </div>
</template>

<script lang="ts">
  import type { Binary } from '@/bins/type'
  import type { IArg } from '@/models/arg'

  import { defineComponent } from 'vue'

  import { binary as helpBinary } from '@/bins/Help.vue'
  import Executable from '@/components/executable/Executable.vue'
  import { binProps, binComposition } from '@/compositions/bin'

  export const binary: Binary = {
    name: 'Bad',
    command: 'bad',
    description: 'Display the invalidity of the input and suggest alternatives.',
    argSpec: {
      posArgs: [],
      kwArgs: [
        {
          name: 'bin',
          description: 'the invalid binary that was invoked',
          type: String,
        } as IArg<string>,
      ],
    },
  }

  /**
   * Displays the invalidity of the input and suggests alternatives.
   *
   * This binary is invoked when the binary entered into the input does not
   * exist.
   */
  export default defineComponent({
    name: 'Bad',
    components: {
      Executable,
    },
    props: binProps,
    setup(props) {
      const { processedArgs } = binComposition(binary)
      const args = processedArgs(props.argv)

      return {
        helpBinary,

        args,
      }
    },
  })
</script>

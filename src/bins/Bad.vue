<template>
  <div class="bad">
    Command <strong class="error">{{ binname }}</strong> does not exist in the
    CLI. Try <Executable :bin="helpBinary"/>.
  </div>
</template>

<script lang="ts">
  import { Binary } from '@/models/bin'
  import { Arg, ArgType } from '@/models/arg'

  import { defineComponent } from 'vue'

  import Executable from '@/components/executable/Executable.vue'
  import { binComposition, binProps } from '@/compositions/bin'
  import { binaryFn as helpBinaryFn } from './Help.vue'

  const binnameFn = () => new Arg<string>(
    ArgType.POSITIONAL,
    'binname',
    'the name of the invalid binary that was invoked',
    String,
    undefined,
    ['b'],
  )
  export const binaryFn = (): Binary<[string], []> => {
    const binname = binnameFn()
    return new Binary<[string], []>(
      'Bad',
      'bad',
      'Display the invalidity of the input and suggest alternatives.',
      [binname],
      [],
    )
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
      const binary = binaryFn()
      const binname = binary.args[0]

      binComposition()
      binary.processArgs(props.argv)

      const binnameValue = binname.value

      return {
        binname: binnameValue,

        helpBinary: helpBinaryFn(),
      }
    },
  })
</script>

<template>
  <div class="manual">
    <template v-if="bin">
      <strong>NAME:</strong><br/>
      <div class="indent blank-line">
        <span class="bin">{{ bin.command }}</span> -- {{ bin.description }}
      </div>

      <strong>SYNOPSIS:</strong><br/>
      <div class="indent blank-line">
        <Executable
          :bin="bin"
          show-args/>
      </div>

      <strong>DESCRIPTION:</strong><br/>
      <template v-if="hasParams">
        The following options are available:
        <table class="indent">
          <template v-for="(key, typeIndex) in argTypes">
            <tr
              v-for="(arg, argIndex) in bin[key]"
              :key="`${typeIndex}-${argIndex}`">
              <td class="arg">{{ arg.repr }}</td>
              <td>-- {{ arg.description }}</td>
            </tr>
          </template>
        </table>
      </template>
      <template v-else>
        This binary takes no options.
      </template>
    </template>
    <template v-else>
      <strong class="error">{{ binname }}</strong> is not a valid binary.
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import { Binary } from '@/models/bin'
  import { Arg, ArgType } from '@/models/arg'

  import { binComposition, binProps } from '@/compositions/bin'

  import Executable from '@/components/executable/Executable.vue'

  const binnameFn = () => new Arg<string>(
    ArgType.POSITIONAL,
    'binname',
    'the name of the binary to get help about',
    String,
  )
  export const binaryFn = (): Binary<[Arg<string>], []> => {
    const binname = binnameFn()
    return new Binary<[Arg<string>], []>(
      'Manual',
      'man',
      'Display information about the given command.',
      [binname],
      [],
    )
  }

  /**
   * Displays information about the given command.
   */
  export default defineComponent({
    name: 'Manual',
    props: binProps,
    components: {
      Executable,
    },
    setup(props) {
      const binary = binaryFn()
      const binname = binary.args[0]

      binComposition()
      binary.processArgs(props.argv)

      const seeelaye = useSeeelaye()
      const binnameValue = binname.value
      const bin = seeelaye.allBins[binnameValue]

      const hasKwargs = bin?.kwargs?.length > 0
      const hasArgs = bin?.args?.length > 0
      const hasParams = hasKwargs || hasArgs

      const argTypes: ('kwargs' | 'args')[] = ['kwargs', 'args']

      return {
        binname: binnameValue,

        bin,
        argTypes,
        hasParams,
      }
    },
  })
</script>

<style scoped lang="css">
  .indent {
    margin-left: 2ch;
  }

  .blank-line {
    margin-bottom: 2ex;
  }

  .bin {
    color: var(--binary-color, var(--color-normal-green));
  }

  .arg {
    color: var(--argument-color, var(--color-normal-blue));
    text-align: right;
  }

  table td {
    padding: 0 1ch 0 0;
    vertical-align: top;
  }
</style>

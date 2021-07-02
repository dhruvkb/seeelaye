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
      <template v-if="hasArgs">
        The following options are available:
        <table class="indent">
          <template v-for="(value, key, typeIndex) in argTypes">
            <tr
              v-for="(arg, argIndex) in bin.argSpec[key]"
              :key="`${typeIndex}-${argIndex}`">
              <td class="arg">{{ argRepr(arg, value) }}</td>
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
      <strong class="error">{{ args.bin }}</strong> is not a valid binary.
    </template>
  </div>
</template>

<script lang="ts">
  import type { Binary } from '@/bins/type'
  import type { IArg } from '@/models/arg'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import Executable from '@/components/executable/Executable.vue'

  import { binProps, binComposition } from '@/compositions/bin'
  import { argRepr, ArgType } from '@/models/arg'

  export const binary: Binary = {
    name: 'Manual',
    command: 'man',
    description: 'Display information about the given command.',
    argSpec: {
      posArgs: [
        {
          name: 'bin',
          description: 'the name of the binary to get help about',
          required: true,
          type: String,
        } as IArg<string>,
      ],
      kwArgs: [],
    },
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
      const { processedArgs } = binComposition(binary)
      const args = processedArgs(props.argv)

      const seeelaye = useSeeelaye()
      const bin = seeelaye.allBins[args.bin as string]

      const hasKwArgs = bin ? Boolean(bin.argSpec.kwArgs.length) : false
      const hasPosArgs = bin ? Boolean(bin.argSpec.posArgs.length) : false
      const hasArgs = hasKwArgs || hasPosArgs

      const argTypes = {
        kwArgs: ArgType.KEYWORD,
        posArgs: ArgType.POSITIONAL,
      }

      return {
        argRepr,
        ArgType,

        args,
        bin,
        hasArgs,
        argTypes,
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
  }
</style>

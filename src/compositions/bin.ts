import type { PropType } from 'vue'
import type { Handler } from 'arg'

import type { Binary } from '@/bins/type'

import { onMounted } from 'vue'
import argLib from 'arg'

import { useSeeelaye } from '@/base/injection'

export const binProps = {
  /**
   * the raw list of arguments passed to the binary
   */
  argv: {
    type: Array as PropType<string[]>,
    default: (): string[] => [],
  },
}

export interface IBinComposition {
  processedArgs: (argv: string[]) => Record<string, string | number | boolean | undefined>
  setTerminalReady: (isReady: boolean) => void
}

export const binComposition = (binary: Binary, markReadyOnMount = true): IBinComposition => {
  const seeelaye = useSeeelaye()

  // Methods
  const processedArgs = (argv: string[]) => {
    const args: Record<string, string | number | boolean | undefined> = {}
    if (!argv.length) return args

    const { argSpec: { posArgs, kwArgs } } = binary

    // Generate spec compatible with the arg library
    const spec: Record<string, string | Handler> = {}
    kwArgs.forEach((arg) => {
      // The full name of the keyword argument is mapped to a type handler.
      spec[`--${arg.name}`] = arg.type

      // Aliases for the keyword argument are mapped to the full name.
      arg.aliases?.forEach((alias) => {
        spec[`-${alias}`] = `--${arg.name}`
      })
    })

    // Parse the argument vector using the generated spec
    const processed = argLib(spec, {
      argv,
      permissive: true,
    })

    // Extract keyword and positional arguments from the parsed result
    kwArgs.forEach((arg) => {
      args[arg.name] = processed[`--${arg.name}`]
    })
    posArgs.forEach((arg) => {
      args[arg.name] = processed._.shift() || arg.default
    })

    return args
  }

  const setTerminalReady = (isReady = true) => {
    seeelaye.commit('setIsReady', { isReady })
  }

  // Lifecycle
  if (markReadyOnMount) {
    onMounted(() => {
      setTerminalReady(true)
    })
  }

  return {
    processedArgs,
    setTerminalReady,
  }
}

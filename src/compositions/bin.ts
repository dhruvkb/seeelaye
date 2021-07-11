import type { PropType } from 'vue'

import type { Binary } from '@/models/bin'

import { onMounted } from 'vue'

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
  processArgs: (argv: string[]) => void
  setTerminalReady: (isReady: boolean) => void
}

export const binComposition = (
  binary: Binary<unknown[], unknown[]>,
  markReadyOnMount = true,
): IBinComposition => {
  const seeelaye = useSeeelaye()

  // Methods
  const processArgs = (argv: string[]) => {
    binary.processArgs(argv)
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
    processArgs,
    setTerminalReady,
  }
}

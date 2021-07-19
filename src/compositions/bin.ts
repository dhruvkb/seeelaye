import type { PropType } from 'vue'

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
  setTerminalReady: (isReady: boolean) => void
}

export const binComposition = (markReadyOnMount = true): IBinComposition => {
  const seeelaye = useSeeelaye()

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
    setTerminalReady,
  }
}

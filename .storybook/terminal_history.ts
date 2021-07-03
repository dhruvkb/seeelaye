import type { Component } from 'vue'

import { onBeforeUnmount } from 'vue'

import { useSeeelaye } from '../src'

export const terminalHistory = (): Component => ({
  setup() {
    const seeelaye = useSeeelaye()

    let index = 0
    const commands = [
      'hello',
      'cd ~',
      'tree',
    ]

    // Sequentially issue commands to the CLI based on the ready state of te terminal
    const unsubscribe = seeelaye.store.subscribe((mutation) => {
      if (mutation.type.includes('/setIsReady') && mutation.payload.isReady) {
        const command = commands[index]
        if (command) {
          index += 1
          seeelaye.dispatch('executeCmd', { rawInput: command })
        }
      }
    })
    onBeforeUnmount(() => {
      if (unsubscribe) {
        unsubscribe()
      }
    })

    seeelaye.commit('deleteInteractions') // Clean slate on reload
    seeelaye.commit('setIsReady', { isReady: true })
  },
  template: `
    <story/>
  `,
})

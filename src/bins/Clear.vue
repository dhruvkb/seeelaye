<template>
  <div class="clear"/>
</template>

<script lang="ts">
  import type { IBinary } from '@/models/bin'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'
  import { binComposition } from '@/compositions/bin'

  export const binary: IBinary = {
    name: 'Clear',
    command: 'clear',
    description: 'Clear the screen by hiding all previous interactions.',
    argSpec: {
      posArgs: [],
      kwArgs: [],
    },
  }

  /**
   * Clears the screen by hiding all previous interactions.
   */
  export default defineComponent({
    name: 'Clear',
    setup() {
      binComposition(binary)

      const seeelaye = useSeeelaye()
      seeelaye.commit('hideInteractions')
    },
  })
</script>

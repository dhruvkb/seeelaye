<template>
  <div class="clear"/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import { Binary } from '@/models/bin'

  import { binComposition } from '@/compositions/bin'

  export const binaryFn = (): Binary<[], []> => new Binary<[], []>(
    'Clear',
    'clear',
    'Clear the screen by hiding all previous interactions.',
    [],
    [],
  )

  /**
   * Clears the screen by hiding all previous interactions.
   */
  export default defineComponent({
    name: 'Clear',
    setup() {
      binComposition()

      const seeelaye = useSeeelaye()
      seeelaye.commit('hideInteractions')
    },
  })
</script>

<template>
  <div class="nop" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Binary } from '@/models/bin'

  import { binComposition } from '@/compositions/bin'

  export const binaryFn = (): Binary<[], []> => new Binary<[], []>(
    'Nop',
    'nop',
    'Display nothing and do nothing.',
    [],
    [],
  )

  /**
   * Displays nothing and does nothing.
   *
   * This binary is invoked when a blank input is entered into the terminal.
   */
  export default defineComponent({
    name: 'Nop',
    setup() {
      binComposition()
    },
  })
</script>

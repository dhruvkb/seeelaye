<template>
  <div class="nop"/>
</template>

<script lang="ts">
  import { Binary } from '@/models/bin'

  import { defineComponent } from 'vue'

  import { binComposition } from '@/compositions/bin'

  export const binaryFn = () => new Binary<[], []>(
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

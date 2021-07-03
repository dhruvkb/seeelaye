<template>
  <div class="nop"/>
</template>

<script lang="ts">
  import type { IBinary } from '@/models/bin'

  import { defineComponent } from 'vue'

  import { binComposition } from '@/compositions/bin'

  export const binary: IBinary = {
    name: 'Nop',
    command: 'nop',
    description: 'Display nothing and do nothing.',
    argSpec: {
      kwArgs: [],
      posArgs: [],
    },
  }

  /**
   * Displays nothing and does nothing.
   *
   * This binary is invoked when a blank input is entered into the terminal.
   */
  export default defineComponent({
    name: 'Nop',
    setup() {
      binComposition(binary)
    },
  })
</script>

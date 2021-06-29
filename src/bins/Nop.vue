<template>
  <div class="nop"/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import binMixin from '@/mixins/bin'

  /**
   * Displays nothing and does nothing.
   *
   * This binary is invoked when a blank input is entered into the terminal.
   */
  export default defineComponent({
    name: 'Nop',
    mixins: [binMixin],
  })
</script>

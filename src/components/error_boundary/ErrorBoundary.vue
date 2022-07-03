<template>
  <div class="error-boundary">
    <!-- eslint-disable vue/no-v-html HTML generated from trusted sources -->
    <span
      v-if="errorMessage"
      class="error"
      v-html="errorMessage" />
    <!-- eslint-enable vue/no-v-html -->
    <template v-else>
      <!-- @slot Any component goes here -->
      <slot />
    </template>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onErrorCaptured,
    ref,
  } from 'vue'

  /**
   * Renders the slot content, unless it raises an error, in which case it
   * displays the message of the error. Stops further propagation of the error.
   */
  export default defineComponent({
    name: 'ErrorBoundary',
    setup() {
      const errorMessage = ref<string | null>(null)

      onErrorCaptured((err) => {
        errorMessage.value = err.message
        return false
      })

      return {
        errorMessage,
      }
    },
  })
</script>

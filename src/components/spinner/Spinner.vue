<template>
  <div class="spinner">
    <span class="edge">[</span>
    <span class="char">{{ displayText }}</span>
    <span class="edge">]</span>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue'

  /**
   * Depicts a busy state for the terminal when a long action is being executed.
   *
   * Shows a ASCII/unicode-based animation made out of text that changes at fixed intervals.
   */
  export default defineComponent({
    name: 'Spinner',
    setup() {
      const spinnerStrings = [
        '     ', '=    ', '==   ', '===  ', ' === ', '  ===', '   ==', '    =',
        '     ', '    =', '   ==', '  ===', ' === ', '===  ', '==   ', '=    ',
      ]

      const index = ref(0)
      const displayText = computed(() => spinnerStrings[index.value]
        .replace(/\s/g, '\xa0'))

      let updateLooper: number
      const startLooping = () => {
        updateLooper = window.setInterval(() => {
          index.value = (index.value + 1) % spinnerStrings.length
        }, 100)
      }
      const stopLooping = () => {
        window.clearInterval(updateLooper)
      }
      onMounted(startLooping)
      onBeforeUnmount(stopLooping)

      return {
        displayText,
      }
    },
  })
</script>

<style scoped lang="css">
  .spinner {
    font-variant-ligatures: none;
  }

  .spinner .edge {
    color: var(--spinner-edge-color, var(--color-secondary-fg));
  }

  .spinner .char {
    color: var(--spinner-char-color, var(--color-normal-fg));
  }
</style>

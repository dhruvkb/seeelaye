<template>
  <div class="spinner">{{ displayText }}</div>
</template>

<script>
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
        '[     ]', '[·    ]', '[··   ]', '[···  ]', '[ ··· ]', '[  ···]', '[   ··]', '[    ·]',
        '[     ]', '[    ·]', '[   ··]', '[  ···]', '[ ··· ]', '[···  ]', '[··   ]', '[·    ]',
      ]

      const index = ref(0)
      const displayText = computed(() => spinnerStrings[index.value]
        .replace(/\s/g, '\xa0'))

      let updateLooper
      const startLooping = () => {
        updateLooper = setInterval(() => {
          index.value = (index.value + 1) % spinnerStrings.length
        }, 100)
      }
      const stopLooping = () => {
        clearInterval(updateLooper)
      }
      onMounted(startLooping)
      onBeforeUnmount(stopLooping)

      return {
        displayText,
      }
    },
  })
</script>

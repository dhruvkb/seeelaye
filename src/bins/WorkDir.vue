<template>
  <div class="pwd">
    {{ workDir }}
  </div>
</template>

<script lang="ts">
  import { Binary } from '@/models/bin'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'
  import { binComposition } from '@/compositions/bin'

  export const binary = new Binary<[], []>(
    'WorkDir',
    'pwd',
    'Display the current working directory.',
    [],
    [],
  )

  /**
   * Displays the current working directory.
   */
  export default defineComponent({
    name: 'WorkDir',
    setup() {
      binComposition(binary)

      const seeelaye = useSeeelaye()
      const workDir = seeelaye.state.currentNode?.absolutePath ?? 'unknown'

      return {
        workDir,
      }
    },
  })
</script>

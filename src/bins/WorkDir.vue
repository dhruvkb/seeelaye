<template>
  <div class="pwd">
    {{ workDir }}
  </div>
</template>

<script lang="ts">
  import type { IBinary } from '@/models/bin'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'
  import { binComposition } from '@/compositions/bin'

  export const binary: IBinary = {
    name: 'WorkDir',
    command: 'pwd',
    description: 'Display the current working directory.',
    argSpec: {
      posArgs: [],
      kwArgs: [],
    },
  }

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

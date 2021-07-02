<template>
  <div class="hostname">
    {{ hostname }}
  </div>
</template>

<script lang="ts">
  import type { Binary } from '@/bins/type'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'
  import { binComposition } from '@/compositions/bin'

  export const binary: Binary = {
    name: 'Hostname',
    command: 'hostname',
    description: 'Display the name of the host machine.',
    argSpec: {
      posArgs: [],
      kwArgs: [],
    },
  }

  /**
   * Displays the name of the host machine.
   */
  export default defineComponent({
    name: 'Hostname',
    setup() {
      binComposition(binary)

      const seeelaye = useSeeelaye()
      const { hostname } = seeelaye.state

      return {
        hostname,
      }
    },
  })
</script>

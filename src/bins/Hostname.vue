<template>
  <div class="hostname">
    {{ hostname }}
  </div>
</template>

<script lang="ts">
  import { Binary } from '@/models/bin'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'
  import { binComposition } from '@/compositions/bin'

  export const binaryFn = (): Binary<[], []> => new Binary<[], []>(
    'Hostname',
    'hostname',
    'Display the name of the host machine.',
    [],
    [],
  )

  /**
   * Displays the name of the host machine.
   */
  export default defineComponent({
    name: 'Hostname',
    setup() {
      binComposition()

      const seeelaye = useSeeelaye()
      const { hostname } = seeelaye.state

      return {
        hostname,
      }
    },
  })
</script>

<template>
  <div class="help">
    These commands are supported. Hover over them for more info.
    <ul>
      <li
        v-for="(bin, index) in callableBins"
        :key="index">
        <Executable
          :bin="bin"
          show-args/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Binary } from '@/models/bin'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'
  import Executable from '@/components/executable/Executable.vue'
  import { binComposition } from '@/compositions/bin'

  export const binary = new Binary<[], []>(
    'Help',
    'help',
    'Show help about using the terminal.',
    [],
    [],
  )

  /**
   * Shows help about using the terminal.
   */
  export default defineComponent({
    name: 'Help',
    components: {
      Executable,
    },
    setup() {
      binComposition(binary)

      const seeelaye = useSeeelaye()
      const callableBins = Object.values(seeelaye.allBins)

      return {
        callableBins,
      }
    },
  })
</script>

<style scoped lang="css">
  ul {
    column-count: 2;
  }
</style>

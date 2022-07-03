<template>
  <div class="help">
    These commands are supported. Hover over them for more info.
    <ul>
      <li
        v-for="(bin, index) in callableBins"
        :key="index">
        <Executable
          :bin="bin"
          show-args />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import { Binary } from '@/models/bin'

  import { binComposition } from '@/compositions/bin'

  import Executable from '@/components/executable/Executable.vue'

  export const binaryFn = (): Binary<[], []> => new Binary<[], []>(
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
      binComposition()

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

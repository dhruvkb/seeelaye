<template>
  <div class="past">
    <div
      v-for="(interaction, index) in visibleHistory"
      :key="index"
      class="interaction">
      <Prompt :working-directory="interaction.context.wd" />
      {{ interaction.rawInput }}
      <br>
      <ErrorBoundary>
        <component
          :is="interaction.output.component"
          :argv="interaction.output.argv" />
      </ErrorBoundary>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import { binaryComponents } from '@/bins'

  import Prompt from '@/components/prompt/Prompt.vue'
  import ErrorBoundary from '@/components/error_boundary/ErrorBoundary.vue'

  /**
   * Shows all past interactions of the terminal that have not been hidden.
   */
  export default defineComponent({
    name: 'Past',
    components: {
      ErrorBoundary,
      Prompt,
      ...binaryComponents,
    },
    setup() {
      const seeelaye = useSeeelaye()

      const visibleHistory = computed(() => seeelaye.state
        .history
        .filter((interaction) => interaction.isVisible))

      return {
        visibleHistory,
      }
    },
  })
</script>

<style scoped lang="css">
  .interaction {
    margin-bottom: 2ex;
  }
</style>

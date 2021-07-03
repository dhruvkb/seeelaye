<template>
  <div class="past">
    <div
      v-for="(interaction, index) in visibleHistory"
      :key="index"
      class="interaction">
      <Prompt :working-directory="interaction.context.wd"/>
      {{ interaction.rawInput }}
      <br/>
      <component
        :is="interaction.output.component"
        :argv="interaction.output.argv"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineAsyncComponent, defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import Prompt from '@/components/prompt/Prompt.vue'

  export default defineComponent({
    name: 'Past',
    components: {
      Prompt,
      Hello: defineAsyncComponent(() => import('@/bins/Hello.vue')),
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

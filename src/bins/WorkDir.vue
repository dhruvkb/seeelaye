<template>
  <div class="pwd">
    {{ workDir }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import binMixin from '@/mixins/bin'

  /**
   * Displays the current working directory.
   */
  export default defineComponent({
    name: 'WorkDir',
    command: 'pwd',
    description: 'Display the current working directory.',
    mixins: [binMixin],
    computed: {
      workDir(): string {
        return this.$seeelaye.state.currentNode?.name ?? 'unknown'
      },
    },
  })
</script>

<template>
  <div class="hostname">
    {{ hostname }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import binMixin from '@/mixins/bin'

  /**
   * Displays the name of the host machine.
   */
  export default defineComponent({
    name: 'Hostname',
    command: 'hostname',
    description: 'Display the name of the host machine.',
    mixins: [binMixin],
    computed: {
      hostname(): string {
        return this.$seeelaye.state.hostname
      },
    },
  })
</script>

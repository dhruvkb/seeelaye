<template>
  <span class="prompt">
    [{{ username }}@{{ hostname }} {{ workingDirectoryName }}]$
  </span>
</template>

<script lang="ts">
  import type { PropType } from 'vue'

  import type { FsNode } from '@/models/fs_tree'

  import { computed, defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  /**
   * Displays the status of the terminal during an interaction.
   *
   * The information displayed typically contains the username, hostname and
   * working directory.
   */
  export default defineComponent({
    name: 'Prompt',
    props: {
      /**
       * node to override as the current working directory
       */
      workingDirectory: {
        type: Object as PropType<FsNode>,
      },
    },
    setup(props) {
      const seeelaye = useSeeelaye()

      const username = computed(() => seeelaye.state.username)
      const hostname = computed(() => seeelaye.state.hostname)
      const currentNodeName = computed(() => seeelaye.state.currentNode?.name)

      const workingDirectoryName = computed(() => props.workingDirectory?.name
        ?? currentNodeName.value
        ?? 'unknown')

      return {
        username,
        hostname,
        workingDirectoryName,
      }
    },
  })
</script>

<style scoped lang="css">
  .prompt {
    border-bottom: 1px solid transparent; /* to vertically align with input field */
  }
</style>

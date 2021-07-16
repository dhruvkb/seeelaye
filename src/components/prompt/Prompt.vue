<template>
  <Prompt_
    :username="username"
    :hostname="hostname"
    :working-directory-name="workingDirectoryName"/>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import type { FsNode } from '@/models/fs_tree'

  import Prompt_ from '@/components/prompt/Prompt_.vue'

  export default defineComponent({
    name: 'Prompt',
    components: { Prompt_ },
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

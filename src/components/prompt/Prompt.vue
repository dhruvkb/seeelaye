<template>
  <Prompt_
    :username="username"
    :hostname="hostname"
    :current-node-name="currentNodeName"/>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'

  import Prompt_ from '@/components/prompt/Prompt_.vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'Prompt',
    components: { Prompt_ },
    setup() {
      const store = useStore()

      const username = computed(() => store.state.terminal.username)
      const hostname = computed(() => store.state.terminal.hostname)
      const currentNodeName = computed(() => store.state.terminal.currentNode.name)

      return {
        username,
        hostname,
        currentNodeName,
      }
    },
  })
</script>

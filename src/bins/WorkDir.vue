<template>
  <div class="pwd">
    {{ workDir }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import binMixin from '@/mixins/bin'
  import { FsNode } from '@/models/fs_tree'

  /**
   * Displays the current working directory.
   */
  export default defineComponent({
    name: 'WorkDir',
    command: 'pwd',
    description: 'Display the current working directory.',
    mixins: [binMixin],
    computed: {
      currentNode(): FsNode {
        return this.$seeelaye.state.currentNode
      },
      workDir(): string {
        return this.node?.absolutePath
      },
    },
    created() {
      this.node = this.currentNode
    },
  })
</script>

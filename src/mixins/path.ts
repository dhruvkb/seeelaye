import { defineComponent } from 'vue'

import binMixin from '@/mixins/bin'
import { FsNode } from '@/models/fs_tree'

export default (nodeArgName: string) => defineComponent({
  mixins: [binMixin],
  computed: {
    nodeAtPath(): FsNode | null {
      const argValue = this.args[nodeArgName] ?? ''
      return this.$seeelaye.compute('nodeLocatedAt', {
        path: argValue,
      })
    },
    isNodeFound(): boolean {
      const { argSpec } = this.$options

      const nodeType = argSpec?.posArgs
        ?.find((arg) => arg.name === nodeArgName)
        ?.nodeType
      if (nodeType && this.node) {
        return this.node.isType(nodeType)
      }
      return false
    },
  },
  created() {
    this.node = this.nodeAtPath
  },
})

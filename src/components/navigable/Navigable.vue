<template>
  <Navigable_
    :name="node.name"
    :aliases="showAliases ? node.aliases : []"
    :is-folder="node.isFolder"
    :is-clickable="isClickable"
    @click="handleClick">
    <template
      v-for="(_, name) in $slots"
      v-slot:[name]="scope">
      <!-- @slot All slots will be passed down to `Navigable_`. -->
      <slot
        :name="name"
        v-bind="scope"/>
    </template>
  </Navigable_>
</template>

<script lang="ts">
  import type { PropType } from 'vue'

  import type { FsNode } from '@/models/fs_tree'

  import { computed, defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import Navigable_ from '@/components/navigable/Navigable_.vue'

  export default defineComponent({
    name: 'Navigable',
    components: {
      Navigable_,
    },
    props: {
      /**
       * the node for which to render the interactive link
       */
      node: {
        type: Object as PropType<FsNode>,
        required: true,
      },
      /**
       * whether to show the aliases of the node with the name
       */
      showAliases: {
        type: Boolean,
        default: false,
      },
      /**
       * whether to render the node as an interactive link; Enabling this
       * renders a `<button>` element instead of a `<span>` element.
       */
      isClickable: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const seeelaye = useSeeelaye()

      const command = computed(() => {
        const bin = props.node.isFolder ? 'cd' : 'cat'
        const argv = [props.node.absolutePath]
        return [bin, ...argv].join(' ')
      })

      const navigate = () => {
        seeelaye.dispatch('executeCmd', {
          rawInput: command.value,
        })
      }

      return {
        handleClick: navigate,
      }
    },
  })
</script>

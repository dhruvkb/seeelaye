<template>
  <component
    class="navigable"
    :class="[ node.isFolder ? 'is-folder' : 'is-file' ]"
    :is="isClickable ? 'button' : 'span'"
    @click="handleClick">
    <!-- @slot Alternative display text goes here. -->
    <slot>
      <span>{{ node.name }}</span>
      <span
        v-if="showAliases && node.aliases.length"
        class="aliases">&nbsp;(~ {{ node.aliases.join(', ') }})</span>
    </slot>
  </component>
</template>

<script lang="ts">
  import type { PropType } from 'vue'

  import type { FsNode } from '@/models/fs_tree'

  import { computed, defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  /**
   * Interactively links to a given file-system node.
   */
  export default defineComponent({
    name: 'Navigable',
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
        if (!props.isClickable) return

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

<style scoped lang="css">
  button.navigable { /* Reset UA button */
    appearance: none;

    font-family: inherit;
    font-size: inherit;
    background: none;

    padding: 0;
    border: none;
  }

  button.navigable {
    cursor: pointer;
  }

  .is-folder {
    color: var(--folder-color, var(--color-normal-cyan));
    font-weight: bold;
  }

  .is-file {
    color: var(--file-color, var(--color-normal-magenta));
    font-weight: normal;
  }

  .navigable ::v-slotted(.aliases) {
    color: var(--alias-color, var(--color-secondary-fg));
    font-weight: normal;
  }
</style>

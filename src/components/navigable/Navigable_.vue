<template>
  <component
    class="navigable"
    :class="[ isFolder ? 'is-folder' : 'is-file' ]"
    :is="isClickable ? 'button' : 'span'"
    v-on="{ click: isClickable ? handleClick : null }">
    <!-- @slot Alternative display text goes here. -->
    <slot>
      <span>{{ name }}</span>
      <span
        v-if="aliases.length"
        class="aliases">&nbsp;(~ {{ aliases.join(', ') }})</span>
    </slot>
  </component>
</template>

<script lang="ts">
  import type { PropType } from 'vue'

  import { defineComponent } from 'vue'

  /**
   * Interactively links to a given file-system node.
   */
  export default defineComponent({
    name: 'Navigable_',
    props: {
      /**
       * the name of the node being shown
       */
      name: {
        type: String,
      },
      /**
       * the list of aliases associated with the node
       */
      aliases: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
      /**
       * whether the node is a folder; If not, the node is a file.
       */
      isFolder: {
        type: Boolean,
      },
      /**
       * whether to render the node as an interactive link; Enabling this
       * renders a `<button>` element instead of a `<span>` element.
       */
      isClickable: {
        type: Boolean,
      },
    },
    setup(props, { emit }) {
      const handleClick = () => {
        emit('navigate')
      }

      return {
        handleClick,
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

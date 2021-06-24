<template>
  <component
    class="navigable"
    :class="[ isFolder ? 'is-folder' : 'is-file' ]"
    :is="isClickable ? 'button' : 'span'"
    v-on="{ click: isClickable ? handleClick : null }">
    <!-- @slot Alternative display text goes here. -->
    <slot>
      <span class="name">{{ name }}</span>
      <span
        v-if="aliases.length"
        class="aliases">&nbsp;(~ {{ aliases.join(', ') }})</span>
    </slot>
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  /**
   * Interactively links to a given filesystem node.
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
        type: Array,
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

    color: inherit;
    font: inherit;
    background: none;

    padding: 0;
    border: none;
  }

  button.navigable {
    cursor: pointer;
  }

  .navigable.is-folder .name {
    color: var(--navigable-folder-color, var(--color-normal-cyan));
    font-weight: bold;
  }

  .navigable.is-file .name {
    color: var(--navigable-file-color, var(--color-normal-magenta));
    font-weight: normal;
  }

  .navigable .aliases {
    color: var(--navigable-alias-color, var(--color-secondary-fg));
  }
</style>

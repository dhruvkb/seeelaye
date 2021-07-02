<template>
  <component
    class="executable"
    :is="isClickable ? 'button' : 'span'"
    v-on="{ click: isClickable ? handleClick : null }">
    <!-- @slot Alternative display text goes here. -->
    <slot>
      <span>{{ name }}</span>
      <span
        v-if="args.length"
        class="args">&nbsp;{{ args.join(' ') }}</span>
    </slot>
  </component>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'

  /**
   * Interactively links to a given binary.
   */
  export default defineComponent({
    name: 'Executable_',
    props: {
      /**
       * the name of the binary being shown
       */
      name: {
        type: String,
      },
      /**
       * the list of arguments associated with the binary
       */
      args: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
      /**
       * whether to render the binary as an interactive link; Enabling this
       * renders a `<button>` element instead of a `<span>` element.
       */
      isClickable: {
        type: Boolean,
      },
    },
    setup(props, { emit }) {
      const handleClick = () => {
        emit('execute')
      }

      return {
        handleClick,
      }
    },
  })
</script>

<style scoped lang="css">
  button.executable { /* Reset UA button */
    appearance: none;

    font-family: inherit;
    font-size: inherit;
    background: none;

    padding: 0;
    border: none;
  }

  button.executable {
    cursor: pointer;
  }

  .executable {
    color: var(--binary-color, var(--color-normal-green));
    font-weight: bold;
  }

  .executable ::v-slotted(.args) {
    color: var(--argument-color, var(--color-normal-blue));
    font-weight: normal;
  }
</style>

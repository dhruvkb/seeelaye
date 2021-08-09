<template>
  <component
    class="executable"
    :is="isClickable ? 'button' : 'span'"
    @click="handleClick">
    <!-- @slot Alternative display text goes here. -->
    <slot>
      <span>{{ bin.command }}</span>
      <span
        v-if="showArgs && bin.allArgs.length"
        class="args">&nbsp;{{ bin.allArgs.join(' ') }}</span>
    </slot>
  </component>
</template>

<script lang="ts">
  import type { PropType } from 'vue'

  import type { Binary } from '@/models/bin'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  /**
   * Interactively links to a given binary.
   */
  export default defineComponent({
    name: 'Executable',
    props: {
      /**
       * the binary for which to render the interactive link
       */
      bin: {
        type: Object as PropType<Binary>,
        required: true,
      },
      /**
       * whether to display the arguments of the binary in a conventional format
       */
      showArgs: {
        type: Boolean,
        default: false,
      },
      /**
       * whether to render the binary as an interactive link; Enabling this
       * renders a `<button>` element instead of a `<span>` element.
       */
      isClickable: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const seeelaye = useSeeelaye()

      const execute = () => {
        if (!props.isClickable) return

        seeelaye.dispatch('executeCmd', {
          rawInput: props.bin.command,
        })
      }

      return {
        handleClick: execute,
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

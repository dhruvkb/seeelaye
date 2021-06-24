<template>
  <!-- For best results wrap inside a `label` -->
  <input
    class="input"
    v-model="value"

    type="text"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false"

    @keydown.enter.exact="handleEnter"
    @keydown.arrow-up.exact.prevent="handleArrowUp"
    @keydown.arrow-down.exact.prevent="handleArrowDown"
    @keydown.tab.exact.prevent="handleTab"/>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'

  /**
   * Accepts typed commands from the user.
   *
   * Renders an `<input>` element so should be coupled with a `<label>` element
   * for accessibility.
   */
  export default defineComponent({
    name: 'Input_.vue',
    props: {
      /**
       * the value associated with the input field; This prop is best used via
       * `v-model` binding.
       */
      modelValue: {
        type: String,
        default: '',
      },
    },
    setup(props, { emit }) {
      const value = computed({
        get(): string {
          return props.modelValue
        },
        set(val: string) {
          emit('update:modelValue', val)
        },
      })

      const handleEnter = () => {
        emit('submit')
      }
      const handleArrowUp = () => {
        emit('traversePrev')
      }
      const handleArrowDown = () => {
        emit('traverseNext')
      }
      const handleTab = () => {
        emit('autocomplete')
      }

      return {
        value,

        handleEnter,
        handleArrowUp,
        handleArrowDown,
        handleTab,
      }
    },
  })
</script>

<style scoped lang="css">
  .input {
    appearance: none;

    color: inherit;
    font: inherit;
    caret-color: currentColor;

    background: none;

    min-width: 32ch;
    padding: 0;
    border: none;
    border-bottom: 1px dashed transparent;
  }

  .input:focus {
    outline: none;
    border-bottom-color: var(--color-secondary-fg);
  }
</style>

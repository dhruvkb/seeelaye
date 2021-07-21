<template>
  <!-- For best results wrap inside a `label` -->
  <input
    class="input"
    v-model="value"

    type="text"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false"

    @keydown.enter.exact="() => handleKeydown('enter')"
    @keydown.arrow-up.exact.prevent="() => handleKeydown('arrowUp')"
    @keydown.arrow-down.exact.prevent="() => handleKeydown('arrowDown')"
    @keydown.tab.exact.prevent="() => handleKeydown('tab')"/>
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
        get: (): string => props.modelValue,
        set: (val: string) => {
          emit('update:modelValue', val)
        },
      })

      const fireEvent = (eventName: string) => { emit(eventName) }

      return {
        value,
        handleKeydown: fireEvent,
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
    border-bottom: 1px solid transparent;
  }

  .input:focus {
    outline: none;
    border-bottom-color: var(--color-highlight-bg);
  }

  .input::placeholder {
    color: inherit;

    opacity: 0.5;
  }
</style>

<template>
  <!-- For best results wrap inside a `label` -->
  <input
    class="input"
    v-model="command"

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
  import { computed, defineComponent, ref } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  /**
   * Accepts typed commands from the user.
   *
   * Renders an `<input>` element so should be coupled with a `<label>` element
   * for accessibility.
   */
  export default defineComponent({
    name: 'Input',
    setup(props, { emit }) {
      const seeelaye = useSeeelaye()

      const command = computed({
        get: (): string => seeelaye.state.input,
        set: (val: string) => {
          seeelaye.commit('setInput', { input: val })
        },
      })

      const submit = () => {
        seeelaye.dispatch('executeCmd', {
          rawInput: command.value,
        })
        command.value = ''
      }

      const nonEmptyHistory = computed(() => seeelaye.state.history
        .filter((interaction) => Boolean(interaction.rawInput)))
      const traversalIndex = ref(0)
      const commandBackup = ref('')

      const traversePrev = () => {
        if (traversalIndex.value === nonEmptyHistory.value.length) {
          emit('error')
          return
        }

        if (traversalIndex.value === 0) {
          commandBackup.value = command.value
        }
        traversalIndex.value += 1
        const index = nonEmptyHistory.value.length - traversalIndex.value
        command.value = nonEmptyHistory.value[index].rawInput
      }

      const traverseNext = () => {
        if (traversalIndex.value === 0) {
          emit('error')
          return
        }

        traversalIndex.value -= 1
        if (traversalIndex.value === 0) {
          command.value = commandBackup.value
        } else {
          const index = nonEmptyHistory.value.length - traversalIndex.value
          command.value = nonEmptyHistory.value[index].rawInput
        }
      }

      const fireComplete = () => { emit('complete') }

      return {
        command,

        handleEnter: submit,
        handleArrowUp: traversePrev,
        handleArrowDown: traverseNext,
        handleTab: fireComplete,
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

  ::placeholder {
    color: inherit;

    opacity: 0.5;
  }
</style>

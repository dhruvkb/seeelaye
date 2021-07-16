<template>
  <Input_
    v-model="command"
    @enter="handleEnter"
    @arrow-up="handleArrowUp"
    @arrow-down="handleArrowDown"
    @tab="handleTab"/>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import Input_ from '@/components/input/Input_.vue'

  export default defineComponent({
    name: 'Input',
    components: { Input_ },
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

      const fireAutocomplete = () => { emit('autocomplete') }

      return {
        command,

        handleEnter: submit,
        handleArrowUp: traversePrev,
        handleArrowDown: traverseNext,
        handleTab: fireAutocomplete,
      }
    },
  })
</script>

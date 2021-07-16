<template>
  <div class="present">
    <label class="input-area">
      <Prompt/>
      <Input @autocomplete="autocomplete"/>
    </label>
    <ul>
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="populateInput(suggestion.text)">
        <Navigable
          v-if="suggestion.entityType === EntityType.NODE"
          :node="suggestion.value"
          :is-clickable="false"
          show-aliases/>
        <Executable
          v-if="suggestion.entityType === EntityType.BINARY"
          :bin="suggestion.value"
          :is-clickable="false"
          show-args/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { watch, defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import Prompt from '@/components/prompt/Prompt.vue'
  import Input from '@/components/input/Input.vue'
  import Navigable from '@/components/navigable/Navigable.vue'
  import Executable from '@/components/executable/Executable.vue'

  import { autocompleteComposition } from '@/compositions/autocomplete'
  import { EntityType } from '@/models/suggestion'

  export default defineComponent({
    name: 'Present',
    components: {
      Prompt,
      Input,
      Executable,
      Navigable,
    },
    setup() {
      const {
        suggestions,
        autocomplete,
        populateInput,
      } = autocompleteComposition()

      const seeelaye = useSeeelaye()
      watch(() => seeelaye.state.input, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          suggestions.value = [] // Hide suggestions when input is changed
        }
      })

      return {
        EntityType,

        suggestions,
        autocomplete,
        populateInput,
      }
    },
  })
</script>

<style scoped lang="css">
  .input-area {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 1ch;
  }

  .input-area .input {
    flex-grow: 1;
  }

  .present:focus-within {
    color: var(--color-highlight-fg);
  }
</style>

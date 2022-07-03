<template>
  <div
    class="present"
    :class="[{ 'is-hidden': !isReady }]">
    <label class="input-area">
      <Prompt />
      <Input
        placeholder="command"
        @complete="handleAutocomplete" />
    </label>
    <ul>
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="populateInput(suggestion.text)">
        <Navigable
          v-if="suggestion.entity instanceof FsNode"
          :node="suggestion.entity"
          :is-clickable="false"
          show-aliases />
        <Executable
          v-if="suggestion.entity instanceof Binary"
          :bin="suggestion.entity"
          :is-clickable="false"
          show-args />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { watch, computed, defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import { FsNode } from '@/models/fs_tree'
  import { Binary } from '@/models/bin'
  import { autocompleteComposition } from '@/compositions/autocomplete'

  import Prompt from '@/components/prompt/Prompt.vue'
  import Input from '@/components/input/Input.vue'
  import Navigable from '@/components/navigable/Navigable.vue'
  import Executable from '@/components/executable/Executable.vue'

  /**
   * Shows the presently underway interaction before it has been submitted.
   */
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
      const isReady = computed(() => seeelaye.state.isReady)

      return {
        FsNode,
        Binary,

        isReady,
        suggestions,
        populateInput,
        handleAutocomplete: autocomplete,
      }
    },
  })
</script>

<style scoped lang="css">
  .is-hidden {
    visibility: hidden;
  }

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

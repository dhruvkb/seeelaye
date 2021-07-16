<template>
  <div class="present">
    <label class="input-area">
      <Prompt/>
      <Input/>
    </label>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Prompt from '@/components/prompt/Prompt.vue'
  import Input from '@/components/input/Input.vue'

  export default defineComponent({
    name: 'Present',
    components: {
      Prompt,
      Input,
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

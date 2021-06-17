<template>
  <Input_
    v-model="command"
    @submit="submit"/>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import Input_ from '@/components/input/Input_.vue'

  export default defineComponent({
    name: 'Input',
    components: { Input_ },
    setup() {
      const command = ref('')
      const submit = () => {
        console.log(`Submitted: ${command.value}`)
      }
      const autocomplete = () => {
        console.log(`Autocomplete: ${command.value}`)
      }
      const traversePrev = () => {
        console.log(`Traverse prev: ${command.value}`)
      }
      const traverseNext = () => {
        console.log(`Traverse next: ${command.value}`)
      }

      return {
        command,

        submit,
        autocomplete,
        traversePrev,
        traverseNext,
      }
    },
  })
</script>

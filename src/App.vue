<template>
  <Hello/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Hello from '@/components/Hello.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Hello,
    },
  })
</script>

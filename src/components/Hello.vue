<template>
  <div class="hello">
    Hello, {{ name }}!
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Hello',
    props: {
      name: {
        type: String,
        default: 'World',
      },
    },
  })
</script>

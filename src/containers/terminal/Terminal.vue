<template>
  <div class="terminal">
    <div class="terminal-content">
      <Past/>
      <Present/>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Past from '@/sections/past/Past.vue'
  import Present from '@/sections/present/Present.vue'

  export default defineComponent({
    name: 'Terminal',
    components: {
      Present,
      Past,
    },
  })
</script>

<style scoped lang="css" src="../../styles/terminal.css"/>

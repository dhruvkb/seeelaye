<template>
  <div class="prompt">
    [{{ username }}@{{ hostname }} {{ currentNodeName }}]$
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  /**
   * Displays the status of the terminal during an interaction.
   *
   * The information displayed typically contains the username, hostname and
   * working directory.
   */
  export default defineComponent({
    name: 'Prompt_',
    props: {
      /**
       * the username of the current user
       */
      username: {
        type: String,
        required: true,
      },
      /**
       * the hostname of the terminal
       */
      hostname: {
        type: String,
        required: true,
      },
      /**
       * the name of the current working node
       */
      currentNodeName: {
        type: String,
        required: true,
      },
    },
  })
</script>

<style scoped lang="css">
  .prompt {
    border-bottom: 1px solid transparent; /* to vertically align with input field */
  }
</style>

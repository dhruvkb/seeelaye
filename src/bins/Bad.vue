<template>
  <div class="bad">
    Command <strong class="bin">{{ args.bin }}</strong> does not exist in the
    CLI.
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import binMixin from '@/mixins/bin'
  import { IArg } from '@/models/arg'

  /**
   * Displays the invalidity of the entered command and suggests alternatives.
   *
   * This binary is invoked when the binary entered into the input does not
   * exist.
   */
  export default defineComponent({
    name: 'Bad',
    argSpec: {
      kwArgs: [
        {
          name: 'bin',
          description: 'the invalid binary that was invoked',
          type: String,
        } as IArg<string>,
      ],
    },
    mixins: [binMixin],
  })
</script>

<style scoped lang="css">
  .bad .bin {
    color: var(--color-normal-red);
  }
</style>

<template>
  <div class="whoami">
    <template v-if="args.groot">groot</template>
    <template v-else>{{ username }}</template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import binMixin from '@/mixins/bin'

  import { IArg } from '@/models/arg'

  /**
   * Displays the name of the current active user.
   */
  export default defineComponent({
    name: 'WhoAmI',
    command: 'whoami',
    description: 'Display the name of the current active user.',
    argSpec: {
      kwArgs: [
        {
          name: 'groot',
          description: 'whether to run command as Groot',
          aliases: ['g'],
          type: Boolean,
          default: false,
        } as IArg<boolean>,
      ],
    },
    mixins: [binMixin],
    computed: {
      username(): string {
        return this.$seeelaye.state.username
      },
    },
  })
</script>

<template>
  <div class="whoami">
    {{ username }}
  </div>
</template>

<script lang="ts">
  import type { IBinary } from '@/models/bin'
  import type { IArg } from '@/models/arg'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'
  import { binProps, binComposition } from '@/compositions/bin'

  export const binary: IBinary = {
    name: 'WhoAmI',
    command: 'whoami',
    description: 'Display the name of the current active user.',
    argSpec: {
      posArgs: [],
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
  }

  /**
   * Displays the name of the current active user.
   */
  export default defineComponent({
    name: 'WhoAmI',
    props: binProps,
    setup(props) {
      const { processedArgs } = binComposition(binary)
      const args = processedArgs(props.argv)

      const seeelaye = useSeeelaye()
      const username = args.groot ? 'groot' : seeelaye.state.username

      return {
        username,
      }
    },
  })
</script>

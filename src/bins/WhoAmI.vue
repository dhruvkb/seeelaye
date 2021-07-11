<template>
  <div class="whoami">
    {{ username }}
  </div>
</template>

<script lang="ts">
  import { Binary } from '@/models/bin'
  import { Arg, ArgType } from '@/models/arg'

  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'
  import { binComposition, binProps } from '@/compositions/bin'

  const groot = new Arg<boolean>(
    ArgType.KEYWORD,
    'groot',
    'whether to run command as Groot',
    Boolean,
    false,
    ['g'],
  )
  export const binary = new Binary<[], [boolean]>(
    'WhoAmI',
    'whoami',
    'Display the name of the current active user.',
    [],
    [groot],
  )

  /**
   * Displays the name of the current active user.
   */
  export default defineComponent({
    name: 'WhoAmI',
    props: binProps,
    setup(props) {
      const { processArgs } = binComposition(binary)
      processArgs(props.argv)

      const grootValue = groot.value

      const seeelaye = useSeeelaye()
      const username = grootValue ? 'groot' : seeelaye.state.username

      return {
        username,
      }
    },
  })
</script>

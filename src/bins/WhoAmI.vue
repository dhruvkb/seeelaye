<template>
  <div class="whoami">
    {{ username }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import { Binary } from '@/models/bin'
  import { Arg, ArgType } from '@/models/arg'

  import { binComposition, binProps } from '@/compositions/bin'

  const grootFn = () => new Arg<boolean>(
    ArgType.KEYWORD,
    'groot',
    'whether to run command as Groot',
    Boolean,
    false,
    ['g'],
  )
  export const binaryFn = (): Binary<[], [Arg<boolean>]> => {
    const groot = grootFn()
    return new Binary<[], [Arg<boolean>]>(
      'WhoAmI',
      'whoami',
      'Display the name of the current active user.',
      [],
      [groot],
    )
  }

  /**
   * Displays the name of the current active user.
   */
  export default defineComponent({
    name: 'WhoAmI',
    props: binProps,
    setup(props) {
      const binary = binaryFn()
      const groot = binary.kwargs[0]

      binComposition()
      binary.processArgs(props.argv)

      const grootValue = groot.value

      const seeelaye = useSeeelaye()
      const username = grootValue ? 'groot' : seeelaye.state.username

      return {
        username,
      }
    },
  })
</script>

<template>
  <Executable_
    :name="bin.command"
    :args="showArgs ? argRepr : []"
    :is-clickable="isClickable"
    @execute="handleExecute">
    <template
      v-for="(_, name) in $slots"
      v-slot:[name]="scope">
      <!-- @slot All slots will be passed down to `Executable_`. -->
      <slot
        :name="name"
        v-bind="scope"/>
    </template>
  </Executable_>
</template>

<script lang="ts">
  import type { Binary } from '@/models/bin'
  import type { PropType } from 'vue'

  import { computed, defineComponent } from 'vue'

  import Executable_ from '@/components/executable/Executable_.vue'

  import { useSeeelaye } from '@/base/injection'

  export default defineComponent({
    name: 'Executable',
    components: {
      Executable_,
    },
    props: {
      /**
       * the binary for which to render the interactive link
       */
      bin: {
        type: Object as PropType<Binary>,
        required: true,
      },
      /**
       * whether to display the arguments of the binary in a conventional format
       */
      showArgs: {
        type: Boolean,
        default: false,
      },
      /**
       * whether to render the binary as an interactive link; Enabling this
       * renders a `<button>` element instead of a `<span>` element.
       */
      isClickable: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const seeelaye = useSeeelaye()

      const argRepr = computed(() => props.bin.allArgs)

      const handleExecute = () => {
        seeelaye.dispatch('executeCmd', {
          rawInput: props.bin.command,
        })
      }

      return {
        argRepr,

        handleExecute,
      }
    },
  })
</script>

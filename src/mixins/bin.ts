import type { PropType } from 'vue'
import type { Handler } from 'arg'

import { defineComponent } from 'vue'
import argLib from 'arg'

/**
 * This mixin provides basic functions shared across all see·el·aye binaries:
 *
 * - argument vector input via prop
 * - argument parsing into positional and keyword arguments
 * - terminal ready-state management
 *
 * It is recommended to add this as a mixin on custom defined binaries.
 */
export default defineComponent({
  props: {
    /**
     * the raw list of arguments passed to the binary
     */
    argv: {
      type: Array as PropType<string[]>,
    },
  },
  data() {
    return {
      /**
       * whether to mark the terminal as ready as soon as the component
       * is mounted; This should be set to false on long-running bins like `cat`.
       */
      markReadyOnMount: true,
    }
  },
  computed: {
    /**
     * Get the parsed list of arguments. The arguments are parsed into two sets,
     * positional and keyword arguments
     *
     * @return the parsed mapping of argument names to values
     */
    args() {
      const args: Record<string, string | Handler | undefined> = {}
      if (!this.argv) return args

      // Generate spec compatible with the arg library
      const { argSpec } = this.$options
      const kwArgs = argSpec?.kwArgs ?? [] // Keyword arguments
      const posArgs = argSpec?.posArgs ?? [] // Positional arguments

      const spec: Record<string, string | Handler> = {}
      kwArgs.forEach((arg) => {
        // The full name of the keyword argument is mapped to a type handler.
        spec[`--${arg.name}`] = arg.type

        // Aliases for the keyword argument are mapped to the full name.
        arg.aliases?.forEach((alias) => {
          spec[`-${alias}`] = `--${arg.name}`
        })
      })

      // Parse the argument vector using the generated spec
      const processedArgs = argLib(
        spec,
        {
          argv: this.argv ?? [],
          permissive: true,
        },
      )

      // Extract keyword and positional arguments from the parsed result
      kwArgs.forEach((arg) => {
        args[arg.name] = processedArgs[`--${arg.name}`]
      })
      posArgs.forEach((arg) => {
        args[arg.name] = processedArgs._.shift() || arg.default
      })

      return args
    },
  },
  methods: {
    /**
     * Set the ready-state of the terminal. This state is toggled by committing
     * the `setIsReady` mutation.
     *
     * @param isReady - whether the terminal is ready to accept new input
     */
    setTerminalReady(isReady: boolean): void {
      this.$seeelaye.commit('setIsReady', { isReady })
    },
  },
  mounted() {
    if (this.markReadyOnMount) {
      this.setTerminalReady(true)
    }
  },
})

import type { Binary } from '@/models/bin'

import { FsNode } from '@/models/fs_tree'

/**
 * A class that implements one interaction of the CLI. Each interaction consists
 * of the context, an input and the output generated based on the input and the
 * context.
 */
export class Interaction {
  static allBins: Record<string, Binary> = {}

  /**
   * the circumstances in which command was executed; This should contain a
   * snapshot of the terminal store, but for now it only records the working
   * directory.
   */
  context: {
    /**
     * the working directory at the time of execution of the command
     */
    wd: FsNode
  }

  /**
   * the exact string of the input command
   */
  rawInput: string
  /**
   * the processed input command; The command is split at whitespaces, with the
   * first part being the binary and all subsequent parts being its arguments.
   */
  input: {
    /**
     * the name of the binary invoked in the command
     */
    bin: string
    /**
     * the list of arguments to be passed to the binary
     */
    argv: string[]
  }

  /**
   * the processed output; This maps the bin from `input` to a component name
   * and can make changes to the argument vector, if needed.
   */
  output!: {
    /**
     * the name of the component to render for the given command; Blank inputs
     * map to `Nop` and invalid binary names map to `Bad`.
     */
    component: string
    /**
     * the list of arguments to be passed to the component in the `argv` prop
     */
    argv: string[]
  }

  /**
   * whether this interaction should be visible in the past section of the
   * terminal; This is `true` by default and the `clear` command sets this to
   * `false`.
   */
  isVisible: boolean

  /**
   * Create a new object of class `Interaction`.
   *
   * @param context - the circumstances in which command was executed
   * @param rawInput - the exact string of the input command
   */
  constructor(context: { wd: FsNode }, rawInput: string) {
    this.context = context
    this.rawInput = rawInput

    const [bin, ...argv] = rawInput.split(/\s+/)
    this.input = {
      bin,
      argv,
    }

    this.isVisible = true
  }

  /**
   * Process the given input into an output binary and its arguments. Special
   * cases like no input or unknown binary are handled at this stage. Invalid
   * arguments to a binary are not handled at this step.
   */
  processOutput(): void {
    if (!this.rawInput) {
      this.output = {
        component: 'Nop',
        argv: [],
      }
      return
    }
    const binary = Interaction.allBins[this.input.bin]
    if (binary) {
      this.output = {
        component: binary.name,
        argv: this.input.argv,
      }
    } else {
      this.output = {
        component: 'Bad',
        argv: [this.input.bin],
      }
    }
  }

  /**
   * Sets the interaction visibility to hidden. The onus of actually hiding the
   * interaction from the user is not on the model.
   */
  hide(): void {
    this.isVisible = false
  }
}

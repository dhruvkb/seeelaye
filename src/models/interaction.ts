import { builtInBins } from '@/bins'

import { FsNode } from '@/models/fs_tree'

export interface IInteraction {
  context: {
    wd: FsNode
  }

  rawInput: string
  input: {
    bin: string
    argv: string[]
  }

  output?: {
    component: string,
    argv: string[]
  }
}

/**
 * A class that implements one interaction of the CLI. Each interaction consists
 * of the context, an input and the output generated based on the input and the
 * context.
 */
export class Interaction implements IInteraction {
  static allBins = builtInBins

  context: {
    wd: FsNode
  }

  rawInput: string
  input: {
    bin: string
    argv: string[]
  }

  output?: {
    component: string,
    argv: string[]
  }

  isVisible: boolean

  /**
   * Create a new object of class `Interaction`.
   *
   * @param wd - the working directory in which command was executed
   * @param rawInput - the exact string of the executed command
   */
  constructor(wd: FsNode, rawInput: string) {
    this.context = {
      wd,
    }

    this.rawInput = rawInput
    const [bin, ...argv] = rawInput.split(' ')
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
    if (!Interaction.allBins) {
      throw new Error('No binaries configured in terminal')
    }

    if (!this.rawInput) {
      this.output = {
        component: 'Nop',
        argv: [],
      }
      return
    }
    const bin = Interaction.allBins[this.input.bin]
    if (!bin) {
      this.output = {
        component: 'Bad',
        argv: ['--bin', this.input.bin],
      }
    } else {
      this.output = {
        component: bin.name,
        argv: this.input.argv,
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

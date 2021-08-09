import argLib from 'arg'

import type { AArg, Handler } from '@/models/arg'

export class Binary<
  A extends AArg<unknown>[] = AArg<unknown>[],
  K extends AArg<unknown>[] = AArg<unknown>[]
> {
  /**
   * the name of the Vue component to render for this binary
   */
  name: string
  /**
   * the command that invokes this binary
   */
  command: string
  /**
   * a short description of what the binary does
   */
  description: string

  /**
   * array of argument specifications accepted by the binary
   */
  args: A
  /**
   * array of keyword argument specifications accepted by the binary
   */
  kwargs: K

  /**
   * Create a new object of class `Binary`.
   * @param name - the name of the Vue component to render for this binary
   * @param command - the command that invokes this binary
   * @param description - a short description of what the binary does
   * @param args - array of argument specifications accepted by the binary
   * @param kwargs - array of keyword argument specifications accepted by the binary
   */
  constructor(
    name: string,
    command: string,
    description: string,
    args: A,
    kwargs: K,
  ) {
    this.name = name
    this.command = command
    this.description = description
    this.args = args
    this.kwargs = kwargs
  }

  /**
   * Get an array of the string representations of all the arguments.
   * @returns an array of the string representations of all the arguments
   */
  get allArgs(): string[] {
    return [
      ...this.kwargs.map((kwarg: AArg<unknown>) => kwarg.repr),
      ...this.args.map((arg: AArg<unknown>) => arg.repr),
    ]
  }

  /**
   * Convert the object to a POJO for serializing to JSON.
   * @returns a simplified POJO representation of the `Binary` instance
   */
  toJSON(): StaticBinary {
    return {
      name: this.name,
      command: this.command,
      allArgs: this.allArgs,
    }
  }

  /**
   * Process the given argument vector to assign values to all arguments.
   * @param argv - the argument vector passed to the given binary
   */
  processArgs(argv: string[]): void {
    // Generate spec compatible with the arg library
    const spec: Record<string, string | Handler> = {}
    this.kwargs.forEach((arg) => {
      // The full name of the keyword argument is mapped to a type handler.
      spec[`--${arg.name}`] = arg.handler

      // Aliases for the keyword argument are mapped to the full name.
      arg.aliases?.forEach((alias) => {
        spec[`-${alias}`] = `--${arg.name}`
      })
    })

    // Parse the argument vector using the generated spec
    const processed = argLib(spec, {
      argv,
      permissive: true,
    })

    // Extract keyword and positional arguments from the parsed result
    this.kwargs.forEach((arg) => {
      arg.setHandlerValue(processed[`--${arg.name}`])
    })
    this.args.forEach((arg) => {
      const value = processed._.shift()
      if (value) {
        arg.setHandlerValue(value)
      } else if (arg.isRequired) {
        throw new Error(`Required argument <strong>${arg.name}</strong> was not provided to <strong>${this.command}</strong>.`)
      }
    })
  }
}

export type StaticBinary = Pick<Binary, 'name' | 'command' | 'allArgs'>

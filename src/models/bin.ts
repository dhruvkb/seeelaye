import type { IArg } from '@/models/arg'

export interface IBinary {
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
   * specification of the keyword and positional arguments taken by the binary
   */
  argSpec: {
    /**
     * array of positional arguments
     */
    posArgs: (IArg<string> | IArg<number> | IArg<boolean>)[]
    /**
     * array of keyword arguments
     */
    kwArgs: (IArg<string> | IArg<number> | IArg<boolean>)[]
  }
}

import type { InjectionKey } from 'vue'

import type { Seeelaye } from '@/base/seeelaye'

import { inject } from 'vue'

export const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

export const PolySymbol = (name: string): symbol | string => (hasSymbol ? Symbol(name) : name)

export const seeelayeKey = PolySymbol('seeelaye') as InjectionKey<Seeelaye>

/**
 * Get the see·el·aye instance installed in the application. This is the
 * composition API counterpart to using `$seeelaye` in the template or from the
 * options API.
 *
 * @returns the current app's see·el·aye instance
 */
export function useSeeelaye(): Seeelaye {
  const seeelaye = inject(seeelayeKey)
  if (!seeelaye) {
    throw new Error('see·el·aye is not installed.')
  }
  return seeelaye
}

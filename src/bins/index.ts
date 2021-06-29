import type { Component } from 'vue'

import type { BinaryOptions } from '@/global_extensions'

import Nop from '@/bins/Nop.vue'
import Bad from '@/bins/Bad.vue'

import Hello from '@/bins/Hello.vue'
import Hostname from '@/bins/Hostname.vue'
import WhoAmI from '@/bins/WhoAmI.vue'
import WorkDir from '@/bins/WorkDir.vue'

export type Binary = Component & BinaryOptions

const binComponents: Binary[] = [
  Nop,
  Bad,

  Hello,
  Hostname,
  WhoAmI,
  WorkDir,
]

const callableComponents: [string, Binary][] = []
const nonCallableComponents: [string, Binary][] = []

binComponents.forEach((component) => {
  if (component.command) {
    callableComponents.push([component.command, component])
  } else if (component.name) {
    nonCallableComponents.push([component.name ?? '', component])
  }
})

export const callableBins = Object.fromEntries<Binary>(callableComponents)

export const nonCallableBins = Object.fromEntries<Binary>(nonCallableComponents)

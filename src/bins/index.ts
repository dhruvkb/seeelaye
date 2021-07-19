import type { Component } from 'vue'

import type { Binary } from '@/models/bin'

import ChangeDir, { binaryFn as cdBinary } from '@/bins/ChangeDir.vue'
import Clear, { binaryFn as clearBinary } from '@/bins/Clear.vue'
import Hello, { binaryFn as helloBinary } from '@/bins/Hello.vue'
import Help, { binaryFn as helpBinary } from '@/bins/Help.vue'
import Hostname, { binaryFn as hostnameBinary } from '@/bins/Hostname.vue'
import List, { binaryFn as lsBinary } from '@/bins/List.vue'
import Manual, { binaryFn as manBinary } from '@/bins/Manual.vue'
import Tree, { binaryFn as treeBinary } from '@/bins/Tree.vue'
import WhoAmI, { binaryFn as whoamiBinary } from '@/bins/WhoAmI.vue'
import WorkDir, { binaryFn as pwdBinary } from '@/bins/WorkDir.vue'

export const builtInBinaries: Record<string, Binary> = Object.fromEntries([
  cdBinary,
  clearBinary,
  helloBinary,
  helpBinary,
  hostnameBinary,
  lsBinary,
  manBinary,
  treeBinary,
  whoamiBinary,
  pwdBinary,
].map((binaryFn: () => Binary): [string | symbol, Binary] => {
  const binary = binaryFn()
  return [
    binary.command,
    binary,
  ]
}))

export const binaryComponents: Record<string, Component> = {
  ChangeDir,
  Clear,
  Hello,
  Help,
  Hostname,
  List,
  Manual,
  Tree,
  WhoAmI,
  WorkDir,
}

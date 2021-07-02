import type { Component } from 'vue'

import type { Binary } from '@/bins/type'

import ChangeDir, { binary as cdBinary } from '@/bins/ChangeDir.vue'
import Clear, { binary as clearBinary } from '@/bins/Clear.vue'
import Hello, { binary as helloBinary } from '@/bins/Hello.vue'
import Help, { binary as helpBinary } from '@/bins/Help.vue'
import Hostname, { binary as hostnameBinary } from '@/bins/Hostname.vue'
import List, { binary as lsBinary } from '@/bins/List.vue'
import Manual, { binary as manBinary } from '@/bins/Manual.vue'
import Tree, { binary as treeBinary } from '@/bins/Tree.vue'
import WhoAmI, { binary as whoamiBinary } from '@/bins/WhoAmI.vue'
import WorkDir, { binary as pwdBinary } from '@/bins/WorkDir.vue'

export const builtInBinaries: Record<string, Binary> = Object.fromEntries([
  cdBinary,
  clearBinary,
  helloBinary,
  helpBinary,
  hostnameBinary,
  lsBinary,
  treeBinary,
  manBinary,
  pwdBinary,
  whoamiBinary,
].map((binary: Binary): [string | symbol, Binary] => [binary.command, binary]))

export const binaryComponents: Record<string, Component> = {
  [cdBinary.command]: ChangeDir,
  [clearBinary.command]: Clear,
  [helloBinary.command]: Hello,
  [helpBinary.command]: Help,
  [hostnameBinary.command]: Hostname,
  [lsBinary.command]: List,
  [manBinary.command]: Manual,
  [treeBinary.command]: Tree,
  [pwdBinary.command]: WorkDir,
  [whoamiBinary.command]: WhoAmI,
}

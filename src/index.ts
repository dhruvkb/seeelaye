/**
 * see·el·aye, _as in CLI_, is a terminal-emulator-emulator for the browser,
 * written in Vue.
 *
 * @packageDocumentation
 */

// God class
export { Seeelaye } from '@/base/seeelaye'
export { seeelayeKey, useSeeelaye } from '@/base/injection'

// Models
export { Binary } from '@/models/bin'
export { ArgType, Arg, NodeArg } from '@/models/arg'
export { nameExtSplit, FsNodeType, FsNode } from '@/models/fs_tree'
export { Interaction } from '@/models/interaction'

// Vuex
export { getVuexModule } from '@/store'
export { TerminalState } from '@/store/state'

// Compositions
export { binProps, binComposition } from '@/compositions/bin'
export { pathComposition } from '@/compositions/path'

// Components
export { default as Executable } from '@/components/executable/Executable.vue'
export { default as Navigable } from '@/components/navigable/Navigable.vue'
export { default as Spinner } from '@/components/spinner/Spinner.vue'
export { default as Terminal } from '@/containers/terminal/Terminal.vue'

// eslint-disable-next-line import/export
export * from '@/global_extensions'

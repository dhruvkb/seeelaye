import type { Ref } from 'vue'

import type { Binary } from '@/models/bin'
import type { FsNode } from '@/models/fs_tree'
import type { ISuggestion } from '@/models/suggestion'

import { computed, ref } from 'vue'

import { useSeeelaye } from '@/base/injection'

import { specialNames, pathSplit } from '@/models/fs_tree'

export interface IAutocompleteComposition {
  suggestions: Ref<ISuggestion[]>
  autocomplete: () => void
  populateInput: (suggestion: string) => void
}

export const autocompleteComposition = (): IAutocompleteComposition => {
  const seeelaye = useSeeelaye()

  const completeBin = (partialBinCmd: string): ISuggestion<Binary>[] => {
    const allBinCmds = Object.keys(seeelaye.allBins)
    return allBinCmds
      .filter((name) => name.startsWith(partialBinCmd))
      .map((name: string): ISuggestion<Binary> => ({
        entity: seeelaye.allBins[name],
        text: `${name} `,
      }))
  }

  const completePath = (partialPath: string): ISuggestion<FsNode>[] => {
    let node: FsNode
    if (seeelaye.state.currentNode) {
      node = seeelaye.state.currentNode
    } else {
      throw new Error('Cannot determine working directory.')
    }

    const suggestion: string[] = []

    const pathParts = pathSplit(partialPath)
    let i = 0
    let isCompleted = true
    for (; i < pathParts.length; i += 1) {
      const pathPart = pathParts[i]
      let suggestionPart: string | null = null

      if (i === 0 && seeelaye.state.tree?.hasName(pathPart)) {
        suggestionPart = pathPart
        node = seeelaye.state.tree
      } else if (specialNames.CURRENT_DIR.includes(pathPart)) {
        // Do nothing as . refers to current directory
        [, suggestionPart] = specialNames.CURRENT_DIR
      } else if (specialNames.PARENT_DIR.includes(pathPart)) {
        [, suggestionPart] = specialNames.PARENT_DIR
        node = node.parent
      } else {
        const noSlash = pathPart.replace('/', '')
        const children = node.children.filter((child) => child.hasName(noSlash, true))
        if (children.length === 0) { // No matches, stop traversal
          isCompleted = false
          break
        } else if (children.length === 1) {
          [node] = children
        } else { // Multiple matches, stop gobbling and return choices
          return children.map((child): ISuggestion<FsNode> => ({
            entity: child,
            text: [...suggestion, suggestionPart ?? child.autocompleteName].join(''),
          }))
        }
      }

      // Single match found, gobble and continue
      suggestion.push(suggestionPart ?? node.autocompleteName)
    }

    if (!isCompleted) {
      suggestion.push(...pathParts.slice(i))
    }

    if (partialPath === suggestion.join('') && node?.isFolder) {
      return node.children.map((item) => ({
        entity: item,
        text: [...suggestion, item.autocompleteName].join(''),
      }))
    }

    return [{
      entity: node,
      text: suggestion.join(''),
    }]
  }

  const command = computed(() => seeelaye.state.input)
  const suggestions = ref<ISuggestion[]>([])

  const populateInput = (suggestion: string) => {
    const parts = command.value.split(/\s+/)
    seeelaye.commit('setInput', {
      input: [...parts.slice(0, -1), suggestion].join(' '),
    })
    suggestions.value = []
  }

  const autocomplete = () => {
    const [bin, ...argv] = command.value.split(/\s+/)
    if (argv.length) {
      const [lastArg] = argv.slice(-1)
      suggestions.value = completePath(lastArg)
    } else {
      suggestions.value = completeBin(bin)
    }

    if (suggestions.value.length === 1) {
      populateInput(suggestions.value[0].text)
    }
  }

  return {
    suggestions,
    autocomplete,
    populateInput,
  }
}

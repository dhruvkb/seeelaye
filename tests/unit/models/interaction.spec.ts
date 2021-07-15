import { builtInBinaries } from '@/bins'
import { Interaction } from '@/models/interaction'
import { FsNode, FsNodeType } from '@/models/fs_tree'

describe('Interaction', () => {
  let context: { wd: FsNode }

  beforeEach(() => {
    context = {
      wd: new FsNode(FsNodeType.FILE, 'name'),
    }
  })

  describe('constructor', () => {
    it('it chops down input into bin and argv', () => {
      const interaction = new Interaction(context, 'bin arg1 arg2')
      expect(interaction.input.bin).toEqual('bin')
      expect(interaction.input.argv).toEqual(['arg1', 'arg2'])
    })

    it('creates visible interactions', () => {
      const interaction = new Interaction(context, 'bin')
      expect(interaction.isVisible).toBe(true)
    })
  })

  describe('processOutput', () => {
    beforeEach(() => {
      Interaction.allBins = builtInBinaries
    })

    it('shows Nop no-op input', () => {
      const interaction = new Interaction(context, '')
      interaction.processOutput()
      expect(interaction.output?.component).toEqual('Nop')
      expect(interaction.output?.argv).toEqual([])
    })

    it('shows Bad for input with unknown binary', () => {
      const interaction = new Interaction(context, 'unknown')
      interaction.processOutput()
      expect(interaction.output?.component).toEqual('Bad')
      expect(interaction.output?.argv).toEqual(['unknown'])
    })

    it('shows Bad for non-callable binary', () => {
      const interaction = new Interaction(context, 'bad')
      interaction.processOutput()
      expect(interaction.output?.component).toEqual('Bad')
      expect(interaction.output?.argv).toEqual(['bad'])
    })

    it('returns the mapped component for valid binary', () => {
      const interaction = new Interaction(context, 'hello arg1 arg2')
      interaction.processOutput()
      expect(interaction.output?.component).toEqual('Hello')
      expect(interaction.output?.argv).toEqual(['arg1', 'arg2'])
    })

    it('splits multiple spaces same as a single space', () => {
      const interaction = new Interaction(context, 'hello  arg1   arg2')
      interaction.processOutput()
      expect(interaction.output?.component).toEqual('Hello')
      expect(interaction.output?.argv).toEqual(['arg1', 'arg2'])
    })
  })

  describe('hide', () => {
    it('marks interaction as hidden', () => {
      const interaction = new Interaction(context, '')
      interaction.hide()
      expect(interaction.isVisible).toBe(false)
    })
  })
})

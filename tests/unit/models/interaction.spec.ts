import { Interaction } from '@/models/interaction'
import { FsNode, FsNodeType } from '@/models/fs_tree'

describe('Interaction', () => {
  let wd: FsNode

  beforeEach(() => {
    wd = new FsNode(FsNodeType.FILE, 'name')
  })

  describe('constructor', () => {
    it('it chops down input into bin and argv', () => {
      const interaction = new Interaction(wd, 'bin arg1 arg2')
      expect(interaction.input.bin).toEqual('bin')
      expect(interaction.input.argv).toEqual(['arg1', 'arg2'])
    })

    it('creates visible interactions', () => {
      const interaction = new Interaction(wd, 'bin')
      expect(interaction.isVisible).toBe(true)
    })
  })

  describe('processOutput', () => {
    it('shows Nop no-op input', () => {
      const interaction = new Interaction(wd, '')
      interaction.processOutput()
      expect(interaction.output?.component).toEqual('Nop')
      expect(interaction.output?.argv).toEqual([])
    })

    it('shows Bad for input with unknown binary', () => {
      const interaction = new Interaction(wd, 'unknown')
      interaction.processOutput()
      expect(interaction.output?.component).toEqual('Bad')
      expect(interaction.output?.argv).toEqual(['--bin', 'unknown'])
    })

    it('shows Bad for non-callable binary', () => {
      const interaction = new Interaction(wd, 'bad')
      interaction.processOutput()
      expect(interaction.output?.component).toEqual('Bad')
      expect(interaction.output?.argv).toEqual(['--bin', 'bad'])
    })

    it('returns the mapped component for valid binary', () => {
      const interaction = new Interaction(wd, 'hello arg1 arg2')
      interaction.processOutput()
      expect(interaction.output?.component).toEqual('Hello')
      expect(interaction.output?.argv).toEqual(['arg1', 'arg2'])
    })
  })

  describe('hide', () => {
    it('marks interaction as hidden', () => {
      const interaction = new Interaction(wd, '')
      interaction.hide()
      expect(interaction.isVisible).toBe(false)
    })
  })
})

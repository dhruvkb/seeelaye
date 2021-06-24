import { Story } from '@storybook/vue3'

import Navigable from '@/components/navigable/Navigable_.vue'

export default {
  title: 'Elements/Navigable',
  component: Navigable,
  argTypes: {
    navigate: {
      description: 'emitted when the link is clicked to navigate to the node',
      action: 'navigate',
    },
  },
}

interface IArgs {
  name: string
  aliases: string[]
  isFolder: boolean
  isClickable: boolean
  style: Record<string, string>
}

const Template: Story<IArgs> = (args: IArgs) => ({
  components: { Navigable },
  setup() {
    return { args }
  },
  template: `
    <Navigable
      v-bind="args"
      v-on="args"/>
  `,
})

export const Default: Story<IArgs> = Template.bind({})
Default.args = {
  name: 'name',
  aliases: ['alias', 'nickname'],
  isFolder: true,
  isClickable: true,
}

export const Styled: Story<IArgs> = Template.bind({})
Styled.args = {
  ...Default.args,
  style: {
    '--navigable-folder-color': 'var(--color-normal-green)',
    '--navigable-file-color': 'var(--color-normal-blue)',
    '--navigable-alias-color': 'var(--color-normal-fg)',
  },
}

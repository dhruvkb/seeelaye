import type { Story } from '@storybook/vue3'

import Executable from '@/components/executable/Executable_.vue'

export default {
  title: 'Elements/Executable',
  component: Executable,
  argTypes: {
    execute: {
      description: 'emitted when the link is clicked to execute the binary',
      action: 'execute',
    },
  },
}

interface IArgs {
  name: string
  args: string[]
  isClickable: boolean
  style: Record<string, string>
}

const Template: Story<IArgs> = (args: IArgs) => ({
  components: { Executable },
  setup() {
    return { args }
  },
  template: `
    <Executable
      v-bind="args"
      v-on="args"/>
  `,
})

export const Default: Story<IArgs> = Template.bind({})
Default.args = {
  name: 'name',
  args: ['argument', 'parameter'],
  isClickable: true,
}

export const Styled: Story<IArgs> = Template.bind({})
Styled.args = {
  ...Default.args,
  style: {
    '--executable-name-color': 'var(--color-normal-cyan)',
    '--executable-arg-color': 'var(--color-normal-magenta)',
  },
}

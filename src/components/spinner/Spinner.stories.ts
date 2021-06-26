import type { Story } from '@storybook/vue3'

import Spinner from '@/components/spinner/Spinner.vue'

export default {
  title: 'Elements/Spinner',
  component: Spinner,
}

interface IArgs {
  style: Record<string, string>
}

const Template: Story<IArgs> = (args: IArgs) => ({
  components: { Spinner },
  setup() {
    return { args }
  },
  template: `
    <Spinner v-bind="args"/>
  `,
})

export const Default = Template.bind({})

export const Styled = Template.bind({})
Styled.args = {
  ...Default.args,
  style: {
    '--spinner-edge-color': 'var(--color-normal-blue)',
    '--spinner-char-color': 'var(--color-normal-yellow)',
  },
}

import { Story } from '@storybook/vue3'

import Prompt from '@/components/prompt/Prompt_.vue'

export default {
  title: 'Elements/Prompt',
  component: Prompt,
}

const Template: Story = (args: Record<string, unknown>) => ({
  components: { Prompt },
  setup() {
    return { args }
  },
  template: `
    <Prompt v-bind="args"/>
  `,
})

export const Default = Template.bind({})
Default.args = {
  username: 'dhruvkb',
  hostname: 'guest',
  currentNodeName: '~',
}

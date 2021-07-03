import type { Story } from '@storybook/vue3'

import { terminalContent } from '@/../.storybook/terminal_content'
import { terminalHistory } from '@/../.storybook/terminal_history'

import Past from '@/sections/past/Past.vue'

export default {
  title: 'Sections/Past',
  component: Past,
  decorators: [
    terminalHistory,
    terminalContent,
  ],
}

const Template: Story = () => ({
  components: { Past },
  template: `
    <Past/>
  `,
})

export const Default = Template.bind({})

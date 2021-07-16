import type { Story } from '@storybook/vue3'

import { terminalContent } from '@/../.storybook/terminal_content'

import Present from '@/sections/present/Present.vue'

export default {
  title: 'Sections/Present',
  component: Present,
  decorators: [
    terminalContent,
  ],
}

const Template: Story = () => ({
  components: { Present },
  template: `
    <Present/>
  `,
})

export const Default = Template.bind({})

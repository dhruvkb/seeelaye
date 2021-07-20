// eslint-disable-next-line import/no-extraneous-dependencies
import { withThemes } from '@dhruvkb/storybook-addon-themes/dist/vue'
import type { Story } from '@storybook/vue3'

import { terminalHistory } from '@/../.storybook/terminal_history'

import Past from '@/sections/past/Past.vue'

export default {
  title: 'Sections/Past',
  component: Past,
  decorators: [
    terminalHistory,
    withThemes,
  ],
}

const Template: Story = () => ({
  components: { Past },
  template: `
    <Past/>
  `,
})

export const Default = Template.bind({})

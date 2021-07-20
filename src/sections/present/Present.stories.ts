// eslint-disable-next-line import/no-extraneous-dependencies
import { withThemes } from '@dhruvkb/storybook-addon-themes/dist/vue'
import type { Story } from '@storybook/vue3'

import Present from '@/sections/present/Present.vue'

export default {
  title: 'Sections/Present',
  component: Present,
  decorators: [
    withThemes,
  ],
}

const Template: Story = () => ({
  components: { Present },
  template: `
    <Present/>
  `,
})

export const Default = Template.bind({})

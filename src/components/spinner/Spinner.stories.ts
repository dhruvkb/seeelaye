import { Story } from '@storybook/vue3'

import Spinner from '@/components/spinner/Spinner.vue'

export default {
  title: 'Elements/Spinner',
  component: Spinner,
}

const Template: Story = () => ({
  components: { Spinner },
  template: `
    <Spinner/>
  `,
})

export const Default = Template.bind({})

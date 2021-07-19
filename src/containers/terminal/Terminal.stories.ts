import Terminal from '@/containers/terminal/Terminal.vue'

import { terminalContent } from '@/../.storybook/terminal_content'
import { terminalHistory } from '@/../.storybook/terminal_history'

export default {
  title: 'Containers/Terminal',
  component: Terminal,
  decorators: [
    terminalHistory,
    terminalContent,
  ],
}

const Template = () => ({
  components: { Terminal },
  template: `
    <Terminal/>
  `,
})

export const Default = Template.bind({})

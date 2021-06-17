import { Story } from '@storybook/vue3'

import Input from '@/components/input/Input_.vue'

export default {
  title: 'Elements/Input',
  component: Input,
  argTypes: {
    'update:modelValue': {
      description: 'emitted when the `modelValue` prop changes; This is useful for `v-model` bindings.',
      table: { type: { summary: 'string' } },
      action: 'update:modelValue',
    },
    submit: {
      description: 'emitted when Enter is pressed to execute the command',
      action: 'submit',
    },
    traversePrev: {
      description: 'emitted when Arrow Up is pressed to cycle back through history',
      action: 'traversePrev',
    },
    traverseNext: {
      description: 'emitted when Arrow Down is pressed to cycle forward through history',
      action: 'traverseNext',
    },
    autocomplete: {
      description: 'emitted when Tab is pressed to autocomplete the command',
      action: 'autocomplete',
    },
  },
}

const Template: Story = (args: Record<string, unknown>) => ({
  components: { Input },
  setup() {
    return { args }
  },
  template: `
    <Input
      v-bind="args"
      v-on="args"/>
  `,
})

export const Default = Template.bind({})
Default.args = {
  modelValue: 'type something here',
}

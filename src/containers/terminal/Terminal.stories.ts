import Terminal from '@/containers/terminal/Terminal.vue'

export default {
  title: 'Containers/Terminal',
  component: Terminal,
}

const Template = () => ({
  components: { Terminal },
  template: `
    <Terminal/>
  `,
})

export const Default = Template.bind({})

// Storybook requires this file to be JavaScript, not TypeScript.

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  stories: [
    '../src/**/*.stories.@(mdx|js|jsx|ts|tsx)',
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        viewport: false,
        toolbars: false,
      },
    },
    '@dhruvkb/storybook-addon-themes',
  ],
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    config.resolve.alias.tests = path.resolve(__dirname, '../tests')
    return config
  },
}

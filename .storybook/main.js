const path = require('path');

module.exports = {
  stories: [
    '../src/stories/*.stories.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        viewport: false,
        toolbars: false,
      }
    },
    '@dhruvkb/storybook-addon-themes',
  ],
  webpackFinal: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, '..', 'src')
    return config
  },
}

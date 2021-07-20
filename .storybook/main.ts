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
  webpackFinal: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias['@'] = path.resolve(__dirname, '..', 'src')
    return config
  },
  core: {
    builder: 'webpack5',
  },
}

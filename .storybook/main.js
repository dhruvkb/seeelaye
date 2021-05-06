const path = require('path');

module.exports = {
  'stories': [
    '../src/stories/*.stories.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',

    'storybook-addon-themes',
  ],
  webpackFinal: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, '..', 'src')
    return config
  },
}

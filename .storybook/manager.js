import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

const theme = create({
  base: 'light',
  brandTitle: 'Seeelaye',
  brandUrl: 'https://github.com/dhruvkb/seeelaye',
  brandImage: 'seeelaye.svg', // copied using -s flag
})

addons.setConfig({
  theme,
})

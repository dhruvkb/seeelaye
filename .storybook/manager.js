import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

import logo from '../src/assets/seeelaye.svg'

const theme = create({
  base: 'light',
  brandTitle: 'Seeelaye',
  brandUrl: 'https://github.com/dhruvkb/seeelaye',
  brandImage: logo,
})

addons.setConfig({
  theme,
})

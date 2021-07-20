import { markRaw } from 'vue'
import { app } from '@storybook/vue3'

import store from './store'
import seeelaye from './seeelaye'

import Terminal from '../src/containers/terminal/Terminal.vue'

import '@/styles/terminal.css'
import '@/styles/solarized.css'
import './css/preview.css'

app
  /*
   When setting up the Store, the Vuex module for see·el·aye must be installed.
   see·el·aye uses this module to hold terminal state. The name of the module
   must then be passed to see·el·aye during instantiation.
   */
  .use(store)
  /*
   see·el·aye is used in Bins stories, so must be installed in the Storybook app
   instance as a plugin. see·el·aye must be registered after Vuex because it
   uses Vuex internally for terminal state.
   */
  .use(seeelaye)

export const parameters = {
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    icon: 'paintbrush',
    clearable: false,
    default: 'Solarized dark',
    list: [
      {
        name: 'Solarized dark',
        class: ['solarized', 'dark'],
        color: '#002b36',
      },
      {
        name: 'Solarized light',
        class: ['solarized', 'light'],
        color: '#fdf6e3',
      },
    ],
    Decorator: markRaw({
      template: `<Terminal :class="themeClasses"><slot/></Terminal>`,
      inheritAttrs: false,
      components: { Terminal },
      props: {
        themeClasses: { type: String },
      },
    }),
  },
  options: {
    storySort: {
      order: [
        'see·el·aye',
        'Elements',
        'Sections',
        'Containers',
        'Bins',
      ],
    },
  },
}

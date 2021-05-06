import '@/styles/solarized.css'
import './css/preview.css'

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'Dark',
    list: [
      {
        name: 'Dark',
        class: ['solarized', 'dark'],
        color: '#002b36',
      },
      {
        name: 'Light',
        class: ['solarized', 'light'],
        color: '#fdf6e3',
      },
    ],
  },
}

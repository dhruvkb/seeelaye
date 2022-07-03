/* eslint-disable import/no-extraneous-dependencies */

import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * @see {@link https://vitejs.dev/config/ | Config reference}
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Also see:
      // - `paths` in `tsconfig.json`
      // - `viteFinal` in `.storybook/main.ts`
      '@': resolve(__dirname, './src'),
      tests: resolve(__dirname, './tests'),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'see·el·aye',
      fileName: (format) => `seeelaye.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vuex'],
      output: {
        // Global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue',
          vuex: 'Vuex',
        },
      },
    },
  },
})

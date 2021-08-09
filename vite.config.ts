/* eslint-disable import/no-extraneous-dependencies */

import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import ttypescript from 'ttypescript'
import typescript from 'rollup-plugin-typescript2'

/**
 * @see {@link https://vitejs.dev/config/ | Config reference}
 */
export default defineConfig({
  plugins: [
    vue(),
    { /**
       * For exporting type declarations of Vue components
       * @see {@link https://github.com/vitejs/vite/issues/3461#issuecomment-845240523 | Workaround }
       */
      ...typescript({
        typescript: ttypescript,
        check: false,
      }),
      enforce: 'pre',
      apply: 'build',
    },
  ],
  resolve: {
    alias: {
      // Also see:
      // - `paths` in `tsconfig.json`
      // - `viteFinal` in `.storybook/main.ts`
      '@': new URL('./src/', import.meta.url).pathname,
      tests: new URL('./tests/', import.meta.url).pathname,
    },
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
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

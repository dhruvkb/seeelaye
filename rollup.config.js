import ttypescript from 'ttypescript'

import resolvePlugin from '@rollup/plugin-node-resolve'
import commonjsPlugin from '@rollup/plugin-commonjs'

import copyPlugin from 'rollup-plugin-copy'
import postCssPlugin from 'rollup-plugin-postcss'
import { terser as terserPlugin } from 'rollup-plugin-terser'
import typescript2Plugin from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'

import pkg from './package.json'

/* ***********
 * Variables *
 *********** */

const banner = `\
/*!
 * see·el·aye - ${pkg.description}
 *
 * @version ${pkg.version}
 * @author ${pkg.author.name}
 * @license ${pkg.license}
 */`

const bundleFormats = {
  // For every bundle keyed here, the built file is named `dist/${name}.${bundle}.js`.
  'esm-bundler': {
    file: pkg.module,
    format: 'es',
  },
  cjs: {
    file: pkg.main,
    format: 'cjs',
  },
  global: {
    file: pkg.unpkg,
    format: 'iife',
  },
  esm: {
    file: pkg.browser,
    format: 'es',
  },
}

// Ensure that TS checks run only once for each build.
let hasTSChecked = false

/* ***********
 * Functions *
 *********** */

const createConfig = (format, out, extraPlugins = []) => {
  const output = {
    ...out,
    banner,
    sourcemap: !!process.env.SOURCE_MAP,
    externalLiveBindings: false,
    globals: {
      vue: 'Vue',
      vuex: 'Vuex',
    },
  }
  if (format === 'global') {
    output.name = pkg.name[0].toUpperCase() + pkg.name.slice(1)
  } else {
    output.name = pkg.name
  }

  const shouldEmitDeclarations = !hasTSChecked
  const typescript2Options = {
    typescript: ttypescript,
    check: !hasTSChecked, // run TS checks if not already
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        // Declarations are bundled up by API extractor.
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations,
      },
      exclude: [
        'tests',
      ],
    },
  }
  hasTSChecked = true // mark TS as checked to avoid re-checking

  return {
    input: 'src/index.ts',
    output,
    // Global and browser ESM builds inline everything and can be used alone.
    external: ['vue', 'vuex'],
    plugins: [
      copyPlugin({
        targets: [
          {
            src: 'src/styles/solarized.css',
            dest: 'dist/themes/',
          },
        ],
      }),
      resolvePlugin(),
      vuePlugin(),
      typescript2Plugin(typescript2Options),
      postCssPlugin(),
      commonjsPlugin(),
      ...extraPlugins,
    ],
  }
}

const createProductionConfig = (format) => createConfig(
  format,
  {
    file: bundleFormats[format].file.replace(/js$/, 'prod.js'),
    format: bundleFormats[format].format,
  },
)

const createMinifiedConfig = (format) => createConfig(
  format,
  {
    file: bundleFormats[format].file.replace(/js$/, 'prod.js'),
    format: bundleFormats[format].format,
  },
  [
    terserPlugin({
      module: /^esm/.test(format),
      compress: {
        ecma: 2015,
        pure_getters: true,
      },
    }),
  ],
)

/* *******
 * Entry *
 ******* */

const allBundles = Object.keys(bundleFormats)
const packageConfigs = allBundles.map((format) => createConfig(format, bundleFormats[format]))
allBundles.forEach((bundle) => {
  if (bundle === 'cjs') {
    packageConfigs.push(createProductionConfig(bundle))
  } else if (bundle === 'global') {
    packageConfigs.push(createMinifiedConfig(bundle))
  }
})
export default packageConfigs

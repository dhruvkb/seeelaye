require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base', // includes plugin:import
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:import/typescript',
    'plugin:storybook/recommended',
  ],
  rules: {
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'no-console': 'off', // Easter eggs are printed to console
    'no-param-reassign': [
      'error', {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for Vuex state
          'acc', // for reduce accumulators
          'config', // for changing bundler configs
          'e', // for e.returnvalue
        ],
      },
    ],

    'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }], // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js#L139
    // TODO: 'import/order'
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off', // superseded by vue/script-indent

        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
        'vue/multi-word-component-names': 'off',
        'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
      },
    },
    {
      files: ['src/base/seeelaye.ts'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['*.ts'],
      rules: {
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'max-classes-per-file': ['error', 3],
        'no-shadow': 'off',
        'no-use-before-define': 'off',

        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-use-before-define': ['error'],
      },
    },
  ],
  settings: {
    'import/resolver': { typescript: {} },
  },
}

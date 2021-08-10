module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    // region @vue/airbnb
    'airbnb-base',
    // endregion
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  // region @vue/airbnb
  settings: {
    'import/resolver': {
      // https://github.com/benmosher/eslint-plugin-import/issues/1396
      [require.resolve('eslint-import-resolver-node')]: {},
      [require.resolve('eslint-import-resolver-alias')]: { // modified based on Vite aliases
        map: [
          ['@', './src'],
          ['tests', './tests'],
        ],
        extensions: ['.js', '.ts', '.vue'],
      },
    },
    'import/extensions': ['.js', '.ts'],
  },
  rules: {
    'import/extensions': [
      'error', 'always', {
        js: 'never',
        ts: 'never',
      },
    ],
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
  },
  // endregion
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off', // Replaced by vue/script-indent
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-shadow': 'off', // Replaced typescript-eslint/no-shadow
        '@typescript-eslint/no-shadow': ['warn'], // Fixes a problem with enums
      },
    },
    {
      files: ['*.vue', '*.js', '*.ts'],
      rules: {
        semi: ['warn', 'never'],
        'no-console': 'off',
        'max-classes-per-file': 'off',
        'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
        'import/prefer-default-export': 'off',
        'import/order': 'off',
      },
    },
  ],
}

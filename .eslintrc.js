module.exports = {
  env: {
    node: true,
  },
  extends: [
    // region @vue/eslint-config-airbnb
    'airbnb-base',
    // endregion
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  settings: {
    // region @vue/eslint-config-airbnb
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
    // endregion
  },
  rules: {
    // region @vue/eslint-config-airbnb
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
    // endregion

    semi: ['warn', 'never'], // Semicolons are bad
    'no-console': 'off', // Consoles outputs are easter eggs
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
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
        'max-classes-per-file': 'off',
      },
    },
  ],
}

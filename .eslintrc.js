module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  rules: {
    // TODO: Restore severity to 'error'
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ['*.html'],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off',
        indent: 'off', // Replaced by vue/script-indent
      },
    },
    {
      files: ['*.js', '*.ts'],
      rules: {
        'no-param-reassign': [
          'error',
          {
            props: true,
            ignorePropertyModificationsFor: ['state'],
          },
        ],
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['*.vue', '*.js', '*.ts'],
      rules: {
        semi: ['warn', 'never'],
        'arrow-parens': ['warn', 'as-needed', { requireForBlockBody: true }],
        'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['warn'], // Fixes a problem with enums
      },
    },
  ],
}

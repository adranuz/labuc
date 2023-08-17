module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    '../node_modules/ts-standard/eslintrc.json'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: './app/tsconfig.json' },
  plugins: ['react-refresh'],
  rules: {
    indent: 'off',
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': [2, {
      checksVoidReturn: {
        attributes: false
      }
    }]
  }
}

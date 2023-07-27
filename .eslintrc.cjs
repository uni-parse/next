module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'next/core-web-vitals',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': 'off',
    'spaced-comment': 'warn',
    'no-console': 'off',
    'no-alert': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'prefer-const': 'warn',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-return-assign': 'off',

    /*
    '@typescript-eslint/lines-between-class-members': 'off',
    'no-promise-executor-return': 'off',
    */
  },
}
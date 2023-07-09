module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  extends: [
    'reedsy',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/']
}

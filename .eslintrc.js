module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'standard-with-typescript',
    'plugin:prettier/recommended',
    
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'prettier/prettier': 'error'
  }
};

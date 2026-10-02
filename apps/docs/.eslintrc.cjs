module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'next/core-web-vitals',
    'prettier',
  ],
  ignorePatterns: [
    '.next',
    'out',
    'components/previews/__sources__.ts',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
      },
    },
    {
      files: ['*.cjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      parser: 'espree',
      env: { node: true, commonjs: true },
      parserOptions: { sourceType: 'script' },
    },
    {
      files: ['*.mjs', 'scripts/**/*.mjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      parser: 'espree',
      env: { node: true, es2022: true },
      parserOptions: { sourceType: 'module', ecmaVersion: 'latest' },
    },
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/require-await': 'off',
    'react-refresh/only-export-components': 'off',
    // App Router only — no pages/ dir, but next plugin checks for it.
    '@next/next/no-html-link-for-pages': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const sharedRules = {
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/array-type': ['error', { default: 'generic' }],
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'variable',
      types: ['boolean'],
      format: ['PascalCase'],
      prefix: ['is', 'are', 'should', 'has', 'can', 'did', 'will'],
    },
    {
      selector: 'typeAlias',
      format: ['PascalCase'],
    },
    {
      selector: 'typeParameter',
      format: ['PascalCase'],
      custom: { regex: '^T[A-Z]', match: true },
    },
  ],
  'no-restricted-syntax': [
    'error',
    { selector: 'TSEnumDeclaration', message: 'Use literal types instead of enums.' },
  ],
  'react-hooks/set-state-in-effect': 'off',
}

const languageOptions = {
  globals: globals.browser,
  parserOptions: {
    project: './tsconfig.app.json',
    tsconfigRootDir: import.meta.dirname,
  },
}

const extends_ = [
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
]

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.ts'],
    extends: extends_,
    languageOptions,
    rules: {
      ...sharedRules,
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  {
    files: ['**/*.tsx'],
    extends: extends_,
    languageOptions,
    rules: {
      ...sharedRules,
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
])

import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import pluginPrettier from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'

export default defineConfig([
  {
    files: ['**/*.ts'],
    plugins: { js, 'unused-imports': unusedImports },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginPrettier,
  {
    rules: {
      'unused-imports/no-unused-imports': 'warn',
    },
  },
])

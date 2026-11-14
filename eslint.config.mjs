import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  globalIgnores(['**/dist/**', '**/coverage/**']),

  js.configs.recommended,
  tseslint.configs.recommended,
  pluginVue.configs['flat/recommended'],

  // Let <script setup lang="ts"> in .vue files be parsed as TypeScript
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },

  // Browser globals for the Vue app, Node globals everywhere else
  { files: ['apps/web/**'], languageOptions: { globals: globals.browser } },
  {
    files: ['apps/api/**', 'apps/worker/**', 'packages/**', '*.{js,mjs,ts}'],
    languageOptions: { globals: globals.node },
  },

  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  prettier, // must stay last
]);

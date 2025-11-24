// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

// Prettier
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  // ===========================
  //   TYPESCRIPT FILES (.ts)
  // ===========================
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,

      // ⭐ Correct way to add Prettier
      prettierConfig,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'prettier/prettier': 'error',

      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },

  // ===========================
  //   HTML FILES (.html)
  // ===========================
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // Prettier does NOT format Angular HTML
      // So we DO NOT use prettier here
    },
  },
);

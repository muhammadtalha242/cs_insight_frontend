const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020, // Modern ECMAScript syntax
    sourceType: 'module', // Support for ES modules
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
  },
  settings: {
    react: {
      version: 'detect', // Auto-detect React version
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/ignore': ['node_modules'],
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'consistent-return': 'off',
    'no-irregular-whitespace': 'off',
    'no-console': [
      'warn',
      {
        allow: ['error', 'info']
      }
    ],
    'no-debugger': isProduction ? 'error' : 'warn',
    'no-shadow': ['off'],
    'no-nested-ternary': 'warn',
    'no-return-assign': [1, 'except-parens'],
    'no-restricted-syntax': 'off',
    'no-unused-vars': [
      isProduction ? 'error' : 'warn',
      {
        ignoreRestSiblings: true
      }
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/namespace': [
      'warn',
      {
        allowComputed: true
      }
    ],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: [
          'const',
          'let',
          'block-like',
          'try',
          'multiline-expression',
          'import',
          'export'
        ],
        next: '*'
      },
      {
        blankLine: 'always',
        prev: ['*'],
        next: ['return', 'block-like', 'try', 'multiline-expression']
      },
      {
        blankLine: 'any',
        prev: ['const', 'let'],
        next: ['const', 'let']
      },
      {
        blankLine: 'any',
        prev: ['import'],
        next: ['import']
      },
      {
        blankLine: 'any',
        prev: ['export'],
        next: ['export']
      }
    ],
    'array-element-newline': ['warn', 'consistent'],
    'arrow-spacing': 'warn',
    'brace-style': ['warn', '1tbs'],
    'comma-style': ['warn', 'last'],
    'dot-location': ['warn', 'property'],
    'function-call-argument-newline': ['warn', 'consistent'],
    'padded-blocks': ['warn', 'never'],
    'no-trailing-spaces': 'warn',
    'no-whitespace-before-property': 'warn',
    'prettier/prettier': 'warn',
    'prefer-promise-reject-errors': 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-did-update-set-state': 'off',
    'react/no-deprecated': 'warn',
    'react/jsx-key': 'warn',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/no-this-in-sfc': 1,
    'react/no-unused-prop-types': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false
      }
    ],
    '@typescript-eslint/no-shadow': ['warn', { allow: ['this'] }],
    '@typescript-eslint/no-unused-vars': 'off',
    // duplication of `no-unused-vars`
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'jest/no-conditional-expect': 'off',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'pathGroups': [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '~/*',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal'
          },
          {
            pattern: '*',
            group: 'external',
            position: 'after'
          }
        ],
        'pathGroupsExcludedImportTypes': ['react'],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-unused-vars': [
          isProduction ? 'error' : 'warn',
          {
            ignoreRestSiblings: true
          }
        ],
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error']
      }
    },
    {
      parser: 'espree',
      files: ['config/*', 'webpack.*'],
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off',
        'no-unused-vars': [
          'warn',
          {
            ignoreRestSiblings: true
          }
        ],
        'node/no-unpublished-require': 'off',
        'object-shorthand': 'warn',
        '@typescript-eslint/no-var-requires': 'off'
      },
      env: {
        node: true
      }
    },
    {
      files: ['*.test.*', '*.spec.*'],
      rules: {
        'no-unused-vars': 'warn',
      }
    }
  ]
};

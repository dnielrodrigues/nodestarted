// @ts-check
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import { dirname } from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: './tsconfig.json',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...compat.extends('@rocketseat/eslint-config/node'),
  {
    rules: {

      '@typescript-eslint/no-explicit-any': 'off', // allow any as type
      '@typescript-eslint/no-unsafe-assignment': 'off', // allow any
      '@typescript-eslint/no-unsafe-member-access': 'off', // allow properties of any
      '@typescript-eslint/no-unsafe-return': 'off', // allow return as any
      '@typescript-eslint/no-unsafe-call': 'off', // allow any vars
      '@typescript-eslint/no-unsafe-argument': 'off', // allow any as arguments
      '@typescript-eslint/only-throw-error': 'off', // allow any as errors
      'no-throw-literal': 'off', // allow error objects
      'no-void': 'off',
      curly: 'off', // allow code blocks without brackets (ex: "if" without {})
      semi: ['error', 'never'], // dont accept line end semicolon
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, // use single quotes
          trailingComma: 'none', // delete comma after the last object attribute
          semi: false, // delete line end semicolon
          tabWidth: 2
        }
      ]
    },
  },
)
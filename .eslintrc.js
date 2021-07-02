module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: [`error`, 2],
    "linebreak-style": [`error`, `unix`],
    quotes: [`error`, `backtick`],
    semi: [`error`, `always`],
    "no-multiple-empty-lines": [`error`, { max: 2, maxEOF: 0 }],
    "quote-props": [`error`, `as-needed`],
    strict: 0,
    "comma-dangle": [`error`, `always-multiline`],
    "space-infix-ops": [`error`, { int32Hint: false }],
    "max-len": [`error`, { 
      code: 80,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: false,
    }],
    "require-jsdoc": [`off`],
    "new-cap": [`error`, { newIsCap: true}],
    "vue/html-indent": [
      `error`,
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    "vue/script-indent": [
      `error`,
      2,
      {
        baseIndent: 0,
        switchCase: 1,
        ignores: [],
      },
    ],
    "vue/max-attributes-per-line": [
      `error`,
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    "vue/html-closing-bracket-newline": [
      `error`,
      {
        singleline: `never`,
        multiline: `never`,
      },
    ],
    "vue/html-self-closing": [
      `error`,
      {
        html: {
          void: `always`,
          normal: `always`,
          component: `always`,
        },
        svg: `always`,
        math: `always`,
      },
    ],
    "vue/attribute-hyphenation": [`error`, `always`],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}

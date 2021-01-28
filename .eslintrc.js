module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [`plugin:vue/vue3-essential`, `eslint:recommended`, `@vue/prettier`],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "linebreak-style": [`error`, `unix`],
    semi: [`error`, `always`],
    quotes: [`error`, `backtick`],
    indent: [`error`, 2],
    "quote-props": [`error`, `as-needed`],
    strict: 0,
    "comma-dangle": [`error`, `always-multiline`],
    "space-infix-ops": [`error`, { int32Hint: false }],
  },
  overrides: [
    {
      files: [
        `**/__tests__/*.{j,t}s?(x)`,
        `**/tests/unit/**/*.spec.{j,t}s?(x)`,
      ],
      env: {
        mocha: true
      }
    }
  ]
};

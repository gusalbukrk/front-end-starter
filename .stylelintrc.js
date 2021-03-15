module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-prettier',
    'stylelint-scss',
  ],
  rules: {
    'prettier/prettier': true,
    'order/properties-alphabetical-order': true,

    // stylelint-scss recommended rules
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,

    // personal rules
    'rule-empty-line-before': 'always',
  },
}

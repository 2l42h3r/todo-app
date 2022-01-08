module.exports = {
  "extends": ["plugin:cypress/recommended", "../../.eslintrc.js"],
  "ignorePatterns": ["!**/*"],
  parserOptions: {
    project: ['tsconfig.json'],
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {}
    },
    {
      "files": ["src/plugins/index.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
        "no-undef": "off"
      }
    }
  ]
}

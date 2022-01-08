module.exports = {
  "extends": [
    "plugin:@nrwl/nx/react-typescript",
    "../../.eslintrc.js",
    "next",
    "next/core-web-vitals"
  ],
  parserOptions: {
    project: ['tsconfig.json'],
  },
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "@next/next/no-html-link-for-pages": [
          "error",
          "packages/to-do-list/pages"
        ]
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "rules": {}
    }
  ],
  "env": {
    "jest": true
  }
}

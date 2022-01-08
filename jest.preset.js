const { compilerOptions } = require('./tsconfig.base');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'html'],
  coverageReporters: ['html'],
  transform: {
    '^.+.(tsx?|jsx?|html)$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/tsc-out/'],
  modulePathIgnorePatterns: ['/dist/', '/tsc-out/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: __dirname,
  }),
};

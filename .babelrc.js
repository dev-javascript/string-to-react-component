'use strict';

const output = process.env.BABEL_OUTPUT;
const requirePolyfills = process.env.INCLUDE_POLYFILLS;
const modules = output == null ? false : output;
const options = {
  presets: [
    ['@babel/env', {loose: true, modules}],
    '@babel/react',
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
    '@babel/plugin-transform-react-jsx',
    [
      'transform-react-remove-prop-types',
      {
        mode: 'remove',
        ignoreFilenames: ['node_modules'],
      },
    ],
  ],
  env: {
    test: {
      // extra configuration for process.env.NODE_ENV === 'test'
      presets: ['@babel/env', '@babel/preset-typescript'], // overwrite env-config from above with transpiled module syntax
    },
  },
};
if (requirePolyfills) {
  options.plugins.push(['@babel/plugin-transform-runtime', {corejs: 3}]);
}
module.exports = options;

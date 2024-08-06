const webpack = require('webpack');
const {version, name} = require('./package');
const path = require('path');

module.exports = {
  title: name,
  template: {
    head: {
      meta: [
        {
          name: 'description',
          content:
            'Convert string to react component dynamically. Rendering React Components from String. Create Dynamic React Components with String',
        },
      ],
    },
  },
  getComponentPathLine(componentPath) {
    return ``;
  },
  components: 'example/stories/**/*.{jsx,js,tsx}',
  moduleAliases: {
    'string-to-react-component': path.resolve(__dirname, './'),
  },
  ribbon: {
    // Link to open on the ribbon click (required)
    url: 'https://github.com/dev-javascript/string-to-react-component',
    // Text to show on the ribbon (optional)
    text: 'Fork me on GitHub',
  },
  styleguideDir: 'demo',
  require: [path.join(__dirname, './example/stories/styles.css')],
  // assetsDir: "example/stories/assets",
  sections: [
    {name: 'Minimal Usage', content: 'example/stories/usage/README.md', sectionDepth: 1},
    {name: 'Using useState, useEffect and ...', content: 'example/stories/using-useState-useEffect/README.md'},
    {name: 'Using Unknown Elements', content: 'example/stories/using-unkown-elements/README.md', sectionDepth: 1},
    {name: 'filename option', content: 'example/stories/filename-option/README.md', sectionDepth: 1},
    {name: 'Using Typescript', content: 'example/stories/typescript/README.md', sectionDepth: 1},
  ],
  styleguideComponents: {},
  pagePerSection: true,
  defaultExample: true,
  usageMode: 'expand',
  version,
  webpackConfig: {
    plugins: [
      new webpack.DefinePlugin({
        process: {
          env: JSON.stringify({
            ...process.env,
          }),
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
      noParse: /\.(scss)/,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.json'],
    },
  },
};

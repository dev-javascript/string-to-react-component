const path = require('path');
const pkg = require('./package.json');
const library = pkg.name
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join('');
module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    entry: './src/index.js',
    output: {
      filename: isProduction ? 'stringToReactComponent.umd.min.js' : 'stringToReactComponent.umd.js',
      path: path.resolve(__dirname, 'dist'),
      library,
      libraryTarget: 'umd',
      publicPath: '/dist/',
      umdNamedDefine: true,
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    mode: env,
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'assets'),
      },
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM',
      },
      '@babel/standalone': 'Babel',
    },
  };
};

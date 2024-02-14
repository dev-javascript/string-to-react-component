const path = require('path');
const pkg = require('./package.json');
const library = pkg.name
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join('');
module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    entry: './src/index.ts',
    output: {
      filename: isProduction ? 'stringToReactComponent.umd.min.js' : 'stringToReactComponent.umd.js',
      path: path.resolve(__dirname, 'build'),
      library,
      libraryTarget: 'umd',
      publicPath: '/build/',
      umdNamedDefine: true,
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    mode: env,
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
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

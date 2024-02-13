//import {terser} from 'rollup-plugin-terser';
import esbuild from 'rollup-plugin-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
//import {dts} from 'rollup-plugin-dts';
const pkg = require('./package.json');
const name = pkg.name
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join('');
const Config = ({en, inputPath = '', outputFile = 'stringToReactComponent', pf = false}) => {
    var pfName = pf ? '.including-polyfills' : '';
    return {
      input: `lib/${pf ? 'esm-including-polyfills' : 'esm'}/${inputPath}index.js`,
      output: {
        file: `dist/${outputFile}${pfName}.umd${en === 'dev' ? '' : '.min'}.js`,
        format: 'umd',
        name,
        globals: {
          'react-dom': 'ReactDOM',
          react: 'React',
          '@babel/standalone': 'Babel',
        },
        sourcemap: true,
      },
      plugins: (function () {
        const _plugins = [
          //nodeResolve({preferBuiltins: false}),
          //commonjs(),
          //dts(),
          esbuild({
            minify: en === 'prod',
            // All options are optional
            include: /\.[jt]sx?$/, // default, inferred from `loaders` option
            exclude: /node_modules/, // default
            sourceMap: true, // default
            target: 'es2017', // default, or 'es20XX', 'esnext'
            jsx: 'transform', // default, or 'preserve'
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
            // Like @rollup/plugin-replace
            define: {
              __VERSION__: '"x.y.z"',
            },
            tsconfig: 'tsconfig.json', // default
            // Add extra loaders
            loaders: {
              // Add .json files support
              // require @rollup/plugin-commonjs
              '.json': 'json',
              // Enable JSX in .js files too
              '.js': 'jsx',
            },
          }),
        ];
        // if (en === 'prod') {
        //   _plugins.push(terser());
        // }
        return _plugins;
      })(),
      external: function (id) {
        return /prop-types$|react$|\@babel\/standalone$|react-dom$|.test.js$|.js.snap$|.css$/g.test(id);
      },
      banner: '/** MIT licence */',
    };
  },
  ConfigFactory = (op) => [
    Config({en: 'dev', ...op}),
    Config({en: 'prod', ...op}),
    Config({en: 'dev', pf: true, ...op}),
    Config({en: 'prod', pf: true, ...op}),
  ];
export default ConfigFactory();

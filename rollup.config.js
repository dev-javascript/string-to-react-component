import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
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
        const _plugins = [nodeResolve({preferBuiltins: false}), commonjs()];
        if (en === 'prod') {
          _plugins.push(terser());
        }
        return _plugins;
      })(),
      external: function (id) {
        return /prop-types$|react$|\@babel\/standalone$|react-dom$|.test.js$|.js.snap$|.css$/g.test(id);
      },
    };
  },
  ConfigFactory = (op) => [
    Config({en: 'dev', ...op}),
    Config({en: 'prod', ...op}),
    Config({en: 'dev', pf: true, ...op}),
    Config({en: 'prod', pf: true, ...op}),
  ];
export default ConfigFactory();

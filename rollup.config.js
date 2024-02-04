import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
const requirePolyfills = process.env.INCLUDE_POLYFILLS;
export default {
  input: requirePolyfills ? 'lib/esm-including-polyfills/index.js' : 'lib/esm/index.js',
  output: {
    file: requirePolyfills
      ? 'dist/stringToReactComponent.including-polyfills.umd.min.js'
      : 'dist/stringToReactComponent.umd.min.js',
    format: 'umd',
    name: 'stringToReactComponent',
    globals: {
      'react-dom': 'ReactDOM',
      react: 'React',
      '@babel/standalone': 'Babel'
    },
    sourcemap: true,
  },
  plugins: [terser(), commonjs(), nodeResolve({ preferBuiltins: false })],
  external: function (id) {
    return /prop-types$|react$|\@babel\/standalone$|react-dom$|.test.js$|.js.snap$|.css$/g.test(id);
  },
};

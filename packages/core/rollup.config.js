import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    chunkFileNames: '[name].js',
    dir: 'dist',
    format: 'es',
    name: 'EmojiButton',
    sourcemap: true
  },
  watch: {
    buildDelay: 500
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development'
      )
    }),
    postcss({
      extensions: ['.css']
    }),
    eslint(),
    babel({ babelHelpers: 'bundled', configFile: '../../babel.config.json' }),
    resolve(),
    commonjs(),
    production && terser()
  ]
};

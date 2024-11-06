import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  // your existing Rollup config options
  plugins: [
    resolve(),
    commonjs(),
    // other plugins
  ],
};

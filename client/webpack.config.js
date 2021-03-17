const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
              test: [/\.vert$/, /\.frag$/],
              use: 'raw-loader'
            }
          ]
    },
    plugins: {},
  }
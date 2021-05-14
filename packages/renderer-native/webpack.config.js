module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    library: {
      name: 'NativeRenderer',
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: '../../babel.config.json'
          }
        }
      }
    ]
  }
};

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    lightTheme: {
      import: './src/styles/theme/light.js',
      filename: 'themes/light.js'
    },
    darkTheme: {
      import: './src/styles/theme/dark.js',
      filename: 'themes/dark.js'
    },
    autoTheme: {
      import: './src/styles/theme/auto.js',
      filename: 'themes/auto.js'
    }
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    library: {
      name: 'EmojiButton',
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'camelCaseOnly'
              }
            }
          }
        ]
      },
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
  },
  plugins: [new MiniCssExtractPlugin()]
};

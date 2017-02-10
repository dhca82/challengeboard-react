const path = require('path');

var config = {
  entry: path.resolve(__dirname, './src'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename:'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader']
      },
      {
        test:/\.(sass|scss)$/,
        //use: ['style-loader','css-loader?sourceMap','sass-loader?sourceMap']
        use: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(jpg|png)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    contentBase:path.resolve(__dirname, './dist')
  },
  devtool: 'source-map'
}
module.exports = config;

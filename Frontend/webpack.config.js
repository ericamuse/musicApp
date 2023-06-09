const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  optimization: {
    usedExports: true
  },
  entry: {
    contentPage: path.resolve(__dirname, 'src', 'pages', 'contentPage.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    https: false,
    port: 8080,
    open: true,
    openPage: 'http://localhost:8080/content.html',
    // diableHostChecks, otherwise we get an error about headers and the page won't render
    disableHostCheck: true,
    contentBase: 'packaging_additional_published_artifacts',
    // overlay shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: true,
    proxy: [
          {
            context: [
              '**'
            ],
            target: 'http://localhost:5001'
          }
        ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/content.html',
      filename: 'content.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
        template: './src/songs.html',
        filename: 'songs.html',
        inject: false
    }),
    new HtmlWebpackPlugin({
        template: './src/favorites.html',
        filename: 'favorites.html',
        inject: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/css'),
          to: path.resolve("dist/css")
        }
      ]
    }),
    new CleanWebpackPlugin()
  ]
}

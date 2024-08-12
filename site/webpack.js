const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'app.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Name the file with its original name and append a unique hash
              outputPath: 'images', // Output the files to the 'images' directory
              publicPath: 'images', // Set the public path to reference files from the 'images' directory
              esModule: false // Disable ES module syntax (optional, depending on your setup)
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      sharedComponents: path.resolve(__dirname, 'src/sharedComponents/'),
      sharedTypes: path.resolve(__dirname, 'src/sharedTypes/index.ts'),
      theme: path.resolve(__dirname, 'src/theme.tsx'),
      utilities: path.resolve(__dirname, 'src/utilities.ts'),
      context: path.resolve(__dirname, 'src/Context.tsx')
    }
  },
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/static/index.template.ejs',
      favicon: './src/static/favicon.png',
      inject: 'body'
    })
  ],
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const babelPresets = require('babel-preset-es2015');
const autoprefixer = require('autoprefixer');

const config = {
  entry: {
    app: path.resolve(__dirname, 'app/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `[name].js`,
    publicPath: '/',
  },
  devServer: {
    hot: true,
    inline: true,
    port: 3000,
    historyApiFallback: true,
  },
  // devtool: DEVELOP ? 'inline-source-map' : '',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              presets: ['es2015'],
              plugins: ['transform-runtime'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [autoprefixer];
                },
              },
            },
          ],
        }),
      },      
      {
        test: /\.scss$/,
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                insertInto: '#host::shadow>#root',
                plugins() {
                  return [autoprefixer];
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                // includePaths: ['absolute/path/a', 'absolute/path/b'] path for styles
              },
            },
            // 'raw-loader',
            // {
            //   loader: 'sass-resources-loader',
            //   options: {
            //     resources: ['./app/styles/_variables.scss'],
            //   },
            // },
          ],
        // }),
      },
      // {
      //   test: /\.scss$/,
      //   use: extractSass.extract({
      //       use: [{
      //           loader: "css-loader"
      //       }, {
      //           loader: "sass-loader"
      //       }],
      //       // use style-loader in development
      //       fallback: "style-loader"
      //   })
      // },     
      {
        test: /\.ttf$|\.eot|\.woff|\.woff2$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        // options: {
        //   minimize: !DEVELOP,
        //   removeComments: !DEVELOP,
        //   collapseWhitespace: !DEVELOP,
        // },
      },      
    ],

  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: `css/[name].css`,
    //   allChunks: true,
    //   disable: false,
    // }),    
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      // favicon: 'favicon.ico',
      filename: 'index.html',
      // minify: {
      //   collapseWhitespace: !DEVELOP,
      //   removeComments: !DEVELOP,
      //   removeRedundantAttributes: !DEVELOP,
      //   removeScriptTypeAttributes: !DEVELOP,
      //   removeStyleLinkTypeAttributes: !DEVELOP,
      // },
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new StyleExtHtmlWebpackPlugin(),
  ]
};

module.exports = config;
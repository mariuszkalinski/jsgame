const karmaSourcemapLoader = require('karma-sourcemap-loader');
const karmaChai = require('karma-chai');
const karmaMocha = require('karma-mocha');
const karmaMochaReporter = require('karma-mocha-reporter');
const karmaWebpack = require('karma-webpack');
const karmaCoverage = require('karma-coverage');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = function karmaConf(config) {
  config.set({
    // ... normal karma configuration
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'spec.bundle.js', watched: false, included: true, served: true },
      // each file acts as entry point for the webpack configuration
    ],

    plugins: [
      karmaChai,
      karmaMocha,
      karmaMochaReporter,
      karmaSourcemapLoader,
      karmaCoverage,
      karmaWebpack,
    ],
    preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'] },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: [{
              loader: 'babel-loader',
              options: {
                compact: true,
                presets: ['es2015'],
                plugins: ['transform-runtime'],
              },
            },
            'eslint-loader',
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
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                    // includePaths: ['absolute/path/a', 'absolute/path/b'] path for styles
                  },
                },
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: ['./app/styles/_variables.scss'],
                  },
                },
              ],
            }),
          },
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
          },
          {
            test: /\.xml$/,
            loader: 'xml-loader',
          },
        ],
      },

    },
    devServer: {
      noInfo: true, // prevent console spamming when running in Karma!
    },
    reporters: ['coverage', 'mocha'],
    colors: true,
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },
  });
};

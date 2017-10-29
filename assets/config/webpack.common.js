var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './assets/polyfills.ts',
    'vendor': './assets/vendor.ts',
    'app': './assets/app/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [{
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: helpers.root('../', 'tsconfig.json')
          }
        }, 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [helpers.root('src', 'styles')]
        }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./assets'), // location of your src
      {} // a map of your routes
    ),

    new ProvidePlugin({
      "window.jQuery": "jquery",
      Hammer: "hammerjs/hammer"
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};

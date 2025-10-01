// @ts-check
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: path.resolve(__dirname, 'src/main.tsx'),

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'assets/js/[name].[contenthash].js' : 'assets/js/[name].js',
      chunkFilename: isProd ? 'assets/js/[name].[contenthash].chunk.js' : 'assets/js/[name].chunk.js',
      assetModuleFilename: 'assets/media/[name][ext]',
      clean: true, // очищает dist перед сборкой
    },

    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
    },

    module: {
      rules: [
        {
          test: /\.([cm]?ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', { targets: 'defaults', modules: false }],
                ['@babel/preset-react', { runtime: 'automatic' }],
                ['@babel/preset-typescript'],
              ],
            },
          },
        },
        {
          test: /\.module\.(css|scss)$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProd ? '[hash:base64:6]' : '[path][name]__[local]--[hash:base64:5]',
                },
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader', options: { sourceMap: !isProd } },
          ]
        },
        {
          test: /\.(css|scss)$/,
          exclude: /\.module\.(css|scss)$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            { loader: 'sass-loader', options: { sourceMap: !isProd } },
          ]
        },
        { test: /\.(png|jpe?g|gif|svg|ico|webp|avif)$/i, type: 'asset/resource' },
        { test: /\.(woff2?|eot|ttf|otf)$/i, type: 'asset/resource' },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        minify: isProd && {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? 'assets/css/[name].[contenthash].css' : 'assets/css/[name].css',
      }),
      new Dotenv({ systemvars: true }),
    ],

    devServer: {
      port: 5173,
      open: true,
      hot: true,
      historyApiFallback: true,
      client: { overlay: true },
    },

    optimization: { splitChunks: { chunks: 'all' }, runtimeChunk: 'single' },
    performance: { hints: false },
  };
};

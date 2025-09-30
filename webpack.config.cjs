// @ts-check // включает проверку типов ts прямо в js файлах
const path = require('path'); // модуль Node.js для работы с путями
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин: генерирует index.html и подключает скрипты
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин: выносит CSS в отдельные файлы (в prod)
const Dotenv = require('dotenv-webpack'); // плагин: подключает переменные окружения из .env
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'); // плагин: понимает alias из tsconfig.json

/** @type {import('webpack').Configuration} */
module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'; // флаг: режим сборки (prod или dev)

  return {
    entry: path.resolve(__dirname, 'src/main.tsx'), // входной файл (точка входа в приложение)

    output: { // куда и как складывать сборку
      path: path.resolve(__dirname, 'dist'), // конечная папка
      filename: isProd ? 'assets/js/[name].[contenthash].js' : 'assets/js/[name].js', // имя основного JS-файла
      chunkFilename: isProd ? 'assets/js/[name].[contenthash].chunk.js' : 'assets/js/[name].chunk.js', // имя для динамических чанков (lazy-loading)
      assetModuleFilename: 'assets/media/[name][ext]', // схема именования для картинок/шрифтов
      clean: false // не очищаем dist автоматически (используем rimraf перед build)
    },

    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map', // source map для дебага

    resolve: { // как webpack ищет файлы
      extensions: ['.ts', '.tsx', '.js', '.jsx'], // расширения, которые можно не писать в import
      plugins: [new TsconfigPathsPlugin()], // поддержка alias (@/...) из tsconfig.json
    },

    module: { // правила, как обрабатывать разные типы файлов
      rules: [
        {
          test: /\.([cm]?ts|tsx|js|jsx)$/, // все ts/tsx/js/jsx
          exclude: /node_modules/, // кроме node_modules
          use: {
            loader: 'babel-loader', // пропускаем через babel
            options: {
              cacheDirectory: true, // кеширует трансформацию для ускорения
              presets: [
                ['@babel/preset-env', { targets: 'defaults', modules: false }], // современный JS под браузеры
                ['@babel/preset-react', { runtime: 'automatic' }], // поддержка JSX без ручного import React
                ['@babel/preset-typescript'] // поддержка TS
              ]
            }
          }
        },
        {
          test: /\.module\.(css|scss)$/, // CSS/SCSS c CSS Modules (локальные классы)
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader', // prod: отдельные CSS файлы, dev: <style>
            {
              loader: 'css-loader',
              options: {
                modules: { // схема именования классов: в prod хеши, в dev читаемые имена
                  localIdentName: isProd ? '[hash:base64:6]' : '[path][name]__[local]--[hash:base64:5]'
                }
              }
            },
            { loader: 'postcss-loader' }, // PostCSS (например, autoprefixer)
            { loader: 'sass-loader', options: { sourceMap: !isProd } } // из SCSS в CSS
          ]
        },
        {
          test: /\.(css|scss)$/, // Обычные глобальные CSS/SCSS (не модули)
          exclude: /\.module\.(css|scss)$/, // исключаем модули
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader', // без modules, классы глобальные
            'postcss-loader',
            { loader: 'sass-loader', options: { sourceMap: !isProd } }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico|webp|avif)$/i, // картинки/иконки
          type: 'asset/resource'
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i, // шрифты
          type: 'asset/resource'
        }
      ]
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
          useShortDoctype: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? 'assets/css/[name].[contenthash].css' : 'assets/css/[name].css'
      }),
      new Dotenv({
        systemvars: true // подтягивает переменные окружения из системы
      })
    ],

    devServer: { // локальный сервер разработки
      port: 5173,
      open: true,
      hot: true,
      historyApiFallback: true,
      client: { overlay: true }
    },

    optimization: {
      splitChunks: { chunks: 'all' },
      runtimeChunk: 'single'
    },

    performance: { hints: false }
  };
};

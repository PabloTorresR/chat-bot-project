/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();
const slsWebpack = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entries = slsWebpack.lib.entries;
const isLocal = Object.keys(entries).length === 0;

const localEntry = {
  main: './src/main.ts',
};

module.exports = {
  entry: isLocal ? localEntry : entries,
  mode: isLocal ? 'none' : 'production',
  target: 'node',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/platform-express',
          'cache-manager',
          'class-validator',
          'class-transformer/storage',
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',
          'fastify-swagger',
          'swagger-ui-express',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()],
          });
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
    symlinks: true, //never delete it handles building the internal packages
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    clean: true,
  },
};

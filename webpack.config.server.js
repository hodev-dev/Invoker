// webpack.config.server.js
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    name: 'server',
    entry: {
        server: path.resolve(__dirname, 'server/server.ts'),
    },
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
        compression: 'gzip',
        cacheDirectory: path.resolve(__dirname, '.temp_cache'),
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
        extensions: ['.ts', '.tsx'],
    },
    externals: [nodeExternals()],
    target: 'node',
    node: {
        __dirname: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'server', 'tsconfig.server.json'),
                },
            },
            {
                test: /\.css$/,
                use: ['css-loader', 'postcss-loader'],
            },
            {
                test: /\.ejs$/,
                use: {
                    loader: 'ejs-compiled-loader',
                    options: {
                        htmlmin: true,
                        htmlminOptions: {
                            removeComments: true,
                        },
                    },
                },
            },
        ],
    },
    optimization: {
        usedExports: false,
        mangleExports: false,
        minimizer: [new CssMinimizerPlugin()],
        minimize: false,
    },

    plugins: [
        new CopyPlugin({
            patterns: [{ context: 'server', from: 'views', to: 'views' }],
        }),
        new webpack.ProvidePlugin({
            _: 'underscore',
        }),
    ],
}
;

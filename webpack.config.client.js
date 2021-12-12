const path = require('path');
var glob = require('glob');
var webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

function normalizeName(name) {
    return name
        .replace(/node_modules/g, 'nodemodules')
        .replace(/[\-_.|]+/g, ' ')
        .replace(/\b(vendors|nodemodules|js|modules|es)\b/g, '')
        .trim()
        .replace(/ +/g, '-');
}

module.exports = {
    target: 'node',
    name: 'client',
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
        compression: 'gzip',
        cacheDirectory: path.resolve(__dirname, '.temp_cache'),
    },
    entry: glob.sync('./client/**/*.tsx').reduce(function(obj, el) {
        obj[path.parse(el).name] = el;
        return obj;
    }, {}),
    mode: 'production',
    output: {
        path: path.resolve(__dirname + '/dist/static'),
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: '',
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
        extensions: ['.ts', '.tsx', '.js'],
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'client', 'tsconfig.client.json'),
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
    optimization: {
        usedExports: true,
        mangleExports: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                extractComments: true,
            }),
        ],
        minimize: true,
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin(),
        new MiniCssExtractPlugin({
            filename: 'App.css',
            chunkFilename: '[id].css',
        }),
    ],
};

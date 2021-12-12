const spawn = require('cross-spawn');
const path = require('path');
const webpack = require('webpack');
const webpackConfigClient = require('./webpack.config.client');
const webpackConfigServer = require('./webpack.config.server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');

const WebpackDevServer = require('webpack-dev-server');


const compiler = webpack(
    {
        ...webpackConfigClient,
        mode: 'development',
        // devtool: 'source-map',
        output: {
            ...webpackConfigClient.output,
            filename: '[name].js',
        },
        stats: { warnings: true },
    },
);

const serverCompiler = webpack(
    {
        ...webpackConfigServer,
        mode: 'development',
    },
);


let node;

compiler.hooks.watchRun.tap('Dev', (compiler) => {
    console.log(`Compiling ${compiler.name} ...`);
    if (compiler.name === 'server' && node) {
        node.kill();
        node = undefined;
    }
});

compiler.watch({
    ignored: [
        path.resolve(__dirname, 'server'),
        path.resolve(__dirname, 'dist'),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'core'),
    ],
    stdin: true,
}, (err, stats) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(chalk.yellow('client'));
    const compiledSuccessfully = !stats?.hasErrors();
    console.log(stats.toString());
    if (compiledSuccessfully && !node) {
        console.log(chalk.blue('client compiled successfully'));
    }
});


serverCompiler.hooks.watchRun.tap('Dev', (serverCompiler) => {
    console.log(`Compiling ${serverCompiler.name} ...`);
    if (serverCompiler.name === 'server' && node) {
        node.kill();
        node = undefined;
    }
});


serverCompiler.watch({
    ignored: ['**/dist/**/*', './client/pages/**/*.tsx', './dist/*', 'node_modules/**/*', 'client/**/*', 'client/*', './client'],
    stdin: true,
}, (err, stats) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    const compiledSuccessfully = !stats?.hasErrors();
    console.log(chalk.yellow('server'));
    console.log(stats.toString());
    if (compiledSuccessfully && !node) {
        node = spawn(
            'node',
            ['--inspect', path.join(__dirname, 'dist/server.js')],
            {
                stdio: 'inherit',
            },
        );
    }
});

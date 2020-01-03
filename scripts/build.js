/* eslint-disable no-console */
process.env.NODE_ENV = 'production';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const formatMessages = require('webpack-format-messages');
const serverConfig = require("../configs/webpack.server");

process.on('unhandledRejection', err => {
    throw err;
});

const buildFolder = path.resolve(__dirname, "../build");

fs.emptyDirSync(buildFolder);

build()
    .then(result => printResult(result))
    .catch(err => {
        console.log(chalk.red('Failed to compile.\n'));
        process.exit(1);
    })

function build() {
    console.log(chalk.blue('\n\tCreating an optimized production build...\n'));
    const serverCompiler = webpack(serverConfig);

    return new Promise((resolve, reject) => {
            serverCompiler.run((err, stats) => {
                if (err) {
                    return reject(err);
                }
                else {
                    console.log(chalk.white('✓ Server webpack build complete'));
                }
                const messages = formatMessages(stats, true);
                resolve({
                    stats,
                    warnings: messages.warnings
                });
            })
    });
}

function printResult({ warnings }) {
    if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
    } else {
        console.log(chalk.green('Compiled successfully.\n'));
    }
    //console.log('File sizes after gzip:\n');
    // printFileSizesAfterBuild(stats, previousFileSizes,buildFolder,WARN_AFTER_BUNDLE_GZIP_SIZE,WARN_AFTER_CHUNK_GZIP_SIZE);
    console.log();
}
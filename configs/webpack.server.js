const path = require('path');
// const baseConfig = require('./webpack.base');
const nodeExternals = require('webpack-node-externals');

const config = {
    mode:'production',

    /// We need to tell webpack to run it in node
    target: 'node',

    node: {
        __dirname: true
      },

    // We need to tell the entry point of the application
    entry: './app.js',

    /// We need to tell the location where it should generate the output

    output: {
        filename : 'server.js',
        publicPath: '/',
        path: path.resolve(__dirname ,"../build"),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader:'babel-loader',
                exclude: /node_modules/,
                options:{
                    plugins:['dynamic-import-node']
                }
            }
        ]
    },
    externals: [nodeExternals()]
}

module.exports = config;
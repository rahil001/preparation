const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'output.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'    
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('style.css')
    ],
    devServer : {
        contentBase: path.resolve(__dirname, './public'),
        historyApiFallback: true, // fallback to index.html for Single Page Applications.
        inline: true, // inline-mode
        open: true
    },
    devtool: 'source-map'
}
module.exports = config;
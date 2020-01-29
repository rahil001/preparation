const webpack = require('webpack');
const path = require('path');

const config = {
    entry: 'src/index.js',
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
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
module.exports = config;
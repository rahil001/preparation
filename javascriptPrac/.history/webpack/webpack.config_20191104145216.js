const webpack = require('webpack');

const config = {
    entry: './index.js',
    output: {
        filename: 'output.js',
        path: 'public'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'    
            }
        ]
    }
}
module.exports = config;
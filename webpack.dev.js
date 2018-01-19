const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                // creates style nodes from JS strings
                {loader: "style-loader"},
                // translates CSS into CommonJS
                {loader: "css-loader"},
                // translates CSS via postcss
                {loader: 'postcss-loader'},
                // compiles Sass to CSS
                {loader: "sass-loader"},
            ]
        }]
    },
    devServer: {
        contentBase: './build'
    }
});

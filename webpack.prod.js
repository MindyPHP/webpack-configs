const config = require('./config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
});

module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [
                    // translates CSS into CommonJS
                    {loader: "css-loader"},
                    // translates CSS via postcss
                    {loader: 'postcss-loader'},
                    // compiles Sass to CSS
                    {loader: "sass-loader"},
                ],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        new ManifestPlugin({
            basePath: config.outputPrefix,
        }),
        extractSass,
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});

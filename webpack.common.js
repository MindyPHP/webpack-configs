const config = require('./config');
const utils = require('./utils');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: config.entry,
    output: {
        filename: utils.isProduction ? 'js/[name].[hash].js' : 'js/[name].js',
        path: config.outputPath,
        publicPath: "/themes/svetobox/",
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: utils.isProduction ? 'images/[name].[hash].[ext]' : 'images/[name].[ext]',
                    publicPath: config.outputPrefix,
                    useRelativePath: false
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: utils.isProduction ? 'fonts/[name].[hash].[ext]' : 'fonts/[name].[ext]',
                    publicPath: config.outputPrefix,
                    useRelativePath: false
                }
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: utils.isProduction ? 'css/[name].[hash].css' : 'css/[name].css',
        }),
        new CleanWebpackPlugin(config.outputPath),
        new ManifestPlugin({
            writeToFileEmit: true,
            basePath: config.outputPrefix,
            map: function (item) {
                if (item.name.charAt(0) === '/') {
                    item.name = item.path.substring(1);
                }

                if (utils.isWebpackDevServer) {
                    item.path = 'http://localhost:' + config.devServerPort + item.path;
                } else if (config.cdn) {
                    item.path = config.cdn + item.path;
                }
                return item;
            },
        }),
    ],
};

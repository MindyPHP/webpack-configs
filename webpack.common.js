const config = require('./config');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: config.entry,
    plugins: [
        new CleanWebpackPlugin(config.outputPath),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|svg|ttf|woff|woff2)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    publicPath: config.outputPrefix,
                    outputPath: 'assets/',
                    useRelativePath: process.env.NODE_ENV === "production"
                }
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: config.outputPath
    }
};

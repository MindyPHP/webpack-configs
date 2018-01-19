const config = require('./config');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: config.outputPath,
        compress: true,
        hot: true,
        historyApiFallback: true,
        port: 8080
    }
});

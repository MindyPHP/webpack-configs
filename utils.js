const path = require('path');

function isWebpackDevServer() {
    return path.basename(process.argv.slice(1, 2)[0]) === 'webpack-dev-server';
}

module.exports = {
    isProduction: process.env.NODE_ENV === 'production',
    isWebpackDevServer: isWebpackDevServer()
};

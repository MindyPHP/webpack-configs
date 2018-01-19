const path = require('path');

module.exports = {
    entry: {
        app: [
            './assets/js/app.js',
            './assets/css/app.scss',
        ],
    },
    outputPrefix: '/build/',
    outputPath: path.resolve(__dirname, 'build')
};

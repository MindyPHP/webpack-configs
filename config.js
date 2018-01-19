const path = require('path');

module.exports = {
    entry: {
        app: [
            './assets/js/app.js',
            './assets/css/app.scss'
        ],
    },
    outputPrefix: '/themes/svetobox/',
    outputPath: path.resolve(__dirname, 'build'),
    devServerPort: 8080,
    cdn: false,
};

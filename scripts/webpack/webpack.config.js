//Core
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//Constants
const { BUILD_DIRECTORY, PROJECT_ROOT, SOURCE_DIRECTORY } = require('./constants');

const cleanOptions = {
    verbose: true,
    root:    PROJECT_ROOT,
};

module.exports = () => {

    return {
        entry:  SOURCE_DIRECTORY,
        output: {
            path:     BUILD_DIRECTORY,
            filename: 'bundle.js',
        },
        mode:    'none',
        devtool: false,
        plugins: [
            new HtmlWebpackPlugin({
                template: './static/template.html',
                title:    'Learning Webpack!🚀',
                favicon:  './static/favicon.ico',
            }),
            new CleanWebpackPlugin({ BUILD_DIRECTORY, cleanOptions })
        ],
    };
};

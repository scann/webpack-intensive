//Core
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = () => {

    return {
        mode:    'none',
        devtool: false,
        output:  {
            /**
             * With zero configuration,
             *   clean-webpack-plugin will remove files inside the directory below
             */
            path: path.resolve(process.cwd(), 'dist'),
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './static/template.html',
                title:    'Learning Webpack!🚀',
                favicon:  './static/favicon.ico',
            })
        ],
    };
};

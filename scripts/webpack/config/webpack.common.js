//Core
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Constants
const { BUILD_DIRECTORY, SOURCE_DIRECTORY } = require('../constants');
const env = require('postcss-preset-env');

module.exports = () => {

    return {
        entry:  [SOURCE_DIRECTORY],
        output: {
            path:     BUILD_DIRECTORY,
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js/,
                    use:  {
                        loader: 'babel-loader',
                    },
                },
                { //TODO: прокачать загрузку стилей
                    test: /\.css$/,
                    use:  ['style-loader',
                        {
                            loader:  'css-loader',
                            options: {
                                modules:        true,
                                localIdentName:
                                    '[path][name]__[local]--[hash:base64:5]',
                            },
                        },
                        {
                            loader:  'postcss-loader',
                            options: {
                                plugins: [
                                    // цепочка плагинов postcss
                                    env({
                                        stage: 0, //default: stage 2
                                    })
                                ],
                            },
                        }
                    ],
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './static/template.html',
                title:    'Learning Webpack!🚀',
                favicon:  './static/favicon.ico',
            })
        ],
    };
};

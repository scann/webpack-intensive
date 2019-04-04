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
                    test:    /\.js/,
                    exclude: /node_modules/,
                    use:     {
                        loader: 'babel-loader',
                    },
                },
                {
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
                                        stage:    0, //default: stage 2
                                        features: {
                                            'custom-media-queries': {
                                                importFrom: [
                                                    {
                                                        customMedia: {
                                                            '--phonePortrait':
                                                                '(width <= 414px)',
                                                            '--phoneLandscape':
                                                            '(width >= 415px) and (width <= 667px)',
                                                            '--tabletPortrait':
                                                                '(width >= 668px) and (width <= 768px)',
                                                            '--tabletLandscape':
                                                                '(width >= 769px) and (width <= 1024px)',
                                                            '--desktopS':
                                                                '(width >= 1025px) and (width <= 1366px)',
                                                            '--desktopM':
                                                                '(width >= 1367px) and (width <= 1680px)',
                                                            '--desktopL':
                                                                '(width >= 1681px) and (width <= 1920px)',
                                                            '--desktopXL':
                                                                '(width >= 1921px)',
                                                        },
                                                    }
                                                ],
                                            },
                                        },
                                    })
                                ],
                            },
                        }
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg)$/,
                    use:  [
                        {
                            loader:  'file-loader',
                            options: {
                                name: 'images/[name].[ext]',
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

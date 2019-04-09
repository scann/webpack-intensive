//Core
import { DefinePlugin } from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import WebpackBar from 'webpackbar';
import merge from 'webpack-merge';

//Constants
const { BUILD_DIRECTORY, SOURCE_DIRECTORY } = require('../constants');

//Modules
import * as modules from '../modules';

export default () => {
    const { NODE_ENV } = process.env;

    return merge({
        entry:  [SOURCE_DIRECTORY],
        output: {
            path:       BUILD_DIRECTORY,
            filename:   'js/bundle.js',
            publicPath: '/',
        },
        plugins: [
            new DefinePlugin({
                __API_URI__: 'https://',
                __ENV__:     JSON.stringify(NODE_ENV),
                __DEV__:     NODE_ENV === 'development',
                __STAGE__:   NODE_ENV === 'stage',
                __PROD__:    NODE_ENV === 'production',

                //HELLO_SIMPLE:      'hello',
                //HELLO_STRINGIFIED: JSON.stringify('hello'),
            }),
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: ['You application is running here http://localhost:3000'],
                    notes:    ['Some additional notes to be displayed upon successful compilation'],
                },
                clearConsole: true,

            }),
            new WebpackBar({
                profile: true,
                color:   'blue',
            })
        ],
    },
    modules.loadJavaScript(),
    modules.loadFonts(),
    modules.loadSass(),
    modules.loadImages(),
    modules.loadSvg(),
    modules.setupHtml(),
    );
};

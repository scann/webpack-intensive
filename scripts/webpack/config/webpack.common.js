//Core
import { DefinePlugin } from 'webpack';
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

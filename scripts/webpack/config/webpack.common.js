//Core
import { DefinePlugin } from 'webpack';
import merge from 'webpack-merge';

//Constants
import { SOURCE_DIRECTORY, BUILD_DIRECTORY } from '../constants';

//Modules
import * as modules from '../modules';

/**
 *
 * Типы конфигов вебпак:
 * Function
 * Object
 * Promise
 */

export default () => {

    const { NODE_ENV } = process.env;
    const IS_DEV = NODE_ENV === 'development';

    return merge({
        entry:  [SOURCE_DIRECTORY],
        output: {
            path:          BUILD_DIRECTORY,
            filename:      'js/bundle.[hash:5].js',
            chunkFilename: 'js/bundle.[chunkhash:5].js', //TODO research
            // filename:      IS_DEV ? 'js/[name].[hash].[id].js' :'js/[name].[contenthash].[id].js',
            // chunkFilename: IS_DEV ? 'js/[name].[chunkhash:5].[id].js' : 'js/[name].[chunkhash:5].[id].js',
            publicPath:    '/',
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
    modules.filterMomentLocales(),
    modules.loadJavaScript(),
    modules.loadFonts(),
    modules.loadSass(),
    modules.loadImages(),
    modules.loadSvg(),
    modules.setupHtml(),
    );
};

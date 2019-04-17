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
    const IS_DEVELOPMENT = NODE_ENV === 'development';

    return merge({
        entry:  [SOURCE_DIRECTORY],
        output: {
            path:     BUILD_DIRECTORY,
            filename: IS_DEVELOPMENT
                ? 'js/bundle.[hash].bundle.js'
                : 'js/bundle.[chunkhash].bundle.js', //entry point bundle name
            chunkFilename:    'js/bundle.[chunkhash].chunk.js', //chunk name
            publicPath:       '/',
            hashDigestLength: 5, //hash length
        },
    },
    modules.defineEnvVariables,
    modules.loadJavaScript(),
    modules.loadSass(),
    modules.loadFonts(),
    modules.loadImages(),
    modules.loadSvg(),
    modules.setupHtml(),
    modules.filterMomentLocales(),
    modules.provideGlobals()
    );
};

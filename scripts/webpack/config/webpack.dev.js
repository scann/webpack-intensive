//Core
import merge from 'webpack-merge';

//Configurations
import getCommonConfig from './webpack.common';

//Modules
import * as modules from '../modules';

/**
 *
 * Типы конфигов вебпак:
 * Function
 * Object
 * Promise
 */

module.exports = () => {

    return merge(getCommonConfig(), {
        mode:    'development',
        devtool: 'cheap-module-eval-source-map',
        entry:   ['webpack-hot-middleware/client?reload=true&quiet=true'],
    },
    modules.connectHMR(),
    modules.connectFriendlyErrors(),
    modules.loadDevCss(),
    );
};

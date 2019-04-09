//Core
import { HotModuleReplacementPlugin } from 'webpack';
import merge from 'webpack-merge';

//Configurations
import getCommonConfig from './webpack.common';

//Modules
import * as modules from '../modules';

module.exports = () => {

    return merge(getCommonConfig(), {
        mode:    'development',
        devtool: 'cheap-module-eval-source-map',
        entry:   ['webpack-hot-middleware/client?reload=true&quiet=true'],
        plugins: [
            new HotModuleReplacementPlugin()
        ],
    },
    modules.loadDevCss(),
    );
};

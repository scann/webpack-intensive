//Core
import CleanWebpackPlugin from 'clean-webpack-plugin';
import merge from 'webpack-merge';

//Constants
import { BUILD_DIRECTORY, PROJECT_ROOT } from '../constants';

//Configurations
import getCommonConfig from './webpack.common';

//Modules
import * as modules from '../modules';

const cleanOptions = {
    verbose: true,
    root:    PROJECT_ROOT,
};

module.exports = () => {

    return merge(getCommonConfig(), {
        mode:    'none',
        devtool: false,
        plugins: [new CleanWebpackPlugin({ BUILD_DIRECTORY, cleanOptions })],
    },
    modules.loadProdCss(),
    modules.optimizeImages(),
    );
};

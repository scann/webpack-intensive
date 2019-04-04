//Core
import CleanWebpackPlugin from 'clean-webpack-plugin';
import merge from 'webpack-merge';

//Constants
import { BUILD_DIRECTORY, PROJECT_ROOT } from '../constants';

//Configurations
import getCommonConfig from './webpack.common';

const cleanOptions = {
    verbose: true,
    root:    PROJECT_ROOT,
};

module.exports = () => {

    return merge(getCommonConfig(), {
        mode:    'production',
        devtool: false,
        plugins: [new CleanWebpackPlugin({ BUILD_DIRECTORY, cleanOptions })],
    });
};

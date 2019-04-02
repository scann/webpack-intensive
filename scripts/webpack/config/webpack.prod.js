//Core
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

//Constants
const { BUILD_DIRECTORY, PROJECT_ROOT } = require('../constants');

//Configurations
const getCommonConfig = require('./webpack.common');

const cleanOptions = {
    verbose: true,
    root:    PROJECT_ROOT,
};

module.exports = () => {

    return merge(getCommonConfig(), {
        mode:    'none',
        devtool: false,
        plugins: [new CleanWebpackPlugin({ BUILD_DIRECTORY, cleanOptions })],
    });
};

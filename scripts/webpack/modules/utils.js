//Core
import { DefinePlugin, HotModuleReplacementPlugin, ProvidePlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

//Constants
import { BUILD_DIRECTORY, PROJECT_ROOT } from '../constants';

export const connectBuildProgressIndicator = () => ({
    plugins: [new WebpackBar()],
});

export const connectFriendlyErrors = () => ({
    plugins: [new FriendlyErrorsWebpackPlugin()],
});

export const connectHMR = () => ({
    plugins: [new HotModuleReplacementPlugin()],
});

export const cleanDirectories = () => ({
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [BUILD_DIRECTORY],
            verbose:                      true,
            root:                         PROJECT_ROOT,
        })
    ],
});

export const connectBundleAnalyzer = () => ({
    plugins: [new BundleAnalyzerPlugin({
        analyzerMode:      'disabled',
        openAnalyzer:      false,
        generateStatsFile: true,
    })
    ],
});
export const defineEnvVariables = () => {
    const { NODE_ENV } = process.env;

    return {
        plugins: [
            new DefinePlugin({
                __API_URI__: 'https://',
                __ENV__:     JSON.stringify(NODE_ENV),
                __DEV__:     NODE_ENV === 'development',
                __STAGE__:   NODE_ENV === 'stage',
                __PROD__:    NODE_ENV === 'production',
            })
        ],
    };
};

export const provideGlobals = () => ({
    plugins: [
        new ProvidePlugin({
            React: 'react',
            $:     'jquery',
            _:     'lodash-es',
        })
    ],
});

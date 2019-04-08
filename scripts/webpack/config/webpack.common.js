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
                RELEASE:           '2.0',
                TWO:               '1+1',
                THREE:             JSON.stringify(3),
                FOUR:              4,
                TRUE_SIMPLE:       true,
                TRUE_STRINGIFIED:  JSON.stringify(true),
                HELLO_SIMPLE:      'hello',
                HELLO_STRINGIFIED: JSON.stringify('hello'),
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

//Core
import merge from 'webpack-merge';

//Constants
const { BUILD_DIRECTORY, SOURCE_DIRECTORY } = require('../constants');

//Modules
import * as modules from '../modules';

export default () => {

    return merge({
        entry:  [SOURCE_DIRECTORY],
        output: {
            path:     BUILD_DIRECTORY,
            filename: 'bundle.js',
        },
    },
    modules.loadJavaScript(),
    modules.loadCss(),
    modules.loadimages(),
    modules.loadSvg(),
    modules.setupHtml(),
    );
};

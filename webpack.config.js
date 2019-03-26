//Core
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Типы конфигов вебпак:
 * Object
 * Function
 * Promise
 */
const delay = (timeout = 1000) =>
    new Promise(resolve => setTimeout(resolve, timeout));
/*
module.exports = {
    mode: 'none',
    devtool: false,
};*/
/*
module.exports = async () => {

    console.log('1');

    //pause 1000ms
    await  delay();

    console.log('2');

    return {
        mode: 'none',
        devtool: false,
    }
};*/

/*
module.exports = Promise.resolve({
    mode: 'none',
    devtool: false,
});*/

module.exports = () => {

    return {
        mode: 'none',
        devtool: false,
        plugins: [
            //every plugin is a constructor

            new HtmlWebpackPlugin({
                template: './static/template.html',
                title: 'Learning Webpack!🚀',
                favicon: './static/favicon.ico',
            })
        ]
    };
};

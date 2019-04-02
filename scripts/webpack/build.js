// 1.webpack
// 2.config
// 3.create webpack compiler
// 4.run

//Core
const webpack = require('webpack');
const chalk = require('chalk');

//Config
const getProdConfig = require('./config/webpack.prod');

const compiler = webpack(getProdConfig());

compiler.run((error, stats) => {
    if (error) {
        //configuration error
        console.error(error.stack || error);

        if (error.details) {
            console.error(error.details);
        }

        return null;
    }

    const info = stats.toString({
        hash:        true,
        colors:      true,
        version:     true,
        env:         true,
        modules:     false,
        entrypoints: false,
    });

    console.log(chalk.green('Build completed'));
    console.log(info);

    if (stats.hasErrors()) { //errors during compilation process(broken import, syntax error etc)
        console.log(chalk.red('--Error!'));
        console.error(info);
    }

    if (stats.hasWarnings()) { //warnings during compilation process
        console.log(chalk.yellow('--Warning!'));
        console.warn(info);
    }

});

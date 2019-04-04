// 1.webpack
// 2.webpack-dev-server(express + webpack-dev-middleware + helpers)
// 3.webpack-hot-middleware
// 4.config
// 5.create webpack compiler
// 6.run

//Core
const webpack = require('webpack');
const DevServer = require('webpack-dev-server');
const hot = require('webpack-hot-middleware');
const chalk = require('chalk');
//const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const { choosePort } = require('./utils');
//const opener = require('opener');
const openBrowser = require('react-dev-utils/openBrowser');
//Config
const getDevConfig = require('./config/webpack.dev');

//Hot reloading
// 1. настроить на сервере
// 2. настроить на клиенте
// 3. настроить в вебпаке
// 4. настроить в исходном коде

//Constants
const { HOST, PORT } = require('./constants');

const compiler = webpack(getDevConfig());

(async () => {
    try {
        const selectedPort = await choosePort(PORT);

        if (!selectedPort) {
            console.log(chalk.yellow('--It\'s impossible to run the app :('));

            return null;
        }
        const server = new DevServer(compiler, {
            host:               HOST,
            port:               selectedPort,
            historyApiFallback: true,
            overlay:            true,
            quiet:              true,
            clientLogLevel:     'none',
            noInfo:             true,
            after:              (app) => {
                app.use(
                    hot(compiler, {
                        log: false,
                    }),
                );
            },
        });

        server.listen(selectedPort, HOST, () => {
            console.log(`${chalk.green('--Server listening on')} ${chalk.blue(
                `http://${HOST}:${selectedPort}`,
            )}`,
            );
        });
        openBrowser(`http://${HOST}:${selectedPort}`);
    } catch (error) {
        console.log(chalk.red('--Error!'));
        console.log(error.message || error);
    }
})();

// 1.webpack
// 2.webpack-dev-server(express + webpack-dev-middleware + helpers)
// 3.webpack-hot-middleware
// 4.config
// 5.create webpack compiler
// 6.run

//Hot reloading
// 1. настроить на сервере
// 2. настроить на клиенте
// 3. настроить в вебпаке
// 4. настроить в исходном коде

//Core
import webpack from 'webpack';
import DevServer from 'webpack-dev-server';
import hot from 'webpack-hot-middleware';
import chalk from 'chalk';
//const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
import { choosePort } from './utils';
//const opener = require('opener');
import openBrowser from 'react-dev-utils/openBrowser';

//Config
import getDevConfig from './config/webpack.dev';

//Constants
import { HOST, PORT } from './constants';

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

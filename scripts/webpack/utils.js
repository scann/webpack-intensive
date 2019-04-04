import chalk from 'chalk';
import detectPort from 'detect-port-alt';
import inquirer from 'inquirer';

export const choosePort = async (defaultPort) => {
    try {
        const port = await detectPort(defaultPort);

        if (port === defaultPort) {
            return defaultPort;
        }

        const message = `Port ${defaultPort} is already in use`;

        if (process.stdout.isTTY) {
            const questionName = 'changePort';
            const question = {
                type:    'confirm',
                name:    questionName,
                message: chalk.yellow(`${message}. Do you want to run the app on another port?`),
                default: true,
            };

            const result = await inquirer.prompt(question);

            return result[questionName] ? port : null;
        }
        console.log(chalk.red(`--${message}`));

    } catch (err) {
        console.log(chalk.red('--Error!'));
        console.log(err.message || err);
    }

    return null;
};

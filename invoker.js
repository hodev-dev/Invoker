const { Command } = require('commander');
const program = new Command();
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const chalk = require('chalk');
const spawn = require('child_process').spawn;
const fs = require('fs');
const fsPromises = fs.promises;

program
    .command('migrate')
    .alias('mig')
    .description('run migration.ts in server/database/migration')
    .option(
        '-m, --messege <mode>',
        'Which exec mode to use',
        'default migration',
    )
    .option(
        '-s, --source <mode>',
        'Which exec mode to use',
        'default migration',
    )
    .action(async (options) => {
        console.log('migration messege:', chalk.cyan(options.messege));
        const migratePath = path.join(
            __dirname,
            'server',
            'database',
            'migration',
            'migrate.ts',
        );
        try {
            const ts = spawn(
                `ts-node`,
                [
                    '-r',
                    'tsconfig-paths/register',
                    migratePath,
                    'start_messege',
                    options.messege,
                    'end_messege',
                ],
                { stdio: 'inherit' },
            );
            ts.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        } catch (error) {
            console.error(error);
        }
    });

program
    .command('migrate:history')
    .alias('mig:h')
    .description('show diffrent version of database for rollback')
    .option(
        '-m, --messege <mode>',
        'Which exec mode to use',
        'default migration',
    )
    .option(
        '-s, --source <mode>',
        'Which exec mode to use',
        'default migration',
    )
    .action(async (options) => {
        const historyPath = path.join(
            'server',
            'database',
            'migration',
            '.versions',
            'version.json',
        );
        try {
            const data = await fsPromises.readFile(historyPath, 'utf8');
            console.log(JSON.parse(data, null, 4).reverse());
        } catch (error) {
            console.log(error);
        }
    });

program
    .command('migrate:rollback')
    .arguments('<version>')
    .alias('mig:r')
    .description('rollback database to given version')
    .option(
        '-d, --database <mode>',
        'Which exec mode to use',
        'default migration',
    )
    .action(async (version, options) => {
        const historyPath = path.join(
            'server',
            'database',
            'migration',
            '.versions',
            'version.json',
        );
        const data = await fsPromises.readFile(historyPath, 'utf8');
        const select = JSON.parse(data).find((snapshot) => {
            if (snapshot.version === version) {
                return snapshot;
            }
        });
        console.log(select);
        const dropPath = path.join(
            __dirname,
            'server',
            'database',
            'migration',
            'drop.ts',
        );
        try {
            const ts = spawn(
                `ts-node`,
                [
                    '-r',
                    'tsconfig-paths/register',
                    dropPath,
                    'start_messege',
                    options.messege,
                    'end_messege',
                ],
                { stdio: 'inherit' },
            );
            ts.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                const ts2 = spawn(
                    'psql',
                    ['-d', options.database, '-1', '-f', select.path],
                    {
                        stdio: 'inherit',
                    },
                );
                ts2.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });
            });
        } catch (error) {
            console.log(error);
        }
    });

program
    .command('make:view')
    .arguments('<name>')
    .alias('mk:v')
    .description('make view in client directory')
    .action(async (name, options) => {
        try {
            const viewTemplatePath = path.join(
                __dirname,
                'core',
                'template',
                'view.jsx',
            );
            const viewPath = path.join(__dirname, 'client', name + '.jsx');
            const data = await fsPromises.readFile(viewTemplatePath, 'utf8');
            const newView = data.replaceAll('VIEW_NAME', name);
            try {
                await fsPromises.access(viewPath);
                console.log(`view ${name} already exists!`);
            } catch (error) {
                await fsPromises.writeFile(viewPath, newView);
                console.log(`view ${name} created`);
            }
        } catch (error) {
            console.log(error);
        }
    });

program
    .command('make:controller')
    .arguments('<name>')
    .alias('mk:c')
    .description('make controller in server/controller directory')
    .action(async (name, options) => {
        try {
            const viewTemplatePath = path.join(
                __dirname,
                'core',
                'template',
                'controller.ts',
            );
            const viewPath = path.join(
                __dirname,
                'server',
                'controller',
                name + '.ts',
            );
            const data = await fsPromises.readFile(viewTemplatePath, 'utf8');
            const newView = data
                .replaceAll('CONTROLLER', name)
                .replaceAll('ICONTROLLER', 'I' + name);
            try {
                await fsPromises.access(viewPath);
                console.log(chalk.yellow(`controller ${name} already exists!`));
            } catch (error) {
                await fsPromises.writeFile(viewPath, newView);
                console.log(chalk.green(`controller ${name} created`));
            }
        } catch (error) {
            console.log(error);
        }
    });

program
    .command('make:model')
    .arguments('<name>')
    .alias('mk:m')
    .description('make model in server/model directory')
    .action(async (name, options) => {
        try {
            const viewTemplatePath = path.join(
                __dirname,
                'core',
                'template',
                'model.ts',
            );
            const viewPath = path.join(
                __dirname,
                'server',
                'model',
                name + '.ts',
            );
            const data = await fsPromises.readFile(viewTemplatePath, 'utf8');
            const newView = data.replaceAll('MODEL_NAME', name);
            try {
                await fsPromises.access(viewPath);
                console.log(chalk.yellow(`model ${name} already exists!`));
            } catch (error) {
                await fsPromises.writeFile(viewPath, newView);
                console.log(chalk.green(`model ${name} created`));
            }
        } catch (error) {
            console.log(error);
        }
    });

program.parse(process.argv);

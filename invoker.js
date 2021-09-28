const { Command } = require('commander');
const program = new Command();
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const chalk = require('chalk');
const spawn = require('child_process').spawn;

program
    .command('migrate')
    .alias('mig')
    .description('execute the given remote cmd')
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
                ['-r', 'tsconfig-paths/register', migratePath],
                { stdio: 'inherit' },
            );
            ts.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
            // const { stdout, stdin, stderr } = await exec(
            //     `ts-node -r tsconfig-paths/register ${migratePath} --messegeStart ${options.messege} --messegeEnd`,
            // );
            // process.stdout.write(chalk.green(stdout));
            // process.stdout.write(chalk.red(stderr));
        } catch (error) {
            console.error(error);
        }
    });

program.parse(process.argv);

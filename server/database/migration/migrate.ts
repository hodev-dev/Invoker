import useDatabase from '@config/database';
import useMigration from '@core/database/migration/useMigration';
import useRawQuery from '@core/database/query/useRawQuery';
import useSequence from '@core/utility/useSequence';
const chalk = require('chalk');

console.log(process.argv);

const [pg] = useDatabase();
const query = useRawQuery();
const sequence = useSequence();
const migration = useMigration();

async function dropSchema() {
    try {
        await pg.query({
            name: 'drop',
            text: 'DROP SCHEMA IF EXISTS public CASCADE;',
        });
        console.log(`drop schema:`, chalk.green('successfull'));
    } catch (error) {
        console.error(`drop schema:`, chalk.red(error));
        throw error;
    }
}

async function createSchema() {
    try {
        await pg.query({
            name: 'create',
            text: 'CREATE SCHEMA IF NOT EXISTS public;',
        });
        console.log(`create schema :`, chalk.green('successfull'));
    } catch (error) {
        console.error(`create schema :`, chalk.red(error));
        throw error;
    }
}

async function createTable(table: string, isBackup: boolean) {
    try {
        const messege = await migration.getMessege(process.argv);
        if (isBackup) {
            await migration.backupPostgreSql(__dirname, messege, 6);
        }
        const raw = await query.getMigrationQeury(table);
        await pg.query({ name: table, text: raw });
        console.log(`migration ${table}:`, chalk.green('successfull'));
    } catch (error) {
        console.error(`migration ${table}:`, chalk.red(error));
        throw error;
    }
}

function* tasks() {
    yield () => dropSchema();
    yield () => createSchema();
    yield () => createTable('users_table', false);
}

async function taskRunner() {
    try {
        await pg.query('BEGIN');
        await sequence.runSync(tasks);
        await pg.query('COMMIT');
        console.log('migration:', chalk.green('successfull'));
    } catch (error) {
        await pg.query('ROLLBACK');
        console.log('migration:', chalk.magenta('rollback'));
    } finally {
        await pg.end();
    }
}

taskRunner();
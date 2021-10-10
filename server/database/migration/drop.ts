import useDatabase from '@config/database';
import useMigration from '@core/database/migration/useMigration';
import useRawQuery from '@core/database/query/useRawQuery';
import useSequence from '@core/utility/useSequence';
const chalk = require('chalk');

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

function* tasks() {
    yield () => dropSchema();
    yield () => createSchema();
}

async function taskRunner() {
    try {
        await sequence.runSync(tasks);
        console.log('rollback:', chalk.green('successfull'));
    } catch (error) {
        console.log('rollback:', chalk.red('failed'));
    } finally {
        await pg.end();
    }
}

taskRunner();

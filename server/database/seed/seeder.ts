import useDatabase from '@config/database';
import useRawQuery from '@core/database/query/useRawQuery';
import useSequence from '@core/utility/useSequence';
const chalk = require('chalk');

const [pg] = useDatabase();
const query = useRawQuery();
const sequence = useSequence();

async function truncate(table: string) {
    try {
        const seedQuery = `Delete from ${table}`;
        await pg.query({ name: table, text: seedQuery });
        console.log(`truncate ${table}:`, chalk.green('successfull'));
    } catch (error) {
        console.log(error);
        console.log(`truncate ${table}:`, chalk.red('failed'));
        throw error;
    }
}

async function seedTable(table: string) {
    try {
        const seedQuery = await query.getSeedQuery(table);
        await pg.query({ name: table, text: seedQuery });
        console.log(`seed ${table}:`, chalk.green('successfull'));
    } catch (error) {
        console.log(error);
        console.log(`seed ${table}:`, chalk.red('failed'));
        throw error;
    }
}

function* tasks() {
    yield () => truncate('users');
    yield () => truncate('roles');
    yield () => truncate('user_role');
    yield () => seedTable('users_seeder');
    yield () => seedTable('roles_seeder');
    yield () => seedTable('user_role_seeder');
    yield () => seedTable('permissions_seeder');
    yield () => seedTable('role_permission_seeder');
    yield () => seedTable('collections_seeder');
    yield () => seedTable('gifts_seeder');
    yield () => seedTable('collection_gift_seeder');
    yield () => seedTable('currencies_seeder');
    yield () => seedTable('codes_seeder');
}

async function taskRunner() {
    try {
        await pg.query('BEGIN');
        await sequence.runSync(tasks);
        await pg.query('COMMIT');
        console.log('seed:', chalk.green('successfull'));
    } catch (error) {
        await pg.query('ROLLBACK');
        console.log('seed:', chalk.magenta('rollback'));
    } finally {
        await pg.end();
    }
}

taskRunner();

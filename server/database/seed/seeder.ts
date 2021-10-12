import useDatabase from '@config/database';
import useRawQuery from '@core/database/query/useRawQuery';
import useSequence from '@core/utility/useSequence';
const chalk = require('chalk');

console.log(process.argv);

const [pg] = useDatabase();
const query = useRawQuery();
const sequence = useSequence();

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
    yield () => seedTable('users_seeder');
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

import useDatabase from '@config/database';
import useMigration from '@core/database/migration/useMigration';
import useRawQuery from '@core/database/query/useRawQuery';
import useSequence from '@core/utility/useSequence';
const chalk = require('chalk');

console.log(process.argv);

const [pg] = useDatabase();
const query = useRawQuery();
const sequence = useSequence();

async function seedTable(table: string, isBackup: boolean) {
    try {
    } catch (error) {
        throw error;
    }
}

function* tasks() {
    yield () => seedTable('books', true);
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

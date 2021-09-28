import useDatabase from '@config/database';
import useMigration from '@core/database/migration/useMigration';
import useRawQuery from '@core/database/query/useRawQuery';
import useSequence from '@core/utility/useSequence';
const chalk = require('chalk');

const [pg] = useDatabase();
const query = useRawQuery();
const sequence = useSequence();
const migration = useMigration();

async function createTable(table: string, isBackup: boolean = false) {
    try {
        if (isBackup) {
            await migration.backupPostgreSql(table);
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
    yield () => createTable('books', true);
    yield () => createTable('covers');
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

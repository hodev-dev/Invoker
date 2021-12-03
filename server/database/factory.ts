import tickets_faker from '@server/database/factory/tickets_factory';
import useFactory from '@core/database/factory/useFactory';
import useSequence from '@core/utility/useSequence';
import chalk from 'chalk';

const factory = useFactory();
const sequence = useSequence();

function* tasks() {
    yield () => factory.makeSeeder(tickets_faker.table, tickets_faker.count);
}

let run = async () => {
    try {
        await sequence.runSync(tasks);
    } catch (e) {
        console.log(e);
        console.log(`create seeder factory :`, chalk.red('failed'));
    }
};

run().finally(() => {
    process.exit();
});
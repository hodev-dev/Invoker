import tickets_faker from "@server/database/factory/tickets_factory";
import useFactory from "@core/database/factory/useFactory";
import useSequence from "@core/utility/useSequence";
// @ts-ignore
import chalk from "chalk";
import user_ticket_factory from "@server/database/factory/user_ticket_factory";

const factory = useFactory();
const sequence = useSequence();

function* tasks() {
    yield () => factory.makeSeeder(tickets_faker.table, tickets_faker.count);
    yield () => factory.makeSeeder(user_ticket_factory.table, user_ticket_factory.count);
}

let run = async () => {
    try {
        await sequence.runSync(tasks);
    } catch (e) {
        console.log(e);
        console.log(`create seeder factory :`, chalk.red("failed"));
    }
};

run().finally(() => {
    process.exit();
});

import useDatabase from '@config/database';
import useRawQuery from '@core/database/query/useRawQuery';

let Ticket = () => {
    const [pg] = useDatabase();
    const rawQuery = useRawQuery();

    const getAllTickets = async () => {
        try {
            const queryRaw = await rawQuery.get(['ticket', 'get'], 'test');
            console.log(queryRaw);
        } catch (error) {
            console.log({ error });
        }
    };

    return {
        getAllTickets,
    };
};

export default Ticket;

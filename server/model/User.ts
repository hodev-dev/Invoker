import useDatabase from '@config/database';
import useRawQuery from '@core/database/query/useRawQuery';

var User = () => {
    const [pg] = useDatabase();
    const rawQuery = useRawQuery();

    const findById = async () => {
        try {
            const queryRaw = await rawQuery.get('FindUserById');
            const results = await pg.query({
                name: 'FindUserById',
                text: queryRaw,
                values: [1],
            });
            return results.rows[0];
        } catch (error) {
            console.log({ error });
        }
    };

    return {
        findById,
    };
};

export { User };

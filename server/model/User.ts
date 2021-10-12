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
    const findUserByEmailPassword = async (username, password) => {
        try {
            const queryRaw = await rawQuery.get('FindUserByEmailPassword');
            const results = await pg.query({
                name: 'FindByUsernamePassword',
                text: queryRaw,
                values: [username, password],
            });
            return results.rows[0];
        } catch (error) {
            return false;
            console.log({ error });
        }
    };
    return {
        findById,
        findUserByEmailPassword,
    };
};

export { User };

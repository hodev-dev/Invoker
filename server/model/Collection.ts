import useDatabase from '@config/database';
import useRawQuery from '@core/database/query/useRawQuery';

var Collection = () => {
    const [pg] = useDatabase();
    const rawQuery = useRawQuery();

    const getAllCollections = async () => {
        try {
            const queryRaw = await rawQuery.get('GetCollections');
            const results = await pg.query({
                name: 'GetCollections',
                text: queryRaw,
            });
            return results.rows;
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    return {
        getAllCollections,
    };
};

export default Collection;

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

    const addCollection = async (title, country) => {
        try {
            const queryRaw = await rawQuery.get('AddCollection');
            await pg.query({
                name: 'AddCollection',
                text: queryRaw,
                values: [title, country],
            });
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    const deleteCollection = async (id) => {
        try {
            const queryRaw = await rawQuery.get('DeleteCollection');
            await pg.query({
                name: 'DeleteCollection',
                text: queryRaw,
                values: [id],
            });
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    const updateCollection = async (id, title, country) => {
        try {
            const queryRaw = await rawQuery.get('UpdateCollection');
            await pg.query({
                name: 'UpdateCollection',
                text: queryRaw,
                values: [id, title, country],
            });
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    return {
        getAllCollections,
        addCollection,
        deleteCollection,
        updateCollection,
    };
};

export default Collection;

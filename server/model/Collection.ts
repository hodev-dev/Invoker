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
        } finally {
            await pg.end();
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
        } finally {
            await pg.end();
        }
    };

    const assignGift = async (gift, collection) => {
        try {
            const queryRaw = await rawQuery.get('AssignGiftCollection');
            await pg.query({
                name: 'AssignGiftCollection',
                text: queryRaw,
                values: [collection, gift],
            });
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await pg.end();
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
        } finally {
            await pg.end();
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
        } finally {
            await pg.end();
        }
    };

    const delete_gift = async (id: number) => {
        try {
            const queryRaw = await rawQuery.get('DeleteGiftFromCollectionGiftWithId');
            await pg.query({
                name: 'DeleteGiftFromCollectionGiftWithId',
                text: queryRaw,
                values: [id],
            });
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await pg.end();
        }
    };

    return {
        getAllCollections,
        addCollection,
        deleteCollection,
        delete_gift,
        updateCollection,
        assignGift,
    };
};

export default Collection;

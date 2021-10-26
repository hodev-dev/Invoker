import useDatabase from '@config/database';
import useRawQuery from '@core/database/query/useRawQuery';

var Gift = () => {
    const [pg] = useDatabase();
    const rawQuery = useRawQuery();

    const getAllGifts = async () => {
        try {
            const queryRaw = await rawQuery.get('GetAllGifts');
            const results = await pg.query({
                name: 'GetAllGifts',
                text: queryRaw,
            });
            return results.rows;
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    const delete_gift = async (id: number) => {
        try {
            await pg.query('BEGIN');
            const queryRaw = await rawQuery.get('DeleteGiftFromCollectionGiftWithId');
            const queryRaw2 = await rawQuery.get('DeleteGiftWithId');
            await pg.query({
                name: 'DeleteGiftFromCollectionGiftWithId',
                text: queryRaw,
                values: [id],
            });
            await pg.query({
                name: 'DeleteGiftWithId',
                text: queryRaw2,
                values: [id],
            });
            await pg.query('COMMIT');
            return true;
        } catch (error) {
            await pg.query('ROLLBACK');
            console.log({ error });
            return false;
        }
    };

    const add_gift = async (type, label, price) => {
        try {
            const queryRaw = await rawQuery.get('AddGift');
            await pg.query({
                name: 'AddGift',
                text: queryRaw,
                values: [type, label, price],
            });
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    return {
        getAllGifts,
        delete_gift,
        add_gift,
    };
};

export default Gift;

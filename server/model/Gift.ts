import Database from "@config/database";
import useRawQuery from "@core/database/query/useRawQuery";

const [pg] = Database();

var Gift = () => {
    const rawQuery = useRawQuery();

    const getAllGifts = async () => {
        const client = await pg.connect();
        try {
            const queryRaw = await rawQuery.get("GetAllGifts");
            const results = await client.query(queryRaw);
            return results.rows;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await client.release();
        }
    };

    const delete_gift = async (id: number) => {
        const client = await pg.connect();
        try {
            await client.query("BEGIN");
            const queryRaw = await rawQuery.get("DeleteGiftFromCollectionGiftWithId");
            const queryRaw2 = await rawQuery.get("DeleteGiftWithId");
            await client.query(queryRaw, [id]);
            await client.query(queryRaw2, [id]);
            await client.query("COMMIT");
            return true;
        } catch (error) {
            await client.query("ROLLBACK");
            console.log({ error });
            return false;
        } finally {
            await client.release();
        }
    };

    const add_gift = async (type, label, price) => {
        const client = await pg.connect();
        try {
            const queryRaw = await rawQuery.get("AddGift");
            await client.query(queryRaw, [type, label, price]);
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await client.release();
        }
    };

    return {
        getAllGifts,
        delete_gift,
        add_gift,
    };
};

export default Gift;

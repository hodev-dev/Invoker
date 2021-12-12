import Database from "@config/database";
import useRawQuery from "@core/database/query/useRawQuery";

const [pg] = Database();

const Collection = () => {
    const rawQuery = useRawQuery();

    const getAllCollections = async () => {
        const client = await pg.connect();
        try {
            const queryRaw = await rawQuery.get("GetCollections");
            const results = await client.query(queryRaw);
            return results.rows;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await client.release();
        }
    };

    const addCollection = async (title, country) => {
        const client = await pg.connect();
        try {
            const queryRaw = await rawQuery.get("AddCollection");
            await pg.query(queryRaw, [title, country]);
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await pg.release();
        }
    };

    const assignGift = async (gift, collection) => {
        const client = await pg.connect();
        try {
            const queryRaw = await rawQuery.get("AssignGiftCollection");
            await client.query({
                name: "AssignGiftCollection",
                text: queryRaw,
                values: [collection, gift],
            });
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await client.release();
        }
    };

    const deleteCollection = async (id) => {
        const client = await pg.connect();
        try {
            const queryRaw = await rawQuery.get("DeleteCollection");
            await client.query(queryRaw, [id]);
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await client.release();
        }
    };

    const updateCollection = async (id, title, country) => {
        const client = await pg.connect();
        try {
            const queryRaw = await rawQuery.get("UpdateCollection");
            await client.query(queryRaw, [id, title, country]);
            return true;
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
            const queryRaw = await rawQuery.get("DeleteGiftFromCollectionGiftWithId");
            await client.query(queryRaw, [id]);
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await client.release();
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

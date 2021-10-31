import useDatabase from '@config/database';
import useRawQuery from '@core/database/query/useRawQuery';

var Currency = () => {
    const [pg] = useDatabase();
    const rawQuery = useRawQuery();

    const get_all_currency = async () => {
        try {
            const queryRaw = await rawQuery.get('GetAllCurrencies');
            const result = await pg.query({
                name: 'GetAllCurrencies',
                text: queryRaw,
                values: [],
            });
            return result.rows;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await pg.end();
        }
    };

    const add_currency = async (country, value) => {
        try {
            const queryRaw = await rawQuery.get('AddCurrency');
            const result = await pg.query({
                name: 'AddCurrency',
                text: queryRaw,
                values: [country, value],
            });
            await pg.end();
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    const delete_currency = async (id) => {
        try {
            const queryRaw = await rawQuery.get('DeleteCurrency');
            const result = await pg.query({
                name: 'DeleteCurrency',
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
        get_all_currency,
        add_currency,
        delete_currency,
    };
};

export default Currency;

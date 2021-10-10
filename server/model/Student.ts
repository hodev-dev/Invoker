import useDatabase from '@config/database';
import useRawQuery from '@core/database/query/useRawQuery';

var Student = () => {
    const [firstdb] = useDatabase();
    const rawQuery = useRawQuery();

    const test = async () => {};

    return {
        test,
    };
};

export { Student };

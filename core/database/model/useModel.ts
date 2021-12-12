import useRawQuery from '@core/database/query/useRawQuery';
import usePath from '@core/utility/usePath';
import format from 'pg-format';

let useModel = (tableName: string) => {
    const rawQuery = useRawQuery();
    const path = usePath();

    const postgres = {
        all: async (table?) => {
            const local_tableName = (table) ? table : tableName;
            const sql_path = path.node_path.join(path.postgres_model_query, 'all.sql.txt');
            const sql: string = await rawQuery.getWithPath(sql_path);
            return format(sql, local_tableName);
        },
        paginate: async (start, end, table?) => {
            const local_tableName = (table) ? table : tableName;
            const sql_path = path.node_path.join(path.postgres_model_query, 'paginate.sql.txt');
            const sql: string = await rawQuery.getWithPath(sql_path);
            return format(sql, local_tableName, local_tableName, local_tableName, start, end);
        },
    };
    return { postgres };
};
export default useModel;
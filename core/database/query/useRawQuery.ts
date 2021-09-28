import { promises as fs } from 'fs';
import path from 'path';
var useRawQuery = () => {
    const get = async (path: string) => {
        try {
            return await fs.readFile('./server/query/' + path + '.sql', 'utf8');
        } catch (error: any) {
            console.log(error);
            throw error;
        }
    };
    const getMigrationQeury = async (migrationName: string) => {
        try {
            return await fs.readFile(
                path.join('server', 'database', 'migration', migrationName) +
                    '.sql',
                'utf8',
            );
        } catch (error: any) {
            console.log(error);
            throw error;
        }
    };
    const getWithPath = async (path: string) => {
        try {
            const data = await fs.readFile(path, 'utf8');
            console.log({ data });
            return data;
        } catch (error: any) {
            console.log(error);
            throw error;
        }
    };
    return {
        get,
        getWithPath,
        getMigrationQeury,
    };
};

export default useRawQuery;

import { promises as fs } from 'fs';
import path from 'path';

let useRawQuery = () => {
    const get = async (queryPath: Array<string> | string = '', fileName: string = '') => {
        try {
            if (typeof queryPath === 'string') {
                return await fs.readFile(path.normalize(path.join('./server/query/', queryPath + '.sql')), 'utf8');
            }
            return await fs.readFile(path.normalize(path.join('./server/query', ...queryPath, fileName + '.sql')), 'utf8');
        } catch (error: any) {
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
    const getSeedQuery = async (seederName: string) => {
        try {
            return await fs.readFile(
                path.join('server', 'database', 'seed', seederName) + '.sql',
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
        getSeedQuery,
    };
};

export default useRawQuery;

const { Pool, Client } = require('pg');

var useDatabase = () => {
    const connectPG = () => {
        const pg = new Client({
            user: 'hodev2',
            host: '127.0.0.1',
            database: 'test',
            password: '668523',
            port: 5432,
        });
        pg.connect();
        return pg;
    };

    const connectPgPool = () => {
        const pg = new Pool({
            user: 'hodev2',
            host: '127.0.0.1',
            database: 'test',
            password: '668523',
            port: 5432,
        });
        pg.connect();
        return pg;
    };

    var connections = [connectPG(), connectPgPool()];
    return connections;
};

export default useDatabase;

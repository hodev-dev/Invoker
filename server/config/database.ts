const { Pool, Client } = require("pg");

let Database = () => {
    const connectPG = () => {
        let pg = new Pool({
            user: "hodev2",
            host: "127.0.0.1",
            database: "test",
            password: "668523",
            port: 5432,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
        return pg;
    };
    return [connectPG()];
};

export default Database;

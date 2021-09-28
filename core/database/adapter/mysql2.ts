import mysql from 'mysql2';
interface MYSQL2 {
    connection: any,
    makeConnection: any
}
var MYSQL2: MYSQL2 = {
    connection: undefined,
    makeConnection({ _host, _user, _database, _password }) {
        this.connection = mysql.createConnection({
            host: _host,
            user: _user,
            database: _database,
            password: _password
        });
    },
}

export default MYSQL2;
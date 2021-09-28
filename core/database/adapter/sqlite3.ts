var sqlite3 = require('sqlite3').verbose();

var Sqlite: any = () => {
    var connection: any = undefined;
    var isClosed: boolean = false;

    const getConnection = () => {
        if (connection === undefined || isClosed === true) {
            console.log("new connection created");
            connection = new sqlite3.Database('./test.db');
            return connection;
        }
        return connection;
    }

    var close = () => {
        isClosed = true;
        connection.close((err) => {
            if (err) {
                console.log(err);
            }
            console.log("connection closed");
        });
        connection = undefined;
    }

    return {
        isClosed,
        getConnection
    }

}

export default Sqlite;
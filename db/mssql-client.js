const sql = require('mssql');
const { MS_SQL_OPTIONS } = require('../config');

class MsSqlClient {
    constructor() {
        this.pool = null;
    }

    async query(ddl) {
        if (!this.pool) {
            console.log('[MS SQL client] establishing new connection');
            this.pool = await sql.connect(MS_SQL_OPTIONS);
            console.log('[MS SQL client] new connection established');
        }

        const { recordset: rows } = await this.pool.request().query(ddl);

        return rows;
    }
}


module.exports = new MsSqlClient();

const config = {
    PORT: 3000,
    HOST: 'localhost',
    PROTO_FILE_PATH: './employees.proto',
    MS_SQL_OPTIONS: {
        server: 'localhost',
        port: 1434,
        database: 'enterprise', // Replace with your database name
        user: 'elogin',
        password: '', // Replace with your password
        options: {
            encrypt: false, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    }
};

module.exports = config;

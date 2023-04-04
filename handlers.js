const dbClient = require('./db/mssql-client');
const queries = require('./db/queries');

const handlers = {
    employees: {
        GetAll: async (input, callback) => {
            try {
                const { sort, order } = input.request;
                const employees = await dbClient.query(queries.ofGetAllEmployeesFromAllFilials( sort, order));
                callback(null, { employees });
            } catch (error) {
                console.error(error);
                callback(error, null);
            }
        },
    }
};

module.exports = handlers;

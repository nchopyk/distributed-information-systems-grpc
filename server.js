const config = require('./config');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const handlers = require('./handlers');

const protoLoaderOptions = { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true, };
const packageDefinition = protoLoader.loadSync(config.PROTO_FILE_PATH, protoLoaderOptions);
const employeesProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(employeesProto.UserService.service, {
    GetAllEmployees: handlers.employees.GetAll,
});

server.bindAsync(`${config.HOST}:${config.PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log(`Server is listening on port ${port}`);
    server.start();
});



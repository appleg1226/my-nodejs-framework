"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.initializeDB = void 0;
const typeorm_1 = require("typeorm");
let connection;
async function initializeDB(config) {
    connection = await typeorm_1.createConnection(config);
}
exports.initializeDB = initializeDB;
function getConnection() {
    return connection;
}
exports.getConnection = getConnection;
//# sourceMappingURL=db-connection.js.map
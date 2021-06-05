"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const typeorm_1 = require("typeorm");
class Connection {
    static initializeDB(config) {
        Connection.connection = typeorm_1.createConnection(config);
        return Connection.connection;
    }
    static getConnection() {
        return Connection.connection;
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const my_framework_1 = require("./core/my-framework");
const post_controller_1 = require("./post/post.controller");
const post_entity_1 = require("./post/post.entity");
const post_service_1 = require("./post/post.service");
const db_connection_1 = require("./db/db-connection");
const user_controller_1 = require("./user/user.controller");
const user_entity_1 = require("./user/user.entity");
const user_service_1 = require("./user/user.service");
const myApp = new my_framework_1.MyFramework();
myApp.register([user_controller_1.UserController, post_controller_1.PostController], [user_service_1.UserService, post_service_1.PostService]);
myApp.start(3000);
db_connection_1.initializeDB({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'dmschd92',
    database: 'board',
    entities: [user_entity_1.User, post_entity_1.Post],
    synchronize: true,
    dropSchema: true,
});
//# sourceMappingURL=index.js.map
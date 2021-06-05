"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const my_framework_1 = require("../src/core/my-framework");
const db_connection_1 = require("../src/db/db-connection");
const post_controller_1 = require("../src/post/post.controller");
const post_service_1 = require("../src/post/post.service");
const user_controller_1 = require("../src/user/user.controller");
const user_entity_1 = require("../src/user/user.entity");
const user_service_1 = require("../src/user/user.service");
const post_entity_1 = require("../src/post/post.entity");
describe('Controller Test', () => {
    let app;
    beforeAll(async () => {
        const myApp = new my_framework_1.MyFramework();
        myApp.register([user_controller_1.UserController, post_controller_1.PostController], [user_service_1.UserService, post_service_1.PostService]);
        myApp.start(3000);
        await db_connection_1.initializeDB({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'dmschd92',
            database: 'board_test',
            entities: [user_entity_1.User, post_entity_1.Post],
            synchronize: true,
            dropSchema: true,
        });
        app = myApp.getExpress();
    });
    describe('UserController Test', () => {
        it('should success register', () => {
            return request(app)
                .post('/users/register')
                .send({
                id: 'kec1226',
                password: 'aa1234',
                nickname: 'appleg',
            })
                .expect(res => {
                expect(res.body.message).toEqual('Register Success!');
            });
        });
        it('should success login', () => {
            return request(app)
                .post('/users/login')
                .send({
                id: 'kec1226',
                password: 'aa1234',
                nickname: 'appleg',
            })
                .expect(res => {
                expect(res.body.message).toEqual('Login Success!');
            });
        });
        it('should success change nickname', () => {
            return request(app)
                .put('/users/nickname')
                .send({
                id: 'kec1226',
                nickname: 'appleg2',
            })
                .expect(res => {
                expect(res.body.message).toEqual('Nickname Changed!');
            });
        });
        it('should success logout', () => {
            return request(app)
                .post('/users/logout/kec1226')
                .expect(res => {
                expect(res.text).toEqual('Logout Success!');
            });
        });
    });
    describe('PostController Test', () => {
        beforeAll(() => {
            return request(app).post('/users/login').send({
                id: 'kec1226',
                password: 'aa1234',
                nickname: 'appleg',
            });
        });
        it('should create Post', () => {
            return request(app)
                .post('/posts/kec1226')
                .send({
                title: 'hello',
                content: 'world',
            })
                .expect(200)
                .expect(res => {
                expect(res.text).toEqual('Successfully Created!');
            });
        });
        it('should get All post\'s length', () => {
            return request(app)
                .get('/posts')
                .expect(200)
                .expect(res => {
                expect(res.body.length).toEqual(1);
            });
        });
        it('should match post\'s title', () => {
            return request(app)
                .get('/posts/1')
                .expect(200)
                .expect(res => {
                expect(res.body.title).toEqual("hello");
            });
        });
        it('should update post\'s content', () => {
            return request(app)
                .put('/posts/1')
                .send({
                title: 'hello',
                content: 'world222',
            })
                .expect(200)
                .expect(res => {
                expect(res.body.content).toEqual("world222");
            });
        });
        it('should delete post', () => {
            return request(app)
                .delete('/posts/1')
                .expect(200)
                .expect(res => {
                expect(res.text).toEqual('Successfully Removed!');
            });
        });
    });
});
//# sourceMappingURL=app.e2e-spec.js.map
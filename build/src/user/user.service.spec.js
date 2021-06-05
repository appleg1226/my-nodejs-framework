"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../post/post.entity");
const db_connection_1 = require("../db/db-connection");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("./user.service");
describe('UserService', () => {
    let service;
    let postRepo;
    let userRepo;
    beforeAll(async () => {
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
        service = new user_service_1.UserService();
        postRepo = typeorm_1.getRepository(post_entity_1.Post);
        userRepo = typeorm_1.getRepository(user_entity_1.User);
    });
    afterEach(async () => {
        await userRepo.delete({});
    });
    describe('user CRUD Test', () => {
        it('should create User', async () => {
            const user = userRepo.create({
                id: "kec1226",
                password: "1234",
                nickname: "dmschd"
            });
            await service.saveUser(user);
            const result = await userRepo.find();
            expect(result.length).toEqual(1);
        });
        it('should get a User', async () => {
            const user = userRepo.create({
                id: "kec1226",
                password: "1234",
                nickname: "dmschd"
            });
            await service.saveUser(user);
            const result = await service.findUser(user.id);
            expect(result.id).toEqual(user.id);
        });
        it('should change User\'s nickname', async () => {
            const user = userRepo.create({
                id: "kec1226",
                password: "1234",
                nickname: "dmschd"
            });
            await service.saveUser(user);
            user.nickname = "dmschd2";
            const result = await service.changeNickname(user);
            expect(result.nickname).toEqual('dmschd2');
        });
    });
    describe('login/out Test', () => {
        it('shoud success login', () => {
            const id = "kec1226";
            service.logIn(id);
            const loginResult = service.isLoggedIn(id);
            expect(loginResult).toEqual(true);
        });
        it('should success logout', () => {
            const id = "kec1226";
            service.logOut(id);
            const loginResult = service.isLoggedIn(id);
            expect(loginResult).toEqual(false);
        });
    });
});
//# sourceMappingURL=user.service.spec.js.map
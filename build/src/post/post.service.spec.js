"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const db_connection_1 = require("../db/db-connection");
const user_entity_1 = require("../user/user.entity");
const post_entity_1 = require("./post.entity");
const post_service_1 = require("./post.service");
describe('PostService', () => {
    let service;
    let postRepo;
    let userRepo;
    let testUser;
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
        service = new post_service_1.PostService();
        postRepo = typeorm_1.getRepository(post_entity_1.Post);
        userRepo = typeorm_1.getRepository(user_entity_1.User);
        testUser = userRepo.create({
            id: "kec1226",
            password: "hello",
            nickname: "kec1226"
        });
        await userRepo.save(testUser);
    });
    afterEach(async () => {
        await postRepo.delete({});
    });
    describe('게시글 작성 테스트', () => {
        it('should create one post', async () => {
            const post = postRepo.create({
                title: "hello",
                content: "world",
            });
            await service.savePost(post, testUser);
            const results = await service.findAll();
            expect(results.length).toEqual(1);
        });
    });
    describe('게시글을 id로 조회하는 테스트', () => {
        it('should get created post before', async () => {
            const post = postRepo.create({
                title: "hello",
                content: "world2",
            });
            const result = await service.savePost(post, testUser);
            const result2 = await service.findById(result.id);
            expect(result2.id).toEqual(post.id);
        });
    });
    describe('모든 게시물의 갯수를 세는 테스트', () => {
        it('should count all created post', async () => {
            const post1 = postRepo.create({
                title: "hello",
                content: "world1",
            });
            const post2 = postRepo.create({
                title: "hello",
                content: "world2",
            });
            const post3 = postRepo.create({
                title: "hello",
                content: "world3",
            });
            await service.savePost(post1, testUser);
            await service.savePost(post2, testUser);
            await service.savePost(post3, testUser);
            const result = await service.findAll();
            expect(result.length).toEqual(3);
        });
    });
    describe('게시물 삭제 테스트', () => {
        it('should delete post', async () => {
            const post1 = postRepo.create({
                title: "hello",
                content: "world1",
            });
            await service.savePost(post1, testUser);
            const result = await service.findAll();
            expect(result.length).toEqual(1);
            await service.deletePost(post1.id);
            const result2 = await service.findAll();
            expect(result2.length).toEqual(0);
        });
    });
    describe('게시물 수정 테스트', () => {
        it('should change content in post', async () => {
            const post1 = postRepo.create({
                title: "hello",
                content: "world1",
            });
            await service.savePost(post1, testUser);
            post1.content = "world2";
            const result = await service.updatePost(post1.id, post1);
            expect(result.content).toEqual("world2");
        });
        it('should change content in post with other object', async () => {
            const post = postRepo.create({
                title: "hello",
                content: "world1",
            });
            await service.savePost(post, testUser);
            const post2 = postRepo.create({
                title: "hello",
                content: "walz",
            });
            const result = await service.updatePost(post.id, post2);
            expect(result.content).toEqual("walz");
        });
    });
});
//# sourceMappingURL=post.service.spec.js.map
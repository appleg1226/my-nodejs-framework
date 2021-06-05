"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
class PostService {
    async savePost(post, user) {
        const repo = typeorm_1.getRepository(post_entity_1.Post);
        post.user = user;
        return await repo.save(post);
    }
    async findById(id) {
        const repo = typeorm_1.getRepository(post_entity_1.Post);
        return await repo.findOne(id);
    }
    async findAll() {
        const repo = typeorm_1.getRepository(post_entity_1.Post);
        return await repo.find();
    }
    async deletePost(id) {
        const repo = typeorm_1.getRepository(post_entity_1.Post);
        return await repo.delete(id);
    }
    async updatePost(id, post) {
        const repo = typeorm_1.getRepository(post_entity_1.Post);
        await repo.update(id, post);
        return await repo.findOne(id);
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map
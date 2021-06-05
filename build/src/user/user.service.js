"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
class UserService {
    constructor() {
        this.loggedIn = new Set();
    }
    async saveUser(user) {
        const repo = typeorm_1.getRepository(user_entity_1.User);
        return await repo.save(user);
    }
    async findUser(id) {
        const repo = typeorm_1.getRepository(user_entity_1.User);
        return await repo.findOne(id);
    }
    async changeNickname(user) {
        const repo = typeorm_1.getRepository(user_entity_1.User);
        await repo.update(user.id, { nickname: user.nickname });
        return await repo.findOne(user.id);
    }
    logIn(userId) {
        if (this.loggedIn.has(userId)) {
            return false;
        }
        this.loggedIn.add(userId);
        return true;
    }
    logOut(userId) {
        if (!this.loggedIn.has(userId)) {
            return false;
        }
        this.loggedIn.delete(userId);
        return true;
    }
    isLoggedIn(userId) {
        return this.loggedIn.has(userId);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
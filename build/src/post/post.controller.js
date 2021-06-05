"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const typeorm_1 = require("typeorm");
const autowired_decorator_1 = require("../decorator/autowired.decorator");
const body_decorator_1 = require("../decorator/body.decorator");
const controller_decorator_1 = require("../decorator/controller.decorator");
const delete_decorator_1 = require("../decorator/delete.decorator");
const get_decorator_1 = require("../decorator/get.decorator");
const param_decorator_1 = require("../decorator/param.decorator");
const post_decorator_1 = require("../decorator/post.decorator");
const put_decorator_1 = require("../decorator/put.decorator");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const post_entity_1 = require("./post.entity");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(postService, userService) {
        this.postService = postService;
        this.userService = userService;
    }
    async create(post, userId) {
        if (!this.userService.isLoggedIn(userId)) {
            throw new Error("not Logged in!");
        }
        const user = await typeorm_1.getRepository(user_entity_1.User).findOne(userId);
        await this.postService.savePost(post, user);
        return "Successfully Created!";
    }
    async getAll() {
        const posts = await this.postService.findAll();
        return posts.map(post => {
            return {
                id: post.id,
                title: post.title,
                content: post.content,
                createdDate: post.createdDate,
                updatedDate: post.updatedDate,
                userId: post.user.id
            };
        });
    }
    async getOne(postId) {
        const result = await this.postService.findById(postId);
        return {
            id: result.id,
            title: result.title,
            content: result.content,
            createdDate: result.createdDate,
            updatedDate: result.updatedDate,
            userId: result.user.id
        };
    }
    async remove(postId) {
        const foundPost = await this.postService.findById(postId);
        if (!this.userService.isLoggedIn(foundPost === null || foundPost === void 0 ? void 0 : foundPost.user.id)) {
            throw new Error("not Logged in!");
        }
        await this.postService.deletePost(postId);
        return "Successfully Removed!";
    }
    async update(postId, post) {
        const foundPost = await this.postService.findById(postId);
        if (!this.userService.isLoggedIn(foundPost === null || foundPost === void 0 ? void 0 : foundPost.user.id)) {
            throw new Error("not Logged in!");
        }
        await this.postService.updatePost(postId, post);
        const result = await this.postService.findById(postId);
        return {
            id: result.id,
            title: result.title,
            content: result.content,
            createdDate: result.createdDate,
            updatedDate: result.updatedDate,
            userId: result.user.id
        };
    }
};
__decorate([
    post_decorator_1.Post(':id'),
    __param(0, body_decorator_1.Body()), __param(1, param_decorator_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.Post, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    get_decorator_1.Get(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAll", null);
__decorate([
    get_decorator_1.Get(':id'),
    __param(0, param_decorator_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getOne", null);
__decorate([
    delete_decorator_1.Delete(':id'),
    __param(0, param_decorator_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "remove", null);
__decorate([
    put_decorator_1.Put(':id'),
    __param(0, param_decorator_1.Param('id')), __param(1, body_decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, post_entity_1.Post]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
PostController = __decorate([
    controller_decorator_1.Controller('posts'),
    __param(0, autowired_decorator_1.Autowired()),
    __param(1, autowired_decorator_1.Autowired()),
    __metadata("design:paramtypes", [post_service_1.PostService,
        user_service_1.UserService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map
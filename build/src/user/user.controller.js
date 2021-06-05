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
exports.UserController = void 0;
const body_decorator_1 = require("../decorator/body.decorator");
const controller_decorator_1 = require("../decorator/controller.decorator");
const post_decorator_1 = require("../decorator/post.decorator");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./user.entity");
const put_decorator_1 = require("../decorator/put.decorator");
const user_service_1 = require("./user.service");
const autowired_decorator_1 = require("../decorator/autowired.decorator");
const param_decorator_1 = require("../decorator/param.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(userInfo) {
        const hashedPassword = bcrypt.hashSync(userInfo.password, 12);
        await this.userService.saveUser({
            id: userInfo.id,
            nickname: userInfo.nickname,
            password: hashedPassword
        });
        return {
            message: "Register Success!",
            id: userInfo.id
        };
    }
    async login(userInfo) {
        const foundUser = await this.userService.findUser(userInfo.id);
        if (!foundUser) {
            throw new Error("User not Found!");
        }
        if (!await bcrypt.compare(userInfo.password, foundUser.password)) {
            throw new Error("Password not Correct!");
        }
        const result = this.userService.logIn(userInfo.id);
        if (!result) {
            throw new Error("You already Logged in!");
        }
        else {
            return {
                message: "Login Success!",
                id: userInfo.id
            };
        }
    }
    logout(userId) {
        const result = this.userService.logOut(userId);
        if (!result) {
            throw new Error("You didn't Login!");
        }
        else {
            return "Logout Success!";
        }
    }
    async changeNickname(userInfo) {
        if (!this.userService.isLoggedIn(userInfo.id)) {
            throw new Error("not Logged in!");
        }
        const foundUser = await this.userService.findUser(userInfo.id);
        if (!foundUser) {
            throw new Error("User not Found!");
        }
        const result = await this.userService.changeNickname(userInfo);
        return {
            message: "Nickname Changed!",
            id: userInfo.id,
            nickname: userInfo.nickname,
        };
    }
};
__decorate([
    post_decorator_1.Post('register'),
    __param(0, body_decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    post_decorator_1.Post('login'),
    __param(0, body_decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    post_decorator_1.Post('logout/:id'),
    __param(0, param_decorator_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
__decorate([
    put_decorator_1.Put('nickname'),
    __param(0, body_decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeNickname", null);
UserController = __decorate([
    controller_decorator_1.Controller('users'),
    __param(0, autowired_decorator_1.Autowired()),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
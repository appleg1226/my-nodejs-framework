import { User } from "./user.entity";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register(userInfo: User): Promise<{
        message: string;
        id: string;
    }>;
    login(userInfo: User): Promise<{
        message: string;
        id: string;
    }>;
    logout(userId: string): string;
    changeNickname(userInfo: User): Promise<{
        message: string;
        id: string;
        nickname: string;
    }>;
}

import { User } from "./user.entity";
export declare class UserService {
    private loggedIn;
    saveUser(user: User): Promise<User>;
    findUser(id: string): Promise<User | undefined>;
    changeNickname(user: User): Promise<User | undefined>;
    logIn(userId: string): boolean;
    logOut(userId: string): boolean;
    isLoggedIn(userId: string): boolean;
}

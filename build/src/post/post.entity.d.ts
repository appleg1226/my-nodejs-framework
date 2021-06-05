import { User } from "../user/user.entity";
export declare class Post {
    id: number;
    title: string;
    content: string;
    createdDate: Date;
    updatedDate: Date;
    user: User;
}

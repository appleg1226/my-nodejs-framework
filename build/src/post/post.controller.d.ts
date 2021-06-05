import { UserService } from "../user/user.service";
import { Post as Posts } from "./post.entity";
import { PostService } from "./post.service";
export declare class PostController {
    private postService;
    private userService;
    constructor(postService: PostService, userService: UserService);
    create(post: Posts, userId: string): Promise<string>;
    getAll(): Promise<{
        id: number;
        title: string;
        content: string;
        createdDate: Date;
        updatedDate: Date;
        userId: string;
    }[]>;
    getOne(postId: number): Promise<{
        id: number;
        title: string;
        content: string;
        createdDate: Date;
        updatedDate: Date;
        userId: string;
    }>;
    remove(postId: number): Promise<string>;
    update(postId: number, post: Posts): Promise<{
        id: number;
        title: string;
        content: string;
        createdDate: Date;
        updatedDate: Date;
        userId: string;
    }>;
}

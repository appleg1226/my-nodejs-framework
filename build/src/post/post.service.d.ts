import { User } from "../user/user.entity";
import { Post } from "./post.entity";
export declare class PostService {
    savePost(post: Post, user: User): Promise<Post>;
    findById(id: number): Promise<Post | undefined>;
    findAll(): Promise<Post[]>;
    deletePost(id: number): Promise<import("typeorm").DeleteResult>;
    updatePost(id: number, post: Post): Promise<Post | undefined>;
}

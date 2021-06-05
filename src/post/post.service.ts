import { getRepository, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Post } from "./post.entity";

export class PostService{

    async savePost(post: Post, user: User){
        const repo = getRepository(Post)
        post.user = user
        return await repo.save(post)
    }

    async findById(id: number){
        const repo = getRepository(Post)
        return await repo.findOne(id)
    }

    async findAll(){
        const repo = getRepository(Post)
        return await repo.find()
    }

    async deletePost(id: number){
        const repo = getRepository(Post)
        return await repo.delete(id)
    }

    async updatePost(id: number, post: Post){
        const repo = getRepository(Post)
        await repo.update(id, post)
        return await repo.findOne(id)
    }
}
import { getRepository } from "typeorm";
import { Autowired } from "../decorator/autowired.decorator";
import { Body } from "../decorator/body.decorator";
import { Controller } from "../decorator/controller.decorator";
import { Delete } from "../decorator/delete.decorator";
import { Get } from "../decorator/get.decorator";
import { Param } from "../decorator/param.decorator";
import { Post } from "../decorator/post.decorator";
import { Put } from "../decorator/put.decorator";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { Post as Posts } from "./post.entity";
import { PostService } from "./post.service";

@Controller('posts')
export class PostController{

    constructor(
        @Autowired() private postService: PostService,
        @Autowired() private userService: UserService
    ){}
    
    @Post(':id')
    async create(@Body() post: Posts, @Param('id') userId: string){
        if(!this.userService.isLoggedIn(userId)){
            throw new Error("not Logged in!")
        }

        const user = await getRepository(User).findOne(userId) as User
        await this.postService.savePost(post, user)
        return "Successfully Created!"
    }

    @Get('')
    async getAll(){
        const posts = await this.postService.findAll()
        return posts.map(post =>{
            return {
                id: post.id,
                title: post.title,
                content: post.content,
                createdDate: post.createdDate,
                updatedDate: post.updatedDate,
                userId: post.user.id
            }
        })
    }

    @Get(':id')
    async getOne(@Param('id') postId: number){
        const result = await this.postService.findById(postId) as Posts
        return {
            id: result.id,
            title: result.title,
            content: result.content,
            createdDate: result.createdDate,
            updatedDate: result.updatedDate,
            userId: result.user.id
        }
    }

    @Delete(':id')
    async remove(@Param('id') postId: number){
        const foundPost = await this.postService.findById(postId) as Posts
        if(!this.userService.isLoggedIn(foundPost?.user.id)){
            throw new Error("not Logged in!")
        }
        await this.postService.deletePost(postId)
        return "Successfully Removed!"
    }

    @Put(':id')
    async update(@Param('id') postId: number, @Body() post: Posts){
        const foundPost = await this.postService.findById(postId) as Posts
        if(!this.userService.isLoggedIn(foundPost?.user.id)){
            throw new Error("not Logged in!")
        }
        await this.postService.updatePost(postId, post)
        const result = await this.postService.findById(postId) as Posts
        return {
            id: result.id,
            title: result.title,
            content: result.content,
            createdDate: result.createdDate,
            updatedDate: result.updatedDate,
            userId: result.user.id
        }
    }
}
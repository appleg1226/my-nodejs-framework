import { Body } from "../decorator/body.decorator";
import { Controller } from "../decorator/controller.decorator";
import { Post } from "../decorator/post.decorator";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { Put } from "../decorator/put.decorator";
import { UserService } from "./user.service";
import { Autowired } from "../decorator/autowired.decorator";
import { Param } from "../decorator/param.decorator";
import { Get } from "../decorator/get.decorator";

@Controller('users')
export class UserController{

    constructor(
        @Autowired() private userService: UserService
    ){}

    @Post('register')
    async register(@Body() userInfo: User){
        const hashedPassword = bcrypt.hashSync(userInfo.password, 12)

        await this.userService.saveUser({
            id: userInfo.id,
            nickname: userInfo.nickname,
            password: hashedPassword
        })

        return {
            message: "Register Success!",
            id: userInfo.id
        }
    }

    @Post('login')
    async login(@Body() userInfo: User){
        
        const foundUser = await this.userService.findUser(userInfo.id)
        if(!foundUser){
            throw new Error("User not Found!")
        }

        if(!await bcrypt.compare(userInfo.password, foundUser.password)){
            throw new Error("Password not Correct!")
        }

        const result = this.userService.logIn(userInfo.id)
        if(!result){
            throw new Error("You already Logged in!")
        } else {
            return {
                message: "Login Success!",
                id: userInfo.id
            }
        }
    }

    @Post('logout/:id')
    logout(@Param('id') userId: string){
        const result = this.userService.logOut(userId)
        if(!result){
            throw new Error("You didn't Login!")
        } else {
            return "Logout Success!"
        }
    }

    @Put('nickname')
    async changeNickname(@Body() userInfo: User){
        if(!this.userService.isLoggedIn(userInfo.id)){
            throw new Error("not Logged in!")
        }

        const foundUser = await this.userService.findUser(userInfo.id)
        if(!foundUser){
            throw new Error("User not Found!")
        }

        const result = await this.userService.changeNickname(userInfo)
        return {
            message: "Nickname Changed!",
            id: userInfo.id,
            nickname: userInfo.nickname,
        }
    }

}
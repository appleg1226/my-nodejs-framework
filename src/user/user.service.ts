import { getRepository } from "typeorm"
import { User } from "./user.entity"

export class UserService{
    private loggedIn: Set<any> = new Set()

    async saveUser(user: User){
        const repo = getRepository(User)
        return await repo.save(user)
    }

    async findUser(id: string){
        const repo = getRepository(User)
        return await repo.findOne(id)
    }

    async changeNickname(user: User){
        const repo = getRepository(User)
        await repo.update(user.id, { nickname: user.nickname })
        return await repo.findOne(user.id)
    }

    logIn(userId: string): boolean{
        if(this.loggedIn.has(userId)){
            return false
        }
        this.loggedIn.add(userId)
        return true
    }

    logOut(userId: string): boolean{
        if(!this.loggedIn.has(userId)){
            return false
        }
        this.loggedIn.delete(userId)
        return true
    }

    isLoggedIn(userId: string): boolean{
        return this.loggedIn.has(userId)
    }
}
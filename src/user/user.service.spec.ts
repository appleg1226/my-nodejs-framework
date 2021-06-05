import { createConnection, getRepository, InsertResult, Repository } from 'typeorm';
import { Post } from '../post/post.entity';
import { getConnection, initializeDB } from '../db/db-connection';
import { User } from '../user/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService
  let postRepo: Repository<Post>
  let userRepo: Repository<User>
  
  beforeAll(async () => {
    await initializeDB({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dmschd92',
      database: 'board_test',
      entities: [User, Post],
      synchronize: true,
      dropSchema: true,
    })
    service = new UserService()
    postRepo = getRepository(Post)
    userRepo = getRepository(User)
  }); 

  afterEach(async () => {
    await userRepo.delete({})
  })

  describe('user CRUD Test', () =>{
    it('should create User', async () => {
      const user = userRepo.create({
        id: "kec1226",
        password: "1234",
        nickname: "dmschd"
      });
      await service.saveUser(user);
      
      const result: User[] = await userRepo.find()
      expect(result.length).toEqual(1);
    });

    it('should get a User', async () => {
      const user = userRepo.create({
        id: "kec1226",
        password: "1234",
        nickname: "dmschd"
      });
      await service.saveUser(user);

      const result = await service.findUser(user.id) as User
      expect(result.id).toEqual(user.id);
    });

    it('should change User\'s nickname', async () => {
      const user = userRepo.create({
        id: "kec1226",
        password: "1234",
        nickname: "dmschd"
      });
      await service.saveUser(user);

      user.nickname = "dmschd2"
      const result = await service.changeNickname(user) as User

      expect(result.nickname).toEqual('dmschd2');
    });
  });

  describe('login/out Test', () =>{
    it('shoud success login', () =>{
        const id = "kec1226"
        service.logIn(id)
        const loginResult = service.isLoggedIn(id)
        expect(loginResult).toEqual(true)
    })

    it('should success logout', () =>{
        const id = "kec1226"
        service.logOut(id)
        const loginResult = service.isLoggedIn(id)
        expect(loginResult).toEqual(false)
    })
  })

});

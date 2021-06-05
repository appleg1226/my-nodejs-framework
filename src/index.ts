import { MyFramework } from './core/my-framework';
import { PostController } from './post/post.controller';
import { Post } from './post/post.entity';
import { PostService } from './post/post.service';
import { initializeDB } from './db/db-connection';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';

const myApp = new MyFramework()
myApp.register([UserController, PostController], [UserService, PostService])
myApp.start(3000)

initializeDB({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'dmschd92',
    database: 'board',
    entities: [User, Post],
    synchronize: true,
    dropSchema: true,
})

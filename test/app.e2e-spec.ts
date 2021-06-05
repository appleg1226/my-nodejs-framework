import express = require('express');
import * as request from 'supertest';
import {MyFramework} from '../src/core/my-framework';
import {initializeDB} from '../src/db/db-connection';
import {PostController} from '../src/post/post.controller';
import {PostService} from '../src/post/post.service';
import {UserController} from '../src/user/user.controller';
import {User} from '../src/user/user.entity';
import {UserService} from '../src/user/user.service';
import {Post} from '../src/post/post.entity';

describe('Controller Test', () => {
  let app: express.Express;

  beforeAll(async () => {
    const myApp = new MyFramework();
    myApp.register(
      [UserController, PostController],
      [UserService, PostService]
    );
    myApp.start(3000);
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
    });
    app = myApp.getExpress();
  });

  describe('UserController Test', () => {
    it('should success register', () => {
      return request(app)
        .post('/users/register')
        .send({
          id: 'kec1226',
          password: 'aa1234',
          nickname: 'appleg',
        })
        .expect(res => {
          expect(res.body.message).toEqual('Register Success!')
        });
    });

    it('should success login', () => {
      return request(app)
        .post('/users/login')
        .send({
          id: 'kec1226',
          password: 'aa1234',
          nickname: 'appleg',
        })
        .expect(res => {
          expect(res.body.message).toEqual('Login Success!')
        });
    });

    it('should success change nickname', () => {
      return request(app)
        .put('/users/nickname')
        .send({
          id: 'kec1226',
          nickname: 'appleg2',
        })
        .expect(res => {
          expect(res.body.message).toEqual('Nickname Changed!')
        });
    });

    it('should success logout', () => {
      return request(app)
        .post('/users/logout/kec1226')
        .expect(res => {
          expect(res.text).toEqual('Logout Success!')
        });
    });
  });


  describe('PostController Test', () => {
    beforeAll(() => {
      return request(app).post('/users/login').send({
        id: 'kec1226',
        password: 'aa1234',
        nickname: 'appleg',
      });
    });

    it('should create Post', () => {
      return request(app)
        .post('/posts/kec1226')
        .send({
          title: 'hello',
          content: 'world',
        })
        .expect(200)
        .expect(res => {
          expect(res.text).toEqual('Successfully Created!')
        });
    });

    it('should get All post\'s length', () => {
      return request(app)
        .get('/posts')
        .expect(200)
        .expect(res => {
          expect(res.body.length).toEqual(1)
        });
    });

    it('should match post\'s title', () => {
      return request(app)
        .get('/posts/1')
        .expect(200)
        .expect(res => {
          expect(res.body.title).toEqual("hello")  
        })
    });

    it('should update post\'s content', () => {
      return request(app)
        .put('/posts/1')
        .send({
          title: 'hello',
          content: 'world222',
        })
        .expect(200)
        .expect(res => {
          expect(res.body.content).toEqual("world222") 
        });
    });

    it('should delete post', () => {
      return request(app)
        .delete('/posts/1')
        .expect(200)
        .expect(res => {
          expect(res.text).toEqual('Successfully Removed!')
        });
    });
  });
});

# My Nest.js 만들어 보기

## 기술 Spec
- Typescript
- express.js
- reflect-metadata
- Typeorm
- Mysql
- bcrypt
- jest
- supertest

## 구현 방식
### 1. 구현 개요
기존 Nest.js 방식을 참고하여 프레임워크를 개발하였다.
내부적으로는 Nest.js의 기본 설정과 같은 express.js를 이용하였다.
원래대로라면 다른 라이브러리도 사용 가능해야 하지만, 과제에서는 express.js만 대표로 적용하였다.

Nest.js와 비슷하게 나만의 프레임워크를 동작시키기 위한 클래스를 작성하였고, 
해당 클래스에서 내부적으로 http 요청 처리(express 등), DI 등을 처리하게 된다.  

구현은 Nest.js와 용어나 방식이 약간 다를 뿐, 큰 틀은 다르지 않다.
자바 스프링에서 사용하던 방식과 유사하하여 구조에 대한 이해는 어렵지 않았으나, 
JS만의 Decorator 문법을 배우고 적용하는 시간이 조금 걸렸다.

프레임워크의 가장 대표적인 기능은 다음과 같다.
```
- @Controller: 어노테이션이 달린 클래스에 있는 http 메서드들을 자동으로 등록하여 요청을 처리하도록 하는 기능
- @Autowired: constructor의 파라미터들에 해당 데코레이터를 달아주면 클래스가 싱글턴으로 생성되어 의존성이 자동으로 주입된다.
```

이를 이용하여 게시글 CRUD API의 개발과, 관련된 테스트 개발까지 진행하였다.

### 2. @Controller, @Get(외 3개), @Param, @Body 등의 Decorator를 통한 http Routing 
'reflect-metadata' 라이브러리를 이용하여 각 데코레이터가 붙은 대상들에 대하여 등록을 진행하였다.
각 데코레이터들과 관련 변수들을 분석하여 metadata에 모은 다음,
프레임워크가 초기화 될 때, 등록된 Controller를 대상으로 돌면서 express.js에 등록하는 식으로 진행했다. 
각 데코레이터들의 사용법은 nest.js와 동일하다.

### 3. @Autowired Decorator를 통한 클래스 DI
@Autowired 라는 데코레이터는 Spring에서 똑같은 기능으로 사용하기에 지어봤다.
주입되고자 하는 클래스의 생성자에 해당 데코레이터가 달려있는 클래스의 경우 프레임워크가 초기화 될 때, 인스턴스가 주입된다.
이번 과제에서는 DI가 Controller 클래스에만 적용되도록 개발하였다.

### 4. 간소화 시킨 회원관리 방식
이전에 제출했던 과제의 경우 nest.js의 guard와 passport.js, jwt 를 이용하여 인증을 구현했다.
그러나 이번 프로젝트는 게시판 CRUD가 중심이기에 해당 방식을 간소화하였다.
세션 인증 방식과 비슷하게 서버에서 로그인 현황을 체크하며,
특정 API들은 로그인 상태가 아니면 호출이 되도록 하지 않도록 하였다.

### 5. 기타
- ORM은 Typeorm을 이용하였으며 시간 관계상, 따로 프레임워크에 포함시키지 않고 코드에서 직접 이용하였다.
- Test는 nest.js의 방식과 동일하게 jest와 supertest를 이용하였다. 


## API 설명
### 1. 회원가입: `POST /users/register`
- request body  
  ```
  {
    id: string,
    password: string,
    nickname: string
  }
  ```
- response body
  ```
  {
    message: "Register Success!",
    id: string
  }
  ```

### 2. 로그인: `POST /users/login` 
- request body  
  ```
  {
    id: string,
    password: string
  }
  ```
- response body
  ```
  {
    message: "Login Success!",
    id: string
  }
  ```

### 3. 로그아웃(로그인 필요): `POST /users/logout/:id`
- parameter  
  ```
  id: user의 id
  ```
- response body
  ```
  "Logout Success!"
  ```

### 4. 닉네임 설정(로그인 필요): `PUT /users/nickname`
- request body  
  ```
  {
    id: string,
    nickname: string
  }
  ```
- response body
  ```
  {
    message: "Nickname Changed!",
    id: string,
    nickname: string,
  }
  ```

### 5. 게시판 글 작성(로그인 필요): `POST /posts/:id`
- parameter  
  ```
  id: user의 id
  ```
- request body  
  ```
  {
    title: string,
    content: string,
  }
  ```
- response body
  ```
  "Successfully Created!"
  ```

### 6. 게시판 글 리스트 조회: `GET /posts` 
- response body
  ```
  [
    {
      id: string
      title: string,
      content: string,
      createdDate: Date,
      updatedDate: Date,
      userId: string
    },
    ...  
  ]
  ```

### 7. 게시판 글 상세 조회: `GET /posts/:id` 
- parameter  
  ```
  id: 게시물의 id
  ```
- response body
  ```
  {
    id: string
    title: string,
    content: string,
    createdDate: Date,
    updatedDate: Date,
    userId: string
  }
  ```

### 8. 게시판 글 삭제(로그인 필요): `DELETE /posts/:id`
- parameter  
  ```
  id: 게시물의 id
  ```
- response body
  ```
  "Successfully Removed"
  ```

### 9. 게시판 글 수정(로그인 필요): `PUT /posts/:id`
- parameter  
  ```
  id: 게시물의 id
  ```
- request body  
  ```
  {
    title: string,
    content: string
  }
  ```
- response body
  ```
  {
    id: string
    title: string,
    content: string,
    createdDate: Date,
    updatedDate: Date,
    userId: string
  }
  ```

## 코드 실행 결과물
1. 직접 실행
   - index.ts의 설정에 db(mysql)을 셋팅
   - 아래의 명령어로 어플리케이션 실행
    ```
    npm install
    npm run start
    ```
2. 테스트 코드를 통해서 확인 가능: 
    ```
    npm run test
    npm run test:e2e
    ``` 
3. API tester를 이용하여 각 기능에 대한 API 호출 결과 캡처하여 저장(/capture 폴더 참조)  


## 프로젝트 회고  
처음에는 Nest.js를 사용해서 API 서버를 만들라는 과제여서 굉장히 쉽게 생각했다.
비록 js로 서버를 만들어 본 경험은 적지만, 그래도 따라하다보니 쉽게 진행할 수 있었다.

그러나 과제가 Nest.js를 이용해서가 아니라, Nest.js를 만들라는 과제였다는 사실을 알고 사실 좀 당황했다.
그러나 이전에 java에서도 프레임워크를 만들기 위한 reflection 기술을 좀 준비해 놓은 것이 있어서 그 때의 지식을 바탕으로 과제를 재시작했다.

클래스 구조를 설계하거나, 해당 클래스를 이용해서 어플리케이션을 동작시키는 구조를 생각해내는 데에는 크게 시간이 걸리지 않았다.
그러나 구체적인 js/ts의 문법들을 공부하고, 적용하는 것들에서 시간이 좀 걸렸다.
빠르게 과제를 완성시키다 보니, 아직 언어적 특징에 대해서 100% 이해하지 못한 것이 아쉽다.

특히 Decorator가 분명히 Java의 Annotation과 다른데 아예 방식이 다르다는 점이 좀 헷갈려서 시간을 많이 사용했다. 
이외에도 js가 동적언어다 보니, "어 이게 되네?" 라는 것이 많아서 정말 불안했다. 이후에 공부를 더 해야할 것 같다.

마지막으로, 좀 더 개선하고 싶거나 추가적으로 공부가 필요할 것 같은 것들을 목록으로 정리해 보았다.
- http 요청의 예외상황 처리 기능 추가. 현재는 단순히 400 에러만 반환하도록 개발해 놓았다. 더 자유롭게 처리할 수 있도록 해야 한다.
- 현재는 Controller 클래스에만 DI가 가능하지만, 이외의 클래스에서도 가능하도록 해야한다.
- DB 모듈(typeorm)의 추상화
- Security 관련된 Middleware의 개발 및 적용
- 프레임워크를 개발하면서 테스트코드를 만들 수가 없었는데, Decorator 같은 것은 어떻게 테스트를 해야하나 궁금하다. 
- js/ts 전체적인 코딩 컨벤션/동작에 대한 이해
- e2e test는 어떤 방식으로, 어떤 것을 작성해야 하는지에 대하여

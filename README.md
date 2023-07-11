# Authorization_Authentication_JWT_NodeJs_Express

## Project setup
Ensure that Node js and MongoDB installed in your system.
You can also install MongoDB compass and setup it.
- Clone the dev branch of this repo to your local directory.
- Open terminal to server/src directory.
- Install all the required dependencies using command:

  `npm install`
- Ensure that MongoDB is connection is on and run command:

  `npm run start`

This is a Node js Express Application in which:
- User can Signup new account or Signin with username and password.
- There are three roles(admin, moderator, user) according to which user will get access to protected resource.

### So the api that are provided in this app:
| Method | Urls | Actions |
| :----------- | :------------: | ------------: |
| POST | /api/auth/signup | signup new account |
| POST | /api/auth/signin | signin an account |
| GET | /api/test/all | retrieve public content |
| GET | /api/test/user | access User’s content |
| GET | /api/test/mod | access Moderator’s content |
| GET | /api/test/admin | access Admin’s content |

## Flow for signup and signin JWT Authentication
![image](https://github.com/Biswa-Dev/Authorization_Authentication_JWT_NodeJs_Express/assets/74866208/9f9e3272-59cf-4994-8af1-448e6ef6c3fb)

A valid JWT token must be added to x-access-token Header for each protect request that have protected resources.

## Technology used
- Express
- bcryptjs
- jsonwebtoken
- mongoose
- MongoDB

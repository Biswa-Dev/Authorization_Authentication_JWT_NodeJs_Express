# Authorization_Authentication_JWT_NodeJs_Express
Via Express routes, HTTP request that matches a route will be checked by CORS Middleware before coming to Security layer.

Security layer includes:

JWT Authentication Middleware: verify SignUp, verify token
Authorization Middleware: check User’s roles with record in database
An error message will be sent as HTTP response to Client when the middlewares throw any error, .

Controllers interact with MongoDB Database via Mongoose library and send HTTP response (token, user information, data based on roles…) to Client.

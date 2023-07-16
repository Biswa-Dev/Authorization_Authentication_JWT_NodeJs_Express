const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');

const app = express();

var corsOptions = {
    origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers', 
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use(authRouter);
app.use(userRouter);

app.get('/', (req, res) => {
    res.send("Welcome to JWT token based Authentication and Authorization.");
});

module.exports = app;
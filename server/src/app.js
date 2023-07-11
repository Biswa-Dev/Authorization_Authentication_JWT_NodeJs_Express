const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/auth.routes');

const app = express();

var corsOptions = {
    origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Welcome to JWT token based Authentication and Authorization.");
});

authRouter(app);
userRouter(app);

module.exports = app;
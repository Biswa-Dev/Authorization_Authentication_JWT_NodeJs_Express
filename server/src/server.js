const http = require('http');
const app = require('./app');
const { connectMogoDB } = require('./service/connectMongo');
const addRolesToDB = require('./service/addRolesToDB');
require('dotenv').config();

const PORT = process.env.PORT | 8000;

const server = http.createServer(app);

async function startServer() {
    await connectMogoDB();
    addRolesToDB();
    server.listen(PORT, () => {
        console.log(`Server started listening to ${PORT} port...`);
    });
}

startServer();
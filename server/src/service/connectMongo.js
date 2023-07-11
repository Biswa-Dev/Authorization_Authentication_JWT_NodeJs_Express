const mongoose = require('mongoose');
const dbConfig = require('../db.config');

const MONGO_URL = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully,');
});

mongoose.connection.on('error', (error) => {
    console.log("MongoDB connection failed!!!");
    console.log(error);
});

async function connectMogoDB() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

async function disconnectMongoDB() {
    await mongoose.disconnect();
}

module.exports = {
    connectMogoDB,
    disconnectMongoDB,
}
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: 'string',
    email: 'string',
    password: 'string',
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
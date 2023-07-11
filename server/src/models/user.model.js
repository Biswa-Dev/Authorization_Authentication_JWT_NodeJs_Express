const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
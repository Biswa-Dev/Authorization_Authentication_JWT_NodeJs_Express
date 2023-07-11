const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: 'string',
    }
});

module.exports = mongoose.model('Role', roleSchema);
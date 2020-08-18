const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    srcLang: {
        type: String,
        required: true
    },
    targetLang: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
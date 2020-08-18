const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    targetLang: {
        type: String,
        required: true
    },
    /* lessons: {
        type: [[[String]]],
        required: true
    }, */
    size: {
        type: Number,
        required: true
    },
    creationTime: {
        type: Date,
        required: true
    },
    unknownWords: {
        type: Number,
        required: true
    },
    yeziqs: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);
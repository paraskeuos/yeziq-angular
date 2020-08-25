const mongoose = require('mongoose');

const userWordsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetLang: {
        type: String,
        required: true
    },
    words: {
        type: [{
            _id: mongoose.Schema.Types.ObjectId,
            word: String,
            status: Number, // 0 - known, 1 - yeziq
            chosenTrans: String,
            possibleTrans: [String]
            /* userTrans: String */
        }],
        required: true
    }
});

module.exports = mongoose.model('UserWords', userWordsSchema);
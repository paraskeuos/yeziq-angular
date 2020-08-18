const mongoose = require('mongoose');

const lessonsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    lessons: {
        type: [[[String]]],
        required: true
    }
});

module.exports = mongoose.model('Lessons', lessonsSchema);
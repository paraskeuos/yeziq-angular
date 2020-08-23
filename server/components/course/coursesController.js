const mongoose = require('mongoose');
const Course = require('./courseModel');
const Lessons = require('./lessonsModel');
const pdfParse = require('pdf-parse');
const Epub = require('epub');

module.exports.getTextFromPdf = async (req, res, next) => {
    const fileData = req.files.file.data;

    try {
        pdfParse(fileData).then((data) => {
            res.status(201).json(data.text);
        }).catch(error => {
            res.status(201).json(null);
        });
    } catch (err) {
        next(err);
    }
};

module.exports.getTextFromEpub = async (req, res, next) => {
    const fileData = req.files.file.data;
    const epub = new Epub(fileData);

    try {
        epub.on('end', () => {
            const chapters = new Array(epub.flow.length);

            for (let i = 0; i < epub.flow.length; i++)
                epub.getChapter(epub.flow[i].id, (error, text) => {
                    if (error) {
                        res.status(201).json(null);
                    } else {
                        chapters[i] = text;

                        // Ako su sva poglavlja ucitana, ona se spajaju i ceo se tekst salje klijentu.
                        const chaptersRead = chapters.filter(s => s !== undefined).length;
                        if (chaptersRead === chapters.length) {
                            let completeText = '';

                            for (let j = 0; j < chapters.length; j++) {
                                if (epub.flow[j].title)
                                    completeText += '<p>' + epub.flow[j].title + '</p>';

                                completeText += chapters[j];
                            }

                            res.status(201).json(completeText);
                        }
                    }
                });
        });

        epub.er

        epub.parse();

    } catch (err) {
        next(err);
    }
};

module.exports.getCoursesByAuthor = async (req, res, next) => {
    const author = req.body.author;
    const targetLang = req.body.targetLang;
    try {
        const courses = await Course.find({ $and: [{ author: author }, { targetLang: targetLang }] }).sort({ creationTime: -1 }).exec();
        const coursesRes = [];

        for (let i = 0; i < courses.length; i++) {
            const lessonBatches = await Lessons.find({ courseId: courses[i]._id }).sort({ index: 1 }).exec();

            const entireCourse = {
                _id: courses[i]._id,
                name: courses[i].name,
                author: courses[i].author,
                targetLang: courses[i].targetLang,
                lessons: Array.prototype.concat.apply([], lessonBatches.map(batch => batch.lessons)),
                unknownWords: courses[i].unknownWords,
                yeziqs: courses[i].yeziqs
            };

            coursesRes.push(entireCourse);
        }

        res.status(200).json(coursesRes);
    } catch (err) {
        next(err);
    }
};

module.exports.addCourse = async (req, res, next) => {
    const lessons = req.body.lessons;
    const lessonBatchSize = 80;

    const courseObj = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        author: req.body.author,
        targetLang: req.body.targetLang,
        creationTime: new Date(),
        unknownWords: parseInt(req.body.unknownWords),
        yeziqs: parseInt(req.body.yeziqs)
    });

    const courseSize = Math.ceil(lessons.length / lessonBatchSize)
    try {
        const course = await courseObj.save();
        
        for (let i = 0; i < courseSize; i++) {

            const lessonsObj = new Lessons({
                _id: new mongoose.Types.ObjectId(),
                courseId: course._id,
                index: i,
                lessons: lessons.splice(0, lessonBatchSize)
            });
            await lessonsObj.save();
        }

        res.status(201).json({ message: 'saved', courseId: course._id });
    } catch (err) {
        next(err);
    }
};

module.exports.deleteCourse = async (req, res, next) => {
    try {
        await Lessons.deleteMany({ courseId: req.params.id }).exec();
        const course = await Course.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: `Course ${course._id} deleted.` })
    } catch (err) {
        next(err);
    }
};

// NECE BITI DEO API

module.exports.deleteCourses = async (req, res, next) => {
    try {
        const obj = await Course.deleteMany({}).exec();
        res.status(200).json({ message: `${obj} courses deleted. ` });
    } catch (err) {
        next(err);
    }
}; 
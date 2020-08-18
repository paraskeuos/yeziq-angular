const express = require('express');
const controller = require('./coursesController');
const router = express.Router();

router.post('/getCourses', controller.getCoursesByAuthor);
router.post('/', controller.addCourse);
router.post('/pdf', controller.getTextFromPdf);
router.post('/epub', controller.getTextFromEpub);
router.delete('/:id', controller.deleteCourse);

// NECE BITI DEO API
router.delete('/', controller.deleteCourses);

module.exports = router;
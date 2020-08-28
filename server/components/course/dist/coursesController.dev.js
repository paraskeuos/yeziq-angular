"use strict";

var mongoose = require('mongoose');

var Course = require('./courseModel');

var Lessons = require('./lessonsModel');

var pdfParse = require('pdf-parse');

var Epub = require('epub');

module.exports.getTextFromPdf = function _callee(req, res, next) {
  var fileData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fileData = req.files.file.data;

          try {
            pdfParse(fileData).then(function (data) {
              res.status(201).json(data.text);
            })["catch"](function (error) {
              res.status(201).json(null);
            });
          } catch (err) {
            next(err);
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.getTextFromEpub = function _callee2(req, res, next) {
  var fileData, epub;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          fileData = req.files.file.data;
          epub = new Epub(fileData);

          try {
            epub.on('end', function () {
              var chapters = new Array(epub.flow.length);

              var _loop = function _loop(i) {
                epub.getChapter(epub.flow[i].id, function (error, text) {
                  if (error) {
                    res.status(201).json(null);
                  } else {
                    chapters[i] = text; // Ako su sva poglavlja ucitana, ona se spajaju i ceo se tekst salje klijentu.

                    var chaptersRead = chapters.filter(function (s) {
                      return s !== undefined;
                    }).length;

                    if (chaptersRead === chapters.length) {
                      var completeText = '';

                      for (var j = 0; j < chapters.length; j++) {
                        if (epub.flow[j].title) completeText += '<p>' + epub.flow[j].title + '</p>';
                        completeText += chapters[j];
                      }

                      res.status(201).json(completeText);
                    }
                  }
                });
              };

              for (var i = 0; i < epub.flow.length; i++) {
                _loop(i);
              }
            });
            epub.er;
            epub.parse();
          } catch (err) {
            next(err);
          }

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.getCoursesByAuthor = function _callee3(req, res, next) {
  var author, targetLang, courses, coursesRes, i, lessonBatches, entireCourse;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          author = req.body.author;
          targetLang = req.body.targetLang;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Course.find({
            $and: [{
              author: author
            }, {
              targetLang: targetLang
            }]
          }).sort({
            creationTime: -1
          }).exec());

        case 5:
          courses = _context3.sent;
          coursesRes = [];
          i = 0;

        case 8:
          if (!(i < courses.length)) {
            _context3.next = 17;
            break;
          }

          _context3.next = 11;
          return regeneratorRuntime.awrap(Lessons.find({
            courseId: courses[i]._id
          }).sort({
            index: 1
          }).exec());

        case 11:
          lessonBatches = _context3.sent;
          entireCourse = {
            _id: courses[i]._id,
            name: courses[i].name,
            author: courses[i].author,
            targetLang: courses[i].targetLang,
            lessons: Array.prototype.concat.apply([], lessonBatches.map(function (batch) {
              return batch.lessons;
            })),
            unknownWords: courses[i].unknownWords,
            yeziqs: courses[i].yeziqs
          };
          coursesRes.push(entireCourse);

        case 14:
          i++;
          _context3.next = 8;
          break;

        case 17:
          res.status(200).json(coursesRes);
          _context3.next = 23;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](2);
          next(_context3.t0);

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 20]]);
};

module.exports.addCourse = function _callee4(req, res, next) {
  var lessons, lessonBatchSize, courseObj, courseSize, course, i, lessonsObj;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          lessons = req.body.lessons;
          lessonBatchSize = 80;
          courseObj = new Course({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            author: req.body.author,
            targetLang: req.body.targetLang,
            creationTime: new Date(),
            unknownWords: parseInt(req.body.unknownWords),
            yeziqs: parseInt(req.body.yeziqs)
          });
          courseSize = Math.ceil(lessons.length / lessonBatchSize);
          _context4.prev = 4;
          _context4.next = 7;
          return regeneratorRuntime.awrap(courseObj.save());

        case 7:
          course = _context4.sent;
          i = 0;

        case 9:
          if (!(i < courseSize)) {
            _context4.next = 16;
            break;
          }

          lessonsObj = new Lessons({
            _id: new mongoose.Types.ObjectId(),
            courseId: course._id,
            index: i,
            lessons: lessons.splice(0, lessonBatchSize)
          });
          _context4.next = 13;
          return regeneratorRuntime.awrap(lessonsObj.save());

        case 13:
          i++;
          _context4.next = 9;
          break;

        case 16:
          res.status(201).json({
            message: 'saved',
            courseId: course._id
          });
          _context4.next = 22;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](4);
          next(_context4.t0);

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[4, 19]]);
};

module.exports.deleteCourse = function _callee5(req, res, next) {
  var course;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Lessons.deleteMany({
            courseId: req.params.id
          }).exec());

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(Course.deleteOne({
            _id: req.params.id
          }).exec());

        case 5:
          course = _context5.sent;
          res.status(200).json({
            message: "Course ".concat(course._id, " deleted.")
          });
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // NECE BITI DEO API


module.exports.deleteCourses = function _callee6(req, res, next) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Course.deleteMany({}).exec());

        case 3:
          _context6.next = 5;
          return regeneratorRuntime.awrap(Lessons.deleteMany({}).exec());

        case 5:
          res.status(200).send();
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
"use strict";

var mongoose = require('mongoose');

var UserWords = require('./userWordsModel');

module.exports.getUserWordsByLang = function _callee(req, res, next) {
  var userId, lang, newWordsObj;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.body.id;
          lang = req.body.targetLang;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(UserWords.findOne({
            $and: [{
              user: userId
            }, {
              targetLang: lang
            }]
          }).exec());

        case 5:
          userWords = _context.sent;

          if (!userWords) {
            _context.next = 10;
            break;
          }

          res.status(201).json(userWords.words);
          _context.next = 15;
          break;

        case 10:
          newWordsObj = new UserWords({
            _id: new mongoose.Types.ObjectId(),
            user: userId,
            targetLang: lang,
            words: []
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(newWordsObj.save());

        case 13:
          newUserWords = _context.sent;
          res.status(201).json(newUserWords.words);

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          next(_context.t0);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 17]]);
};

module.exports.getKnownWordCount = function _callee2(req, res, next) {
  var userId, targetLang, count, _userWords;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.body.userId;
          targetLang = req.body.targetLang;
          _context2.prev = 2;
          count = 0;
          _context2.next = 6;
          return regeneratorRuntime.awrap(UserWords.findOne({
            $and: [{
              user: userId
            }, {
              targetLang: targetLang
            }]
          }, {
            _id: 0,
            user: 0,
            targetLang: 0
          }).exec());

        case 6:
          _userWords = _context2.sent;
          if (_userWords) count = _userWords.words.filter(function (word) {
            return word.status === 0;
          }).length;
          res.status(201).json(count);
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](2);
          next(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

module.exports.addYeziq = function _callee3(req, res, next) {
  var userId, lang, word, chosenTrans, possibleTrans, _userWords2, selected;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.body.id;
          lang = req.body.targetLang;
          word = req.body.word;
          chosenTrans = req.body.chosenTrans;
          possibleTrans = req.body.possibleTrans; //const userTrans = req.body.userTrans;

          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(UserWords.findOne({
            $and: [{
              user: userId
            }, {
              targetLang: lang
            }]
          }).exec());

        case 8:
          _userWords2 = _context3.sent;
          selected = _userWords2.words.filter(function (w) {
            return w.word === word;
          });

          if (selected.length) {
            selected[0].status = 1;
            selected[0].chosenTrans = chosenTrans;
            selected[0].possibleTrans = possibleTrans; //selected[0].userTrans = userTrans;
          } else _userWords2.words.push({
            word: word,
            status: 1,
            chosenTrans: chosenTrans,
            possibleTrans: possibleTrans //userTrans: userTrans

          });

          _context3.next = 13;
          return regeneratorRuntime.awrap(_userWords2.save());

        case 13:
          res.status(201).json({
            message: "".concat(word, " is now a Yeziq!")
          });
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](5);
          next(_context3.t0);

        case 19:
          ;

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 16]]);
};

module.exports.wordIsKnown = function _callee4(req, res, next) {
  var userId, lang, word, chosenTrans, possibleTrans, _userWords3, selected;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.body.id;
          lang = req.body.targetLang;
          word = req.body.word;
          chosenTrans = req.body.chosenTrans;
          possibleTrans = req.body.possibleTrans; //const userTrans = req.body.userTrans;

          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(UserWords.findOne({
            $and: [{
              user: userId
            }, {
              targetLang: lang
            }]
          }).exec());

        case 8:
          _userWords3 = _context4.sent;
          selected = _userWords3.words.filter(function (w) {
            return w.word === word;
          });

          if (selected.length) {
            selected[0].status = 0;
            selected[0].chosenTrans = chosenTrans;
            selected[0].possibleTrans = possibleTrans; //selected[0].userTrans = userTrans;
          } else _userWords3.words.push({
            word: word,
            status: 0,
            chosenTrans: chosenTrans,
            possibleTrans: possibleTrans //userTrans: userTrans

          });

          _context4.next = 13;
          return regeneratorRuntime.awrap(_userWords3.save());

        case 13:
          res.status(201).json({
            message: "".concat(word, " is now known!")
          });
          _context4.next = 19;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](5);
          next(_context4.t0);

        case 19:
          ;

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 16]]);
};

module.exports.manyWordsAreKnown = function _callee5(req, res, next) {
  var userId, lang, words, _userWords4;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.body.id;
          lang = req.body.targetLang;
          words = req.body.words;
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(UserWords.findOne({
            $and: [{
              user: userId
            }, {
              targetLang: lang
            }]
          }).exec());

        case 6:
          _userWords4 = _context5.sent;
          words.forEach(function (newWord) {
            var selected = _userWords4.words.filter(function (w) {
              return w.word === newWord.word;
            });

            if (selected.length) {
              selected[0].status = 0;
              selected[0].chosenTrans = newWord.chosenTrans;
              selected[0].possibleTrans = newWord.possibleTrans; //selected[0].userTrans = newWord.userTrans;
            } else _userWords4.words.push({
              word: newWord.word,
              status: 0,
              chosenTrans: newWord.chosenTrans,
              possibleTrans: newWord.possibleTrans //userTrans: newWord.userTrans

            });
          });
          _context5.next = 10;
          return regeneratorRuntime.awrap(_userWords4.save());

        case 10:
          res.status(201).json({
            message: "All words on page are now known!"
          });
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](3);
          next(_context5.t0);

        case 16:
          ;

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 13]]);
}; // NECE BITI DEO API


module.exports.getUserWords = function _callee6(req, res, next) {
  var all;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(UserWords.find({}).exec());

        case 3:
          all = _context6.sent;
          res.status(200).json(all);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports.deleteAllWords = function _callee7(req, res, next) {
  var num;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(UserWords.deleteMany({}).exec());

        case 3:
          num = _context7.sent;
          res.status(200).json({
            message: "Deleted ".concat(num, " userWords collections.")
          });
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
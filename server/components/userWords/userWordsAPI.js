const express = require('express');
const controller = require('./userWordsController');
const router = express.Router();

router.post('/', controller.getUserWordsByLang);
router.post('/count', controller.getKnownWordCount);
router.post('/knownOne', controller.wordIsKnown);
router.post('/knownMany', controller.manyWordsAreKnown);
router.post('/yeziq', controller.addYeziq);

// NECE BITI DEO API
router.get('/', controller.getUserWords);
router.delete('/', controller.deleteAllWords);

module.exports = router;
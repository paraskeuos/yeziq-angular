const express = require('express');
const controller = require('./usersController');
const router = express.Router();

router.post('/', controller.addUser);
router.post('/login', controller.getUserById);
router.patch('/changeLang', controller.changeTargetLang);

// NECE BITI DEO API
router.get('/all', controller.getUsers);
router.delete('/', controller.deleteUsers);

module.exports = router;
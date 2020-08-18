const mongoose = require('mongoose');

const User = require('./userModel');

module.exports.addUser = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({$or: [{ username: req.body.username }, { email: req.body.email }]}).exec();
        if(existingUser) {
            /* if(existingUser.username === req.body.username)
                res.status(201).json({ message: `User with username ${req.body.username} already exists.`});
            else
                res.status(201).json({ message: `User with email ${req.body.email} already exists.` }); */
            res.status(201).json(null);
        } else {
            const userObj = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                srcLang: req.body.srcLang,
                targetLang: req.body.targetLang
            });
            const user = await userObj.save();

            /* res.status(201).json({ message: `User with username ${user.username} successfully added!`}); */
            res.status(201).json(user);
        }
    } catch(err) {
        next(err);
    }
};

module.exports.getUserById = async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username }).exec();
        if(user && user.password === req.body.password)
            res.status(201).json(user);
         else
            res.status(201).json(null);
    } catch(err) {
        next(err);
    }
};

module.exports.changeTargetLang = async (req, res, next) => {
    const id = req.body.id;
    const newTargetLang = req.body.newTargetLang;

    try {
        const user = await User.findById(id).exec();
        user.targetLang = newTargetLang;
        
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch(err) {
        next(err);
    }
};

// POMOCNI METODI, NECE BITI DEO API-ja
module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).exec();
        if(users.length === 0)
            res.status(405).json({ message: 'No users!' });
        else
            res.status(200).json(users);
    } catch(err) {
        next(err);
    }
};

module.exports.deleteUsers = async (req, res, next) => {
    try {
        const obj = await User.deleteMany({}).exec();
        res.status(200).json({ message: `Deleted ${obj} users. `});
    } catch(err) {
        next(err);
    }
};
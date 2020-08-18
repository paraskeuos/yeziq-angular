const mongoose = require('mongoose');
const UserWords = require('./userWordsModel');

module.exports.getUserWordsByLang = async (req, res, next) => {
    const userId = req.body.id;
    const lang = req.body.targetLang;

    try {
        userWords = await UserWords.findOne({ $and: [{user: userId}, {targetLang: lang }]}).exec();
        
        if (userWords)
            res.status(201).json(userWords.words);
        else {
            const newWordsObj = new UserWords({
                _id: new mongoose.Types.ObjectId(),
                user: userId,
                targetLang: lang,
                words: []
            });
            newUserWords = await newWordsObj.save();

            res.status(201).json(newUserWords.words);
        }
    } catch (err) {
        next(err);
    }
};

module.exports.getKnownWordCount = async (req, res, next) => {
    const userId = req.body.userId;
    const targetLang = req.body.targetLang;

    try {
        let count = 0;
        const userWords = await UserWords.findOne({$and: [{ user: userId }, { targetLang: targetLang }]}, { _id: 0, user: 0, targetLang: 0 }).exec();
        
        if(userWords)
            count = userWords.words.filter(word => word.status === 0).length;
        
        res.status(201).json(count);
    } catch(err) {
        next(err);
    }
};

module.exports.addYeziq = async (req, res, next) => {
    const userId = req.body.id;
    const lang = req.body.targetLang;
    const word = req.body.word;
    const chosenTrans = req.body.chosenTrans;
    const possibleTrans = req.body.possibleTrans;
    const userTrans = req.body.userTrans;

    try {
        const userWords = await UserWords.findOne({ $and: [{user: userId}, {targetLang: lang}]}).exec();
        
        const selected = userWords.words.filter(w => w.word === word);
        if(selected.length) {
            selected[0].status = 1;
            selected[0].chosenTrans = chosenTrans;
            selected[0].possibleTrans = possibleTrans;
            selected[0].userTrans = userTrans;
        } else
            userWords.words.push({
                word: word,
                status: 1,
                chosenTrans: chosenTrans,
                possibleTrans: possibleTrans,
                userTrans: userTrans
            });

        await userWords.save();
        res.status(201).json({ message: `${word} is now a Yeziq!`});
    } catch(err) {
        next(err);
    };
};

module.exports.wordIsKnown = async (req, res, next) => {
    const userId = req.body.id;
    const lang = req.body.targetLang;
    const word = req.body.word;
    const chosenTrans = req.body.chosenTrans;
    const possibleTrans = req.body.possibleTrans;
    const userTrans = req.body.userTrans;
    
    try {
        const userWords = await UserWords.findOne({ $and: [{user: userId}, {targetLang: lang}]}).exec();
        
        const selected = userWords.words.filter(w => w.word === word);
        if(selected.length) {
            selected[0].status = 0;
            selected[0].chosenTrans = chosenTrans;
            selected[0].possibleTrans = possibleTrans;
            selected[0].userTrans = userTrans;
        } else
            userWords.words.push({
                word: word,
                status: 0,
                chosenTrans: chosenTrans,
                possibleTrans: possibleTrans,
                userTrans: userTrans
            });

        await userWords.save();
        res.status(201).json({ message: `${word} is now known!`});
    } catch(err) {
        next(err);
    };
};

module.exports.manyWordsAreKnown = async (req, res, next) => {
    const userId = req.body.id;
    const lang = req.body.targetLang;
    const words = req.body.words;

    try {
        const userWords = await UserWords.findOne({ $and: [{user: userId}, {targetLang: lang}]}).exec();
        
        words.forEach(newWord => {
            const selected = userWords.words.filter(w => w.word === newWord.word);
            
            if(selected.length) {
                selected[0].status = 0;
                selected[0].chosenTrans = newWord.chosenTrans;
                selected[0].possibleTrans = newWord.possibleTrans;
                selected[0].userTrans = newWord.userTrans;
            } else
                userWords.words.push({
                    word: newWord.word,
                    status: 0,
                    chosenTrans: newWord.chosenTrans,
                    possibleTrans: newWord.possibleTrans,
                    userTrans: newWord.userTrans
                });
        });

        await userWords.save();
        res.status(201).json({ message: `All words on page are now known!`});
    } catch(err) {
        next(err);
    };
};

// NECE BITI DEO API

module.exports.getUserWords = async (req, res, next) => {
    try {
        const all = await UserWords.find({}).exec();
        res.status(200).json(all);
    } catch(err) {
        next(err);
    }
};

module.exports.deleteAllWords = async (req, res, next) => {
    try {
        const num = await UserWords.deleteMany({}).exec();
        res.status(200).json({ message: `Deleted ${num} userWords collections.`});
    } catch(err) {
        next(err);
    }
}
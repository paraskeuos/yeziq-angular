const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const usersRoutes = require('./components/user/usersAPI');
const coursesRoutes = require('./components/course/coursesAPI');
const userWordsRouter = require('./components/userWords/userWordsAPI');

const app = express();

mongoose.connect('mongodb://localhost:27017/yeziqDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
/* app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
})); */
app.use(fileUpload());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'OPTIONS, GET, POST, PATCH, DELETE'
        );

        return res.status(200).json();
    }

    next();
});

app.use('/users', usersRoutes);
app.use('/courses', coursesRoutes);
app.use('/words', userWordsRouter);

app.use((req, res, next) => {
    const error = new Error('Zahtev nije podrzan od strane servera');
    error.status = 405;

    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        error: {
            message: error.message,
            status: statusCode,
            stack: error.stack
        }
    });
});

module.exports = app;
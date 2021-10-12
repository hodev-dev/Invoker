'use strict';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import path from 'path';
import web from './routes/web';
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'debug',
        cookie: { secure: false },
    }),
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cookieParser());

app.use('/', express.static(__dirname + '/static'));

app.use('/', web);

app.listen(3000, function () {
    console.log('Server running on port 3000');
});

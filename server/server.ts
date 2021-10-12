'use strict';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import web from './routes/web';
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cookieParser());

app.use(web);

app.use('/', express.static(__dirname + '/static'));

app.listen(3000, function () {
    console.log('Server running on port 3000');
});

export default app;

import UserController from '@controller/UserController';
import UserMiddleware from '@middleware/UserMiddleware';
import session from 'express-session';
import express from 'express';
var web = express.Router();

web.use(
    session({
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
        cookie: { path: '/', httpOnly: true, secure: false },
    }),
);

// web.use(function (req, res, next) { setTimeout(next, 1000) });

web.get('/', UserController().render.landing);
web.get('/home', UserMiddleware().home, UserController().render.home);
web.get('/login', UserMiddleware().login, UserController().render.login);
web.post('/login', UserMiddleware().login, UserController().post.login);
web.get('/logout', UserController().get.logout);

export default web;

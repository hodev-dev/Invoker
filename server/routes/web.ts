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
        cookie: { path: '/', httpOnly: true, secure: false, sameSite: 'strict' },
    }),
);

// web.use(function (req, res, next) { setTimeout(next, 1000) });

//post
web.post('/login', UserController().post.login);
//get
web.get('/logout', UserController().get.logout);
//render
web.get('/', UserController().render.landing);
web.get('/admin', UserMiddleware().adminProtection, UserController().render.admin);
web.get('/user', UserMiddleware().userProtection, UserController().render.user);

web.get('/login', UserMiddleware().loginProtection, UserController().render.login);

export default web;

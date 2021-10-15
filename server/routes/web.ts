import UserController from '@controller/UserController';
import UserMiddleware from '@middleware/UserMiddleware';
import session from 'express-session';
import express from 'express';
import StoreController from '@controller/StoreController';
var web = express.Router();

const sesseionConfig = session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: { path: '/', httpOnly: true, secure: false, sameSite: 'strict' },
});

web.use(sesseionConfig);

// web.use(function (req, res, next) { setTimeout(next, 1000) });

//post
web.post('/login', UserController().post.login);
web.post('/regester', UserController().post.regester);
//get
web.get('/logout', UserController().get.logout);
// render public
web.get('/', StoreController().render.landing);
web.get('/login', UserMiddleware().loginProtection, UserController().render.login);
web.get('/regester', UserMiddleware().loginProtection, UserController().render.regester);

//render user
web.get('/admin', UserMiddleware().adminProtection, UserController().render.admin);
// render admin
web.get('/user', UserMiddleware().userProtection, UserController().render.user);

export default web;

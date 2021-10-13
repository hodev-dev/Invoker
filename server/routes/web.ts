import UserController from '@controller/UserController';
import AuthMiddleware from '@middleware/AuthMiddleware';
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

//post
web.post('/login', UserController().post.login);
//get
web.get('/logout', UserController().get.logout);
//render
web.get('/', UserController().render.landing);
web.get('/dashboard', AuthMiddleware().dashboardRedirect, UserController().render.dashboard);

web.get('/login', AuthMiddleware().loginRedirect, UserController().render.login);

export default web;

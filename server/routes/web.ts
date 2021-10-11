import UserController from '@controller/UserController';
import UserMiddleware from '@middleware/UserMiddleware';
import express from 'express';
var web = express.Router();

// web.use(function (req, res, next) { setTimeout(next, 1000) });

web.get('/', UserController().render.landing);
web.get('/home', UserMiddleware().login, UserController().render.home);
web.get('/login', UserController().render.login);
web.post('/login', UserController().post.login);

export default web;

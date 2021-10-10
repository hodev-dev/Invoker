import AppController from '@controller/AppController';
import { mid1 } from '@middleware/web';
import express from 'express';
var web = express.Router();

// web.use(function (req, res, next) { setTimeout(next, 1000) });

web.get('/', AppController().home);
web.get('/login', AppController().login);

export default web;

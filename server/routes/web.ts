import AppController from '@controller/AppController';
import { mid1 } from '@middleware/web';
import express from 'express';
var web = express.Router();

web.get('/test', [mid1], AppController.test);

export default web;

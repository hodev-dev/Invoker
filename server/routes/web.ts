import AppController from "@controller/AppController";
import { mid1 } from "@middleware/web";
import express from "express";
var web = express.Router();
// web.use(function (req, res, next) { setTimeout(next, 1000) });
web.get("/login", [mid1], AppController().login);

export default web;

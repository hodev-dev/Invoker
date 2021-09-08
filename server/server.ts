'use strict';
import cookieParser from "cookie-parser";
import express from "express";
import session from 'express-session';
import web from "./routes/web";

var app = express();

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'debug',
  cookie: { secure: false }
}))

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser())

app.use('/', express.static('public'));

app.use('/', web);

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
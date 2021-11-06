import UserController from '@controller/UserController';
import UserMiddleware from '@middleware/UserMiddleware';
import session from 'express-session';
import express from 'express';
import StoreController from '@controller/StoreController';
import useDatabase from '@config/database';
import AdminController from '@controller/AdminController';
import AuthController from '@controller/AuthController';

const [pgc, pgp] = useDatabase();
var web = express.Router();

const sesseionConfig = session({
    secret: 'secret',
    store: new (require('connect-pg-simple')(session))({
        pool: pgp,
    }),
    saveUninitialized: false,
    resave: false,
    cookie: { path: '/', httpOnly: true, secure: false, sameSite: 'strict' },
});

web.use(sesseionConfig);

// web.use(function (req, res, next) { setTimeout(next, 1000) });

//post
web.post('/login', AuthController().post.login);
web.post('/regester', AuthController().post.regester);
//get
web.get('/logout', AuthController().get.logout);
// render public
web.get('/', StoreController().render.landing);
web.get('/login', UserMiddleware().loginProtection, AuthController().render.login);
web.get('/regester', UserMiddleware().loginProtection, AuthController().render.regester);

// admin
web.get('/admin', UserMiddleware().adminProtection, AdminController().render.admin);
web.get('/admin/manage_users', UserMiddleware().adminProtection, AdminController().render.manage_users);
web.get('/admin/payments', UserMiddleware().adminProtection, AdminController().render.payments);
web.get('/admin/manage_collections', UserMiddleware().adminProtection, AdminController().render.collections);
web.get('/admin/manage_gifts', UserMiddleware().adminProtection, AdminController().render.gifts);
web.get('/admin/manage_currencies', UserMiddleware().adminProtection, AdminController().render.currencies);
web.get('/admin/manage_account', UserMiddleware().adminProtection, AdminController().render.account);
web.post('/admin/delete_user/:id', UserMiddleware().adminProtection, AdminController().post.delete_user);
web.post('/admin/search_user/:query', UserMiddleware().adminProtection, AdminController().post.search_user);
web.get('/admin/get_users', UserMiddleware().adminProtection, AdminController().async.get_users);
web.get('/admin/get_collections', UserMiddleware().adminProtection, AdminController().async.get_collections);
web.post('/admin/add_collection', UserMiddleware().adminProtection, AdminController().post.add_collection);
web.post('/admin/delete_collection/:id', UserMiddleware().adminProtection, AdminController().post.delete_collection);
web.post('/admin/update_collection/:id', UserMiddleware().adminProtection, AdminController().post.update_collection);
web.get('/admin/get_gifts', UserMiddleware().adminProtection, AdminController().async.get_gifts);
web.post('/admin/delete_gift/:id', UserMiddleware().adminProtection, AdminController().post.delete_gift);
web.post('/admin/add_gift/', UserMiddleware().adminProtection, AdminController().post.add_collection);
web.post('/admin/assign_gift/', UserMiddleware().adminProtection, AdminController().post.assign_collection_gift);
web.post('/admin/add_currency/', UserMiddleware().adminProtection, AdminController().post.add_currency);
web.post('/admin/delete_currency/:id', UserMiddleware().adminProtection, AdminController().post.delete_currency);
web.post(
    '/admin/delete_gift_from_collection/:id',
    UserMiddleware().adminProtection,
    AdminController().post.delete_gift_from_collection,
);

// user
web.get('/user', UserMiddleware().userProtection, UserController().render.user);

export default web;

import UserController from "@controller/UserController";
import UserMiddleware from "@middleware/UserMiddleware";
import session from "express-session";
import express from "express";
import StoreController from "@controller/StoreController";
import Database from "@config/database";
import AdminController from "@controller/AdminController";
import AuthController from "@controller/AuthController";
import path from "path";

var FileStore = require("session-file-store")(session);

const [pgc, pgp] = Database();
var web = express.Router();

const sesseionConfig = session({
    secret: "secret",
    store: new FileStore({
        path: path.join(__dirname, "..", "storage", "sessions"),
    }),
    saveUninitialized: false,
    resave: false,
    cookie: { path: "/", httpOnly: true, secure: false, sameSite: "strict", maxAge: 30 * 24 * 60 * 60 * 1000 },
});

web.use(sesseionConfig);

// web.use(function (req, res, next) { setTimeout(next, 1000) });

//post
web.post("/login", AuthController().post.login);
web.post("/register", AuthController().post.register);
//get

web.get("/logout", AuthController().get.logout);
// render public

web.get("/", StoreController().render.landing);
web.get("/login", UserMiddleware().loginProtection, AuthController().render.login);
web.get("/register", UserMiddleware().loginProtection, AuthController().render.register);

// admin
web.get("/admin", UserMiddleware().adminProtection, AdminController().render.admin);
web.get("/admin/manage_users", UserMiddleware().adminProtection, AdminController().render.manage_users);
web.get("/admin/payments", UserMiddleware().adminProtection, AdminController().render.payments);
web.get("/admin/manage_collections", UserMiddleware().adminProtection, AdminController().render.collections);
web.get("/admin/manage_gifts", UserMiddleware().adminProtection, AdminController().render.gifts);
web.get("/admin/manage_currencies", UserMiddleware().adminProtection, AdminController().render.currencies);
web.get("/admin/manage_account", UserMiddleware().adminProtection, AdminController().render.account);
web.post("/admin/delete_user/:id", UserMiddleware().adminProtection, AdminController().post.delete_user);
web.post("/admin/search_user/:query", UserMiddleware().adminProtection, AdminController().post.search_user);
web.get("/admin/get_users", UserMiddleware().adminProtection, AdminController().async.get_users);
web.get("/admin/get_collections", UserMiddleware().adminProtection, AdminController().async.get_collections);
web.post("/admin/add_collection", UserMiddleware().adminProtection, AdminController().post.add_collection);
web.post("/admin/delete_collection/:id", UserMiddleware().adminProtection, AdminController().post.delete_collection);
web.post("/admin/update_collection/:id", UserMiddleware().adminProtection, AdminController().post.update_collection);
web.get("/admin/get_gifts", UserMiddleware().adminProtection, AdminController().async.get_gifts);
web.post("/admin/delete_gift/:id", UserMiddleware().adminProtection, AdminController().post.delete_gift);
web.post("/admin/add_gift/", UserMiddleware().adminProtection, AdminController().post.add_gift);
web.post("/admin/assign_gift/", UserMiddleware().adminProtection, AdminController().post.assign_collection_gift);
web.post("/admin/add_currency/", UserMiddleware().adminProtection, AdminController().post.add_currency);
web.post("/admin/delete_currency/:id", UserMiddleware().adminProtection, AdminController().post.delete_currency);
web.post(
    "/admin/delete_gift_from_collection/:id",
    UserMiddleware().adminProtection,
    AdminController().post.delete_gift_from_collection,
);

// auth
web.get("/totp", UserMiddleware().userProtection, UserMiddleware().totpProtectionIfNotExists, AuthController().render.totp);
web.post("/confirm_totp", UserMiddleware().userProtection, AuthController().post.confirm_totp);
web.get("/reset_password", AuthController().render.reset_password);
web.post("/send_totp_to_phone", AuthController().post.send_totp_to_phone);
web.get("/reset_password_totp", AuthController().render.reset_password_totp);
web.post("/confirm_reset_password_totp", AuthController().post.confirm_reset_password_totp);
web.get("/change_password/:totp", AuthController().render.change_password);
web.post("/update_password/", AuthController().post.update_password);

// user
web.get("/user", UserMiddleware().userProtection, UserMiddleware().totpProtection, UserController().render.user);
web.get("/user/support/", UserMiddleware().userProtection, UserMiddleware().totpProtection, UserController().render.support);

// test
web.get("/test", async (req, res) => {
});

export default web;

import { Login } from '@client/pages/public/Login';
import { Regester } from '@client/pages/public/Regester';
import { Render } from '@core/render';
import { User } from '@server/model/User';
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

const AuthController = () => {
    const get = {
        logout: async (request: Request | any, response: Response) => {
            request.session.destroy((error) => {
                if (error) {
                    return response.redirect('home');
                } else {
                    if (request.session !== undefined) {
                        request.session = undefined;
                    }
                    response.clearCookie('connect.sid');
                    return response.redirect('/');
                }
            });
        },
    };
    const post = {
        login: async (request: Request | any, response: Response) => {
            const { phone, password } = request.body;
            console.log(phone);
            const user = await User().findUserWithRolePermission(phone);
            if (user === undefined) {
                await Render.react(Login, response, {
                    messages: [
                        { type: "E", label: 'کاربری با این شماره موبایل یافت نشد' }
                    ],
                    body: request.body
                });
            }
            console.log(user);
            try {
                const varify = await bcrypt.compare(password, user.password);
                if (!varify) {
                    await Render.react(Login, response, {
                        messages: [
                            { type: "E", label: 'شماره موبایل یا رمز عبور اشتباه است' }
                        ],
                        body: request.body
                    });
                } else {
                    request.session.user = user;
                    if (user.roles.includes('admin')) {
                        return response.redirect('/admin');
                    } else {
                        return response.redirect('/user');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        regester: async (request: Request | any, response: Response) => {
            const { phone, password } = request.body;
            const hashed_password = await bcrypt.hash(password, 2);
            try {
                const exists = await User().exists(phone);
                if (!exists) {
                    try {
                        const insert = await User().insertUserAndAssignRole(phone, hashed_password, 2);
                        await Render.react(Login, response, {
                            messages: [
                                { type: 'S', label: 'ثبت نام موفق' }
                            ],
                            body: request.body
                        });
                    } catch {
                        await Render.react(Regester, response, {
                            messages: [
                                { type: 'E', label: 'خطایی پیش امد بعدا امتحان کنید' }
                            ],
                            body: request.body
                        });
                    }
                } else {
                    return await Render.react(Regester, response, {
                        messages: [
                            { type: 'E', label: 'کاربری قبلا  با این شماره موبایل ثبت نام کرده است' }
                        ],
                        body: request.body
                    });
                }
            } catch (error) {
                await Render.react(Regester, response, {
                    messages: [
                        { type: 'E', label: 'خطایی پیش امد بعدا امتحان کنید' }
                    ],
                    body: request.body
                });
            }
        }
    };
    const render = {
        login: async (request: Request, response: Response) => {
            await Render.react(Login, response, []);
        },
        regester: async (request: Request, response: Response) => {
            await Render.react(Regester, response, []);
        },
    };
    return { get, post, render };
};

export default AuthController;

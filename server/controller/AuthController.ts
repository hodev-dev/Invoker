import { Login } from '@client/pages/public/Login';
import { Regester } from '@client/pages/public/Regester';
import { Render } from '@core/render';
import { User } from '@server/model/User';
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

const AuthController: IAuthController = () => {
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
            if(user === undefined){
                await Render.react(Login, response, {messages: [
                    {type: "E",label: 'کاربری با این شماره موبایل یافت نشد'}
                ],
                body: request.body
            });
            }
            console.log(user);
            try {
                const varify = await bcrypt.compare(password, user.password);
                if (!varify) {
                    await Render.react(Login, response, {messages: [
                        {type: "E",label: 'شماره موبایل یا رمز عبور اشتباه است'}
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
            const { username, email, password } = request.body;
            const hashed_password = await bcrypt.hash(password, 2);
            try {
                const insert = await User().insertUserAndAssignRole(username, email, hashed_password, 2);
                if (insert) {
                    return response.redirect('/login');
                } else {
                    return response.redirect('/regester');
                }
            } catch (error) {
                return response.redirect('/regester');
            }
        },
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

interface IAuthController {
    (): {
        get: {
            logout: (Request, Response) => void;
        };
        post: {
            login: (Request, Response) => void;
            regester: (Request, Response) => void;
        };
        render: {
            login: (Request, Response) => void;
            regester: (Request, Response) => void;
        };
    };
}

export default AuthController;

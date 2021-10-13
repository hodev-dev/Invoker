import { UserView } from '@client/UserView';
import { Landing } from '@client/Landing';
import { Login } from '@client/Login';
import { Render } from '@core/render';
import { User } from '@server/model/User';
import { Request, Response } from 'express';
import { Admin } from '@client/Admin';

const UserController: IUserController = () => {
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
            const { email, password } = request.body;
            const user = await User().findUserWithRolePermission(email, password);
            if (!user || user === undefined) {
                return response.redirect('/login');
            } else {
                request.session.user = user;
                if (user.roles.includes('admin')) {
                    return response.redirect('/admin');
                } else {
                    return response.redirect('/user');
                }
            }
        },
    };

    const render = {
        landing: async (request: Request, response: Response) => {
            await Render.react(Landing, response, []);
        },
        admin: async (request: Request | any, response: Response) => {
            await Render.react(Admin, response, []);
        },
        user: async (request: Request | any, response: Response) => {
            await Render.react(UserView, response, []);
        },
        login: async (request: Request, response: Response) => {
            await Render.react(Login, response, []);
        },
    };

    return {
        get,
        post,
        render,
    };
};

interface IUserController {
    (): {
        get: {
            logout: (Request, Response) => void;
        };
        post: {
            login: (Request, Response) => void;
        };
        render: {
            landing: (Request, Response) => void;
            admin: (Request, Response) => void;
            user: (Request, Response) => void;
            login: (Request, Response) => void;
        };
    };
}

export default UserController;

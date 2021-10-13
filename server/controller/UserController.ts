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
            const user = await User().findUserWithRolePermission(
                email,
                password,
            );
            if (!user || user === undefined) {
                return response.redirect('/login');
            } else {
                request.session.user = user;
                return response.redirect('/dashboard');
            }
        },
    };

    const render = {
        landing: async (request: Request, response: Response) => {
            await Render.react(Landing, response, []);
        },
        dashboard: async (request: Request | any, response: Response) => {
            const { user } = request.session;
            if (user.roles.includes('admin')) {
                await Render.react(Admin, response, []);
            } else {
                await Render.react(UserView, response, []);
            }
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
            dashboard: (Request, Response) => void;
            login: (Request, Response) => void;
        };
    };
}

export default UserController;

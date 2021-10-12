import { Home } from '@client/Home';
import { Landing } from '@client/Landing';
import { Login } from '@client/Login';
import { Render } from '@core/render';
import { User } from '@server/model/User';
import { Request, Response } from 'express';

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
            const user = await User().findUserByEmailPassword(email, password);
            if (!user || user === undefined) {
                return response.redirect('/');
            } else {
                console.log(user);
                request.session.user = user;
                return response.redirect('home');
            }
        },
    };

    const render = {
        landing: async (request: Request, response: Response) => {
            await Render.react(Landing, response, []);
        },
        home: async (request: Request, response: Response) => {
            await Render.react(Home, response, []);
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
            home: (Request, Response) => void;
            login: (Request, Response) => void;
        };
    };
}

export default UserController;

import { Home } from '@client/Home';
import { Landing } from '@client/Landing';
import { Login } from '@client/Login';
import { Render } from '@core/render';
import { Request, Response } from 'express';

const UserController: IUserController = () => {
    const get = {};

    const post = {
        login: (request: Request, response: Response) => {
            response.redirect('/');
        },
    };

    const render = {
        landing: (request: Request, response: Response) => {
            Render.react(Landing, response, []);
        },
        home: (request: Request, response: Response) => {
            Render.react(Home, response, []);
        },
        login: (request: Request, response: Response) => {
            Render.react(Login, response, []);
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
        get: {};
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

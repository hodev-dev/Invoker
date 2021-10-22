import { UserDashboardView } from '@client/pages/user/UserDashboardView';
import { Render } from '@core/render';
import { User } from '@server/model/User';
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

const UserController: IUserController = () => {
    const get = {};

    const post = {};

    const render = {
        user: async (request: Request | any, response: Response) => {
            await Render.react(UserDashboardView, response, []);
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
        post: {};
        render: {
            user: (Request, Response) => void;
        };
    };
}

export default UserController;

import { UserDashboardView } from '@client/pages/user/UserDashboardView';
import { Render } from '@core/render';
import { Request, Response } from 'express';
import { UserSupportView } from '@client/pages/user/UserSupportView';

const bcrypt = require('bcrypt');
const moment = require('moment');

const UserController = () => {
    const get = {};

    const post = {};

    const render = {
        user: async (request: Request | any, response: Response) => {
            await Render.react(UserDashboardView, response, []);
        },
        support: async (request: Request | any, response: Response) => {
            const tickets =
                await Render.react(UserSupportView, response, []);
        },
    };

    return {
        get,
        post,
        render,
    };
};


export default UserController;

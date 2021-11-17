import { TOTP } from '@client/pages/user/TOTP';
import { UserDashboardView } from '@client/pages/user/UserDashboardView';
import { Render } from '@core/render';
import { User } from '@server/model/User';
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

const UserController = () => {
    const get = {};

    const post = {};

    const render = {
        user: async (request: Request | any, response: Response) => {
            await Render.react(UserDashboardView, response, []);
        },
        totp: async (request: Request | any, response: Response) => {
            await Render.react(TOTP, response, []);
        },
    };

    return {
        get,
        post,
        render,
    };
};



export default UserController;

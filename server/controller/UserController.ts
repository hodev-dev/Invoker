import { TOTP } from '@client/pages/user/TOTP';
import { UserDashboardView } from '@client/pages/user/UserDashboardView';
import { Render } from '@core/render';
import { User } from '@server/model/User';
import axios from 'axios';
import { Request, Response } from 'express';
import session from 'express-session';
const bcrypt = require('bcrypt');
const moment = require('moment');

const UserController = () => {
    const get = {};

    const post = {

    };

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



export default UserController;

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

    const post = {};

    const render = {
        user: async (request: Request | any, response: Response) => {
            await Render.react(UserDashboardView, response, []);
        },
        totp: async (request: Request | any, response: Response) => {
            if (moment() > moment(request.session.totpStartTimeout).add(30, 'seconds') || request.session.totpStartTimeout === undefined || request.session.totpEndTimeout === undefined) {
                request.session.totpStartTimeout = moment();
                request.session.totpEndTimeout = moment().add(30, 'seconds');
                request.session.totp = Math.floor(100000 + Math.random() * 900000);
            }
            try {
                // const token: any = await axios.post('https://RestfulSms.com/api/Token', {
                //     "SecretKey": "Hosein@server1AAA",
                //     "UserApiKey": "154b6869cf51630ee356869",
                // }, {
                //     headers: {
                //         "Content-Type": "application/json",
                //     }
                // });
                // const { TokenKey, IsSuccessful } = token.data;
                // if (IsSuccessful) {
                //     try {
                //         
                //         const result = await axios.post('https://RestfulSms.com/api/VerificationCode', {
                //             "Code": request.session.totp,
                //             "MobileNumber": '09395850082'
                //         }, {
                //             headers: {
                //                 "Content-Type": "application/json",
                //                 'x-sms-ir-secure-token': TokenKey
                //             }
                //         });
                //     } catch (error) {
                //         console.log(error);
                //     }
                // }
            } catch (error) {
                console.log(error);
            }
            finally {

                await Render.react(TOTP, response, { totpEndTimeout: request.session.totpEndTimeout });
            }
        },
    };

    return {
        get,
        post,
        render,
    };
};



export default UserController;

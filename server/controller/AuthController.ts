import { ChangePasswordView } from '@client/pages/public/ChangePasswordView';
import { Login } from '@client/pages/public/Login';
import { Regester } from '@client/pages/public/Regester';
import { ResetPasswordTOTPView } from '@client/pages/public/ResetPasswordTOTPView';
import { ResetPasswordView } from '@client/pages/public/ResetPasswordView';
import { TOTP } from '@client/pages/user/TOTP';
import { Render } from '@core/render';
import { User } from '@server/model/User';
import axios from 'axios';
import { Request, Response } from 'express';
import moment from 'moment';
import { resolveTypeReferenceDirective } from 'typescript';
const bcrypt = require('bcrypt');

const AuthController = () => {
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
            const user = await User().findUserWithRolePermission(phone);
            if (user === undefined) {
                await Render.react(Login, response, {
                    messages: [
                        { type: "E", label: 'کاربری با این شماره موبایل یافت نشد' }
                    ],
                    body: request.body
                });
            }
            try {
                const varify = await bcrypt.compare(password, user.password);
                if (!varify) {
                    await Render.react(Login, response, {
                        messages: [
                            { type: "E", label: 'شماره موبایل یا رمز عبور اشتباه است' }
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
            const { phone, password } = request.body;
            const hashed_password = await bcrypt.hash(password, 2);
            try {
                const exists = await User().exists(phone);
                if (!exists) {
                    try {
                        const insert = await User().insertUserAndAssignRole(phone, hashed_password, 2);
                        await Render.react(Login, response, {
                            messages: [
                                { type: 'S', label: 'ثبت نام موفق' }
                            ],
                            body: request.body
                        });
                    } catch {
                        await Render.react(Regester, response, {
                            messages: [
                                { type: 'E', label: 'خطایی پیش امد بعدا امتحان کنید' }
                            ],
                            body: request.body
                        });
                    }
                } else {
                    return await Render.react(Regester, response, {
                        messages: [
                            { type: 'E', label: 'کاربری قبلا  با این شماره موبایل ثبت نام کرده است' }
                        ],
                        body: request.body
                    });
                }
            } catch (error) {
                await Render.react(Regester, response, {
                    messages: [
                        { type: 'E', label: 'خطایی پیش امد بعدا امتحان کنید' }
                    ],
                    body: request.body
                });
            }
        },
        confirm_totp: async (request: Request | any, response: Response) => {
            const { user } = request.session;
            const { totp } = request.body;
            const totp_store = request.session.totp;
            console.log(totp_store);
            console.log(totp);
            if (Number(totp) === Number(totp_store)) {
                try {
                    const active = await User().confirm(user.id);
                    request.session.user.confirmed = true;
                    return response.redirect('/user');
                } catch (error) {
                    console.log(error);
                }
            } else {
                await Render.react(TOTP, response, { totpEndTimeout: request.session.totpEndTimeout });
            }
        },
        send_totp_to_phone: async (request: Request | any, response: Response) => {
            const { phone } = request.body;
            const user = await User().findUserWithRolePermission(phone);
            request.session.phone = phone;
            if (user) {
                return response.redirect('/reset_password_totp');
            } {
                return response.redirect('back');
            }
        },
        confirm_reset_password_totp: async (request: Request | any, response: Response) => {
            const { totp } = request.body;
            return response.redirect('/change_password/' + totp);
        },
        update_password: async (request: Request | any, response: Response) => {
            const { password, rpassword, totp } = request.body;
            const totp_store = request.session.totp;
            if (Number(totp) === Number(totp_store)) {
                const hashed_password = await bcrypt.hash(password, 2);
                const update = await User().update_password(request.session.phone, hashed_password);
                if (update) {
                    return response.redirect('/login');
                } else {
                    return response.redirect('/');
                }
            } else {
                return response.redirect('back');
            }
        },
    };

    const render = {
        login: async (request: Request, response: Response) => {
            await Render.react(Login, response, []);
        },
        totp: async (request: Request | any, response: Response) => {
            if (moment() > moment(request.session.totpStartTimeout).add(300, 'seconds') || request.session.totpStartTimeout === undefined || request.session.totpEndTimeout === undefined) {
                request.session.totpStartTimeout = moment();
                request.session.totpEndTimeout = moment().add(300, 'seconds');
                request.session.totp = Math.floor(100000 + Math.random() * 900000);
                try {
                    const token: any = await axios.post('https://RestfulSms.com/api/Token', {
                        "SecretKey": "Hosein@server1AAA",
                        "UserApiKey": "154b6869cf51630ee356869",
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    const { TokenKey, IsSuccessful } = token.data;
                    if (IsSuccessful) {
                        try {

                            const result = await axios.post('https://RestfulSms.com/api/VerificationCode', {
                                "Code": request.session.totp,
                                "MobileNumber": '09395850082'
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    'x-sms-ir-secure-token': TokenKey
                                }
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                finally {
                    await Render.react(TOTP, response, { totpEndTimeout: request.session.totpEndTimeout });
                }
            } else {
                await Render.react(TOTP, response, { totpEndTimeout: request.session.totpEndTimeout });
            }
        },
        regester: async (request: Request, response: Response) => {
            await Render.react(Regester, response, []);
        },
        reset_password: async (request: Request, response: Response) => {
            await Render.react(ResetPasswordView, response, []);
        },
        reset_password_totp: async (request: Request | any, response: Response) => {
            if (moment() > moment(request.session.totpStartTimeout).add(300, 'seconds') || request.session.totpStartTimeout === undefined || request.session.totpEndTimeout === undefined) {
                request.session.totpStartTimeout = moment();
                request.session.totpEndTimeout = moment().add(300, 'seconds');
                request.session.totp = Math.floor(100000 + Math.random() * 900000);
                try {
                    const token: any = await axios.post('https://RestfulSms.com/api/Token', {
                        "SecretKey": "Hosein@server1AAA",
                        "UserApiKey": "154b6869cf51630ee356869",
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    const { TokenKey, IsSuccessful } = token.data;
                    if (IsSuccessful) {
                        try {

                            const result = await axios.post('https://RestfulSms.com/api/VerificationCode', {
                                "Code": request.session.totp,
                                "MobileNumber": request.session.phone
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    'x-sms-ir-secure-token': TokenKey
                                }
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                finally {
                    await Render.react(ResetPasswordTOTPView, response, { totpEndTimeout: request.session.totpEndTimeout });
                }
            } else {
                await Render.react(ResetPasswordTOTPView, response, { totpEndTimeout: request.session.totpEndTimeout });
            }
        },
        change_password: async (request: Request | any, response: Response) => {
            const { totp } = request.params;
            const totp_store = request.session.totp;
            if (Number(totp) === Number(totp_store)) {
                await Render.react(ChangePasswordView, response, { totp });
            } else {
                return response.redirect('back');
            }
        },
    };
    return { get, post, render };
};

export default AuthController;

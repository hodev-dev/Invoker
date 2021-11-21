import { Response, Request } from 'express';

const UserMiddleware = () => {
    const loginProtection = (request: Request | any, response: Response, next: any) => {
        const { user } = request.session;
        if (user === undefined) {
            next();
        } else {
            if (user.roles.includes('admin')) {
                return response.redirect('/admin');
            } else {
                return response.redirect('/user');
            }
        }
    };

    const adminProtection = (request: Request | any, response: Response, next: any) => {
        const { user } = request.session;
        if (user === undefined) {
            return response.redirect('/login');
        } else {
            if (user.roles.includes('admin')) {
                next();
            } else {
                return response.redirect('/');
            }
        }
    };

    const userProtection = (request: Request | any, response: Response, next: any) => {
        const { user } = request.session;
        if (user === undefined) {
            return response.redirect('/login');
        } else {
            if (user.roles.includes('user')) {
                console.log('run user')
                next();
            } else {
                return response.redirect('/');
            }
        }
    };

    const totpProtection = (request: Request | any, response: Response, next: any) => {
        const { user } = request.session;
        if (user === undefined) {
            return response.redirect('/login');
        } else {
            if (user.confirmed) {
                next();
            } else {
                return response.redirect('/totp');
            }
        }
    };

    const totpProtectionIfNotExists = (request: Request | any, response: Response, next: any) => {
        const { user } = request.session;
        if (user === undefined) {
            return response.redirect('/login');
        } else {
            if (user.confirmed) {
                return response.redirect('/user');
            } else {
                next();
            }
        }
    };

    return {
        loginProtection,
        adminProtection,
        userProtection,
        totpProtection,
        totpProtectionIfNotExists
    };
};



export default UserMiddleware;

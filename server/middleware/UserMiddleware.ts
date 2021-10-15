import { Response, Request } from 'express';

const UserMiddleware: IUserMiddleware = () => {
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
                next();
            } else {
                return response.redirect('/');
            }
        }
    };

    return {
        loginProtection,
        adminProtection,
        userProtection,
    };
};

interface IUserMiddleware {
    (): {
        loginProtection: (Request, Response, any) => void;
        adminProtection: (Request, Response, any) => void;
        userProtection: (Request, Response, any) => void;
    };
}

export default UserMiddleware;

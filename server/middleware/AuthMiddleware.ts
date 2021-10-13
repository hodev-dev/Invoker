import { Response, Request } from 'express';

const AuthMiddleware: IAuthMiddleware = () => {
    const loginRedirect = (request: Request | any, response: Response, next: any) => {
        const { user } = request.session;
        if (user === undefined) {
            next();
        } else {
            return response.redirect('/dashboard');
        }
    };

    const dashboardRedirect = (request: Request | any, response: Response, next: any) => {
        const { user } = request.session;
        if (user === undefined) {
            return response.redirect('/login');
        } else {
            next();
        }
    };

    return {
        dashboardRedirect,
        loginRedirect,
    };
};

interface IAuthMiddleware {
    (): {
        dashboardRedirect: (Request, Response, any) => void;
        loginRedirect: (Request, Response, any) => void;
    };
}

export default AuthMiddleware;

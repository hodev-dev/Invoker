import { Response, Request } from 'express';

const UserMiddleware: IUserMiddleware = () => {
    const login = (request: Request | any, response: Response, next: any) => {
        if (request.session.user !== undefined) {
            console.log(request.session.user);
            response.redirect('/home');
        } else {
            next();
        }
    };

    const home = (request: Request | any, response: Response, next: any) => {
        if (request.session.user === undefined) {
            response.redirect('/login');
        } else {
            next();
        }
    };

    return {
        login,
        home,
    };
};

interface IUserMiddleware {
    (): {
        login: (Request, Response, any) => void;
        home: (Request, Response, any) => void;
    };
}

export default UserMiddleware;

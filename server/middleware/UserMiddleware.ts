const UserMiddleware: IUserMiddleware = () => {
    const login = (request: Request, response: Response, next: any) => {
        console.log('login middleware ');
        next();
    };

    return {
        login,
    };
};

interface IUserMiddleware {
    (): {
        login: (Request, Response, any) => void;
    };
}

export default UserMiddleware;

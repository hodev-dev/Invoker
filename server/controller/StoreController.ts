import { Landing } from '@client/Landing';
import { Render } from '@core/render';
import { Request, Response } from 'express';

const StorController: IStoreController = () => {
    const get = {};
    const post = {};
    const render = {
        landing: async (request: Request | any, response: Response) => {
            const { user } = request.session;
            const isLoggedIn = user ? { isLoggedIn: true } : { isLoggedIn: false };
            await Render.react(Landing, response, { ...isLoggedIn });
        },
    };
    return {
        get,
        post,
        render,
    };
};

interface IStoreController {
    (): {
        get: {};
        post: {};
        render: {
            landing: (Request, Response) => void;
        };
    };
}

export default StorController;

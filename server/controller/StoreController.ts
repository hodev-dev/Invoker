import { Landing } from '@client/pages/public/Landing';
import { Render } from '@core/render';
import { User } from '@server/model/User';
import { Request, Response } from 'express';

const StorController: IStoreController = () => {
    const get = {};
    const post = {};
    const render = {
        landing: async (request: Request | any, response: Response) => {
            const collectionsWithGifts = await User().getCollectionWithGifts();
            const { user } = request.session;
            const isLoggedIn = user ? { isLoggedIn: true } : { isLoggedIn: false };
            let isAdmin = false;
            if (user && user.roles) {
                isAdmin = user.roles.includes('admin');
            }
            await Render.react(Landing, response, { ...isLoggedIn, isAdmin, collectionsWithGifts });
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

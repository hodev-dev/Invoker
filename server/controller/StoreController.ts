import { Landing } from "@client/pages/public/Landing";
import { Render } from "@core/render";
import { User } from "@server/model/User";
import { Request, Response } from "express";
import useLogger from "@core/utility/useLogger";


const StoreController = () => {
    const Logger = useLogger();

    const get = {};
    const post = {};
    const render = {
        landing: async (request: Request | any, response: Response) => {
            try {
                const collectionsWithGifts = await User().getCollectionWithGifts();
                const { user } = request.session;
                const isLoggedIn = user ? { isLoggedIn: true } : { isLoggedIn: false };
                let isAdmin = false;
                if (user && user.roles) {
                    isAdmin = user.roles.includes("admin");
                }
                Logger.server(collectionsWithGifts);
                await Render.react(Landing, response, { ...isLoggedIn, isAdmin, collectionsWithGifts });
            } catch (error: any) {
                console.log({ error });
                return response.send("Error");
            }
        },
    };
    return {
        get,
        post,
        render,
    };
};

export default StoreController;

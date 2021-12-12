import { UserDashboardView } from "@client/pages/user/UserDashboardView";
import { Render } from "@core/render";
import { Request, Response } from "express";
import { UserSupportView } from "@client/pages/user/UserSupportView";
import { User } from "@server/model/User";
import useLogger from "@core/utility/useLogger";

const bcrypt = require("bcrypt");
const moment = require("moment");

const UserController = () => {
    const logger = useLogger();
    const get = {};

    const post = {};

    const render = {
        user: async (request: Request | any, response: Response) => {
            await Render.react(UserDashboardView, response, []);
        },
        support: async (request: Request | any, response: Response) => {
            const { page } = request.query;
            const { id } = request.session.user;
            let _page = (page === undefined) ? 1 : page;
            const _per_page = 10;
            _page = _page - 1;
            const offset = _page * _per_page;
            const tickets = await User().tickets(id, offset, _per_page);
            logger.server({ tickets });
            await Render.react(UserSupportView, response, { tickets, _page });
        },
    };

    return {
        get,
        post,
        render,
    };
};


export default UserController;

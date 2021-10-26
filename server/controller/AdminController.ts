import { AdminDashboardView } from '@client/pages/admin/AdminDashboardView';
import { AdminManageAccountView } from '@client/pages/admin/AdminManageAccountView';
import { AdminManageCollectionsView } from '@client/pages/admin/AdminManageCollectionsView';
import { AdminManageCurrenciesView } from '@client/pages/admin/AdminManageCurrenciesView';
import { AdminManageGiftsView } from '@client/pages/admin/AdminManageGiftsView';
import { AdminManageUsersView } from '@client/pages/admin/AdminManageUsersView';
import { AdminPaymentsView } from '@client/pages/admin/AdminPaymentsView';
import { Render } from '@core/render';
import Collection from '@server/model/Collection';
import Gift from '@server/model/Gift';
import { User } from '@server/model/User';
import { Request, Response } from 'express';

const AdminController: IAdminController = () => {
    const async = {
        list_users: async (request: Request | any, response: Response) => {
            const users = await User().listUserInRange(0, 10);
            return response.json(users);
        },
        get_collections: async (request: Request | any, response: Response) => {
            const collections = await Collection().getAllCollections();
            return response.json(collections);
        },
        get_gifts: async (request: Request | any, response: Response) => {
            const collections = await Gift().getAllGifts();
            return response.json(collections);
        },
    };
    const post = {
        delete_user: async (request: Request | any, response: Response) => {
            const { id } = request.params;
            return response.json(id);
        },
        delete_gift: async (request: Request | any, response: Response) => {
            const { id } = request.params;
            const deleted = await Gift().delete_gift(Number(id));
            return response.redirect('back');
        },
        add_gift: async (request: Request | any, response: Response) => {
            const { type, label, price } = request.body;
            const deleted = await Gift().add_gift(type, label, price);
            return response.redirect('back');
        },
        search_user: async (request: Request | any, response: Response) => {
            const { query } = request.params;
            const users = await User().searchUserByUsernameOrEmail(query);
            return response.json(users);
        },
    };
    const render = {
        admin: async (request: Request | any, response: Response) => {
            await Render.react(AdminDashboardView, response, []);
        },
        manage_users: async (request: Request | any, response: Response) => {
            await Render.react(AdminManageUsersView, response, []);
        },
        payments: async (request: Request | any, response: Response) => {
            await Render.react(AdminPaymentsView, response, []);
        },
        collections: async (request: Request | any, response: Response) => {
            await Render.react(AdminManageCollectionsView, response, []);
        },
        gifts: async (request: Request | any, response: Response) => {
            await Render.react(AdminManageGiftsView, response, []);
        },
        currencies: async (request: Request | any, response: Response) => {
            await Render.react(AdminManageCurrenciesView, response, []);
        },
        account: async (request: Request | any, response: Response) => {
            await Render.react(AdminManageAccountView, response, []);
        },
    };
    return { async, post, render };
};

interface IAdminController {
    (): {
        async: {
            list_users: (Request, Response) => void;
            get_collections: (Request, Response) => void;
            get_gifts: (Request, Response) => void;
        };
        post: {
            delete_user: (Request, Response) => void;
            delete_gift: (Request, Response) => void;
            add_gift: (Request, Response) => void;
            search_user: (Request, Response) => void;
        };
        render: {
            admin: (Request, Response) => void;
            manage_users: (Request, Response) => void;
            payments: (Request, Response) => void;
            collections: (Request, Response) => void;
            gifts: (Request, Response) => void;
            currencies: (Request, Response) => void;
            account: (Request, Response) => void;
        };
    };
}

export default AdminController;

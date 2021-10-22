import { AdminDashboardView } from '@client/pages/admin/AdminDashboardView';
import { AdminManageAccountView } from '@client/pages/admin/AdminManageAccountView';
import { AdminManageCollectionsView } from '@client/pages/admin/AdminManageCollectionsView';
import { AdminManageCurrenciesView } from '@client/pages/admin/AdminManageCurrenciesView';
import { AdminManageGiftsView } from '@client/pages/admin/AdminManageGiftsView';
import { AdminManageUsersView } from '@client/pages/admin/AdminManageUsersView';
import { AdminPaymentsView } from '@client/pages/admin/AdminPaymentsView';
import { Render } from '@core/render';
import { Request, Response } from 'express';

const AdminController: IAdminController = () => {
    const get = {};
    const post = {};
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
    return { get, post, render };
};

interface IAdminController {
    (): {
        get: {};
        post: {};
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

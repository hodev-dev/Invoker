import { AdminDashboardView } from "@client/pages/admin/AdminDashboardView";
import { AdminManageAccountView } from "@client/pages/admin/AdminManageAccountView";
import { AdminManageCollectionsView } from "@client/pages/admin/AdminManageCollectionsView";
import { AdminManageCurrenciesView } from "@client/pages/admin/AdminManageCurrenciesView";
import { AdminManageGiftsView } from "@client/pages/admin/AdminManageGiftsView";
import { AdminManageUsersView } from "@client/pages/admin/AdminManageUsersView";
import { AdminPaymentsView } from "@client/pages/admin/AdminPaymentsView";
import { Render } from "@core/render";
import Collection from "@server/model/Collection";
import Currency from "@server/model/Currency";
import Gift from "@server/model/Gift";
import { User } from "@server/model/User";
import { Request, Response } from "express";

const AdminController = () => {
    const async = {
        get_users: async (request: Request | any, response: Response) => {
            const users = await User().getAllAdminUsers();
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
            return Render.redirect("/admin/manage_gifts", response, {
                messages: [
                    {
                        type: "S",
                        label: "با موفقیت حذف شد",
                        body: "گیفت کارت با موفقیت حذف شد",
                    },
                ],
            });
        },
        add_gift: async (request: Request | any, response: Response) => {
            const { type, label, price } = request.body;
            const add = await Gift().add_gift(type, label, price);
            return Render.redirect("/admin/manage_gifts", response, {
                messages: [],
            });
        },
        add_collection: async (request: Request | any, response: Response) => {
            const { title, country } = request.body;
            const add = await Collection().addCollection(title, country);
            return response.redirect("back");
        },
        delete_collection: async (request: Request | any, response: Response) => {
            const { id } = request.params;
            const del = await Collection().deleteCollection(id);
            return response.redirect("back");
        },
        update_collection: async (request: Request | any, response: Response) => {
            const { id } = request.params;
            const { title, country } = request.body;
            const del = await Collection().updateCollection(id, title, country);
            return response.redirect("back");
        },
        assign_collection_gift: async (request: Request | any, response: Response) => {
            const { giftID, collectionID } = request.body;
            console.log(giftID, collectionID);
            const del = await Collection().assignGift(giftID, collectionID);
            return response.redirect("back");
        },
        search_user: async (request: Request | any, response: Response) => {
            const { query } = request.params;
            const users = await User().searchUserByUsernameOrEmail(query);
            return response.json(users);
        },
        add_currency: async (request: Request | any, response: Response) => {
            const { country, value } = request.body;
            const currency = await Currency().add_currency(country, value);
            return response.redirect("back");
        },
        delete_currency: async (request: Request | any, response: Response) => {
            const { id } = request.params;
            const currency = await Currency().delete_currency(id);
            return response.redirect("back");
        },
        delete_gift_from_collection: async (request: Request | any, response: Response) => {
            const { id } = request.params;
            const currency = await Collection().delete_gift(id);
            return response.redirect("back");
        },
    };
    const render = {
        admin: async (request: Request | any, response: Response) => {
            await Render.react(AdminDashboardView, response, []);
        },
        manage_users: async (request: Request | any, response: Response) => {
            const admins = await User().getAllAdminUsers();
            if (!admins) {
                await Render.react(AdminManageUsersView, response, {
                    admins: [],
                    messages: [{ type: "ERROR", label: "no admin has found" }],
                });
            }
            await Render.react(AdminManageUsersView, response, {
                admins,
                messages: [
                    { type: "E", label: "no admin has found" },
                    { type: "W", label: "no admin has found" },
                    { type: "S", label: "no admin has found" },
                ],
            });
        },
        payments: async (request: Request | any, response: Response) => {
            await Render.react(AdminPaymentsView, response, []);
        },
        collections: async (request: Request | any, response: Response) => {
            const collectionsWithGifts = await User().getCollectionWithGifts();
            const gifts = await Gift().getAllGifts();
            const collections = await Collection().getAllCollections();
            await Render.react(AdminManageCollectionsView, response, {
                collectionsWithGifts,
                gifts,
                collections,
            });
        },
        gifts: async (request: Request | any, response: Response) => {
            const gifts = await Gift().getAllGifts();
            const { messages } = request.query;
            await Render.react(AdminManageGiftsView, response, { gifts, messages });
        },
        currencies: async (request: Request | any, response: Response) => {
            const currencies = await Currency().get_all_currency();
            await Render.react(AdminManageCurrenciesView, response, { currencies });
        },
        account: async (request: Request | any, response: Response) => {
            await Render.react(AdminManageAccountView, response, []);
        },
    };
    return { async, post, render };
};

export default AdminController;

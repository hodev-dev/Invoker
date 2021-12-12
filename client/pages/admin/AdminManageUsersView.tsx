import { View } from "@core/View";
import { useState } from "react";
import { AdminDashboardTemplateView } from "./AdminDashboardTemplateView";

export const AdminManageUsersView = ({ admins, messages }) => {
    enum STATE {
        LOADING,
        IDLE,
        FAIL,
    }

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
    const [status, setStatus] = useState(STATE.LOADING);
    const [query, setQuery] = useState("");
    const [queryStatus, setQueryStatus] = useState(STATE.LOADING);

    return (
        <AdminDashboardTemplateView select={"manage_users"} messages={messages}>

        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminManageUsersView, serverData);
});

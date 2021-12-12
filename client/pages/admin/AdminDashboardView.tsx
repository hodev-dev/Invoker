import { View } from "@core/View";
import { useEffect } from "react";
import { AdminDashboardTemplateView } from "./AdminDashboardTemplateView";

export const AdminDashboardView = (props) => {
    useEffect(() => {
    }, [props]);

    return (
        <AdminDashboardTemplateView select={"dashboard"}>
            <div>htest</div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminDashboardView, serverData);
});

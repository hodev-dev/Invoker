import { View } from "@core/View";
import React, { useEffect } from "react";
import { AdminDashboardTemplateView } from "./AdminDashboardTemplateView";

export const AdminPaymentsView = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <AdminDashboardTemplateView select={"payments"}>
            <div>manage payments</div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminPaymentsView, serverData);
});

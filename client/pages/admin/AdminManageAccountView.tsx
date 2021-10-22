import { View } from '@core/View';
import React, { useEffect } from 'react';
import '@client/css/index.css';
import { AdminDashboardTemplateView } from './AdminDashboardTemplateView';

export const AdminManageAccountView = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <AdminDashboardTemplateView select={'manage_account'}>
            <div>manage account</div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminManageAccountView, serverData);
});

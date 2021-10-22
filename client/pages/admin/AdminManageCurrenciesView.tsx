import { View } from '@core/View';
import React, { useEffect } from 'react';
import '@client/css/index.css';
import { AdminDashboardTemplateView } from './AdminDashboardTemplateView';

export const AdminManageCurrenciesView = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <AdminDashboardTemplateView select={'manage_currencies'}>
            <div>manage currencies</div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminManageCurrenciesView, serverData);
});

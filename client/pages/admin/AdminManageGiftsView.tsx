import { View } from '@core/View';
import React, { useEffect } from 'react';
import '@client/css/index.css';
import { AdminDashboardTemplateView } from './AdminDashboardTemplateView';

export const AdminManageGiftsView = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <AdminDashboardTemplateView select={'manage_gifts'}>
            <div>manage gifts</div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminManageGiftsView, serverData);
});

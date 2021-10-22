import { View } from '@core/View';
import React, { useEffect } from 'react';
import '@client/css/index.css';
import { AdminDashboardTemplateView } from './AdminDashboardTemplateView';

export const AdminManageCollectionsView = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <AdminDashboardTemplateView select={'manage_collections'}>
            <div>manage collections</div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminManageCollectionsView, serverData);
});

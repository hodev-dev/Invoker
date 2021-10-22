import { View } from '@core/View';
import { useEffect } from 'react';
import '@client/css/index.css';
import { AdminDashboardTemplateView } from './AdminDashboardTemplateView';

export const AdminDashboardView = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <AdminDashboardTemplateView select={'dashboard'}>
            <div>htest</div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminDashboardView, serverData);
});

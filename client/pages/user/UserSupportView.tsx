import { View } from '@core/View';
import React from 'react';
import '@client/css/index.css';
import { UserDashboardTemplate } from '@client/pages/user/UserDashboardTemplate';
import { Separator } from '@client/components/Separator';

export const UserSupportView = (props) => {
    return (
        <UserDashboardTemplate select={'support'}>
            <Separator title={'تیکت ها'} />
            <div
                className={
                    'flex items-center divide-x-2 justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base  border border-l-0 border-r-0 '
                }
            >
                <div className={'w-9/12 mr-2 flex items-center justify-start'}>
                    test
                </div>
                <div className={'w-1/12 mr-2 flex items-center justify-center'}>
                    date
                </div>
                <div className={'w-1/12 mr-2 flex items-center justify-center'}>
                    status
                </div>
                <div className={'w-1/12 mr-2 flex items-center justify-center'}>
                    action
                </div>

            </div>
            <div
                className={
                    'flex items-center justify-center  w-full h-12 p-4  text-gray-600 text-base'
                }
            >
                رکوردی یافت نشد
            </div>
        </UserDashboardTemplate>
    );
};

View.get().then((serverData) => {
    View.render(UserSupportView, serverData);
});

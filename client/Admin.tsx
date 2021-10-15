import { View } from '@core/View';
import React, { useEffect } from 'react';

export const Admin = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <div suppressHydrationWarning={true}>
            <h1 className={'text-4xl text-blue'}>admin</h1>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(Admin, serverData);
});

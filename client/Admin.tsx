import { Invoker } from '@core/invoker';
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

Invoker.get().then((serverData) => {
    Invoker.render(Admin, serverData);
});

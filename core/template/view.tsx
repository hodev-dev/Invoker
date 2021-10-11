import { Invoker } from '@core/invoker';
import React, { useEffect } from 'react';

export const VIEW_NAME = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return <div suppressHydrationWarning={true}>// render</div>;
};

Invoker.get().then((serverData) => {
    Invoker.render(VIEW_NAME, serverData);
});

import { View } from '@core/View';
import React, { useEffect } from 'react';
import '@client/css/index.css';

export const VIEW_NAME = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <div suppressHydrationWarning={true}>
            <div></div>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(VIEW_NAME, serverData);
});

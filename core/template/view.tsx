import { View } from '@core/View';
import React, { useEffect } from 'react';

export const VIEW_NAME = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return <div suppressHydrationWarning={true}>// render</div>;
};

View.get().then((serverData) => {
    View.render(VIEW_NAME, serverData);
});

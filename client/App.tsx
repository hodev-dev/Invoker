import { Invoker } from '@core/invoker';
import React, { useEffect } from 'react';
import './css/index.css';
import Header from './Header';

export const App = (props: any) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <div
            className={'w-full h-screen bg-blue-700'}
            suppressHydrationWarning={true}
        >
            <Header />
            <h1>page 1 you wtf</h1>
            <a href={'/test2'}>go to page2</a>
        </div>
    );
};

Invoker.get().then((serverData) => {
    Invoker.render(App, serverData);
});

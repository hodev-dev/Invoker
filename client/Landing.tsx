import { Invoker } from '@core/invoker';
import React, { useEffect } from 'react';

export const Landing = (props: any) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <div className={'flex items-center justify-center w-full h-screen bg-blue-700'} suppressHydrationWarning={true}>
            <div className={'flex flex-col w-full text-center'}>
                <h1 className={'ml-10 text-4xl text-white'}>Landing Page</h1>
                <div className={'flex flex-col w-full mt-10 text-center'}>
                    <a className={'font-mono text-lg text-white'} href="login">
                        Login
                    </a>
                    <a className={'font-mono text-lg text-white'} href="regester">
                        Regester
                    </a>
                    <a className={'font-mono text-lg text-white'} href="admin">
                        Admin
                    </a>
                    <a className={'font-mono text-lg text-white'} href="user">
                        User
                    </a>
                </div>
            </div>
        </div>
    );
};

Invoker.get().then((serverData) => {
    Invoker.render(Landing, serverData);
});

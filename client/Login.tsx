import { Invoker } from '@core/invoker';
import React, { useEffect } from 'react';

export const Login = (props: any) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <div className={'w-full bg-gray-50'} suppressHydrationWarning={true}>
            <form
                className={
                    'flex flex-col items-center justify-center w-full h-screen shadow-xl'
                }
                method="post"
                action="/login"
            >
                <input
                    className={'w-4/12 h-12 text-center border '}
                    type="email"
                    name="email"
                    id="email"
                    placeholder={'email'}
                />
                <input
                    className={'w-4/12 h-12 text-center border '}
                    type="password"
                    name="password"
                    id="password"
                    placeholder={'password'}
                />
                <input
                    className={
                        'w-4/12 h-12 text-center bg-blue-700 border text-white'
                    }
                    type="submit"
                    value="Login"
                />
            </form>
        </div>
    );
};

Invoker.get().then((serverData) => {
    Invoker.render(Login, serverData);
});

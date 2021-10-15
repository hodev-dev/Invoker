import { View } from '@core/View';
import React, { useEffect } from 'react';

export const Regester = (props) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <div
            className={'flex flex-col items-center justify-center w-full h-screen bg-blue-600'}
            suppressHydrationWarning={true}
        >
            <form
                className={'flex flex-col items-center justify-center w-full h-screen'}
                method={'post'}
                action="/regester"
            >
                <input
                    className={'w-6/12 h-12 text-center border'}
                    placeholder={'username'}
                    type="text"
                    name={'username'}
                    required
                />

                <input
                    className={'w-6/12 h-12 text-center border'}
                    placeholder={'email'}
                    type="email"
                    name={'email'}
                    required
                />
                <input
                    className={'w-6/12 h-12 text-center border'}
                    placeholder={'password'}
                    type="password"
                    name={'password'}
                    required
                />
                <input className={'w-6/12 h-12 text-center border'} type="submit" value={'regester'} />
            </form>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(Regester, serverData);
});

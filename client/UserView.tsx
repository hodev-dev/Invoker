import { View } from '@core/View';
import { useEffect } from 'react';
import './css/index.css';

export const UserView = (props: any) => {
    useEffect(() => {
        props.init();
    }, [props]);

    return (
        <div className={'w-full h-screen bg-white'} suppressHydrationWarning={true}>
            <a className={'h-2 ml-10 text-xl text-yellow-600'} href="login">
                Login
            </a>
            <a className={'h-2 ml-10 text-xl text-yellow-600'} href="logout">
                Logout
            </a>
            <a className={'h-2 ml-10 text-xl text-yellow-600'} href="/">
                landing
            </a>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(UserView, serverData);
});

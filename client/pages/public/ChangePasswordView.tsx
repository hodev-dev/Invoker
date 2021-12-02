import { View } from '@core/View';
import React, { useEffect } from 'react';
import '@client/css/index.css';
import { FiUser } from 'react-icons/fi';

export const ChangePasswordView = (props) => {
    useEffect(() => {
    }, [props]);

    return (
        <div className={'w-full bg-white font-shabnam'} suppressHydrationWarning={true}>
            <form
                className={'flex flex-col items-center justify-center w-full h-screen shadow-xl'}
                method="post"
                action="/update_password"
            >
                <FiUser size={72} className={'p-2 text-blue-700 border-4 rounded-full '} />
                <input
                    className={'w-4/12 h-12 mt-5 text-center border bg-gray-50 '}
                    type="text"
                    name="password"
                    id="password"
                    defaultValue={props.body && props.body.phone}
                    placeholder={'رمز عبور'}
                />
                <input
                    className={'w-4/12 h-12 mt-5 text-center border bg-gray-50 '}
                    type="text"
                    name="rpassword"
                    id="rpassword"
                    defaultValue={props.body && props.body.phone}
                    placeholder={'تکرار رمز عبور'}
                />
                <input
                    className={'w-4/12 h-12 mt-5 text-center border bg-gray-50 hidden '}
                    type="text"
                    name="totp"
                    id="totp"
                    defaultValue={props.totp}
                    placeholder={'رمز عبور'}
                />
                <input
                    className={
                        'w-4/12 h-12 mt-5 text-center text-gray-700 bg-white hover:bg-gray-100 border rounded-lg cursor-pointer'
                    }
                    type="submit"
                    value="تایید"
                />
                <div className={"w-4/12 h-auto mt-5"}>
                </div>
                <div className={'flex flex-row '}>
                    <a href="/register" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                        ایجاد حساب کاربری
                    </a>
                    <a href="/login" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                        ورود به حساب
                    </a>
                </div>
                <a href="/" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                    بازگشت به فروشگاه
                </a>
            </form>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(ChangePasswordView, serverData);
});

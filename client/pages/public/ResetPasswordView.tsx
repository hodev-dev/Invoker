import { View } from "@core/View";
import React, { useEffect } from "react";
import { FiUser } from "react-icons/fi";

export const ResetPasswordView = (props) => {
    useEffect(() => {
    }, [props]);

    return (
        <div className={"w-full bg-white font-shabnam"} suppressHydrationWarning={true}>
            <form
                className={"flex flex-col items-center justify-center w-full h-screen shadow-xl"}
                method='post'
                action='/send_totp_to_phone'
            >
                <FiUser size={72} className={"p-2 text-blue-700 border-4 rounded-full "} />
                <input
                    className={"w-4/12 h-12 mt-5 text-center border bg-gray-50 "}
                    type='text'
                    name='phone'
                    id='phone'
                    defaultValue={props.body && props.body.phone}
                    placeholder={"شماره موبایل"}
                />
                <input
                    className={
                        "w-4/12 h-12 mt-5 text-center text-gray-700 bg-white hover:bg-gray-100 border rounded-lg cursor-pointer"
                    }
                    type='submit'
                    value='بازیابی رمز عبور'
                />
                <div className={"w-4/12 h-auto mt-5"}>
                </div>
                <div className={"flex flex-row "}>
                    <a href='/register' className={"mt-5 mr-5 text-gray-400 hover:underline"}>
                        ایجاد حساب کاربری
                    </a>
                    <a href='/login' className={"mt-5 mr-5 text-gray-400 hover:underline"}>
                        ورود به حساب
                    </a>
                </div>
                <a href='/' className={"mt-5 mr-5 text-gray-400 hover:underline"}>
                    بازگشت به فروشگاه
                </a>
            </form>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(ResetPasswordView, serverData);
});

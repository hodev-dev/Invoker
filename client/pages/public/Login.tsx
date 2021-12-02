import { View } from '@core/View';
import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { Messages } from '@client/components/Messages';

export const Login = (props) => {
    const [select, setSelect] = useState<any>([]);

    return (
        <div className={'w-full bg-white font-shabnam'} suppressHydrationWarning={true}>
            <form
                className={'flex flex-col items-center justify-center w-full h-screen shadow-xl'}
                method='post'
                action='/login'
            >
                <FiUser size={72} className={'p-2 text-blue-700 border-4 rounded-full '} />
                <input
                    className={'w-4/12 h-12 mt-5 text-center border bg-gray-50 '}
                    type='text'
                    name='phone'
                    id='phone'
                    defaultValue={props.body && props.body.phone}
                    placeholder={'شماره موبایل'}
                />
                <input
                    className={' w-4/12 h-12 mt-5 text-center border bg-gray-50'}
                    type='password'
                    name='password'
                    id='password'
                    defaultValue={props.body && props.body.password}
                    placeholder={'پسورد'}
                />
                <input
                    className={
                        'w-4/12 h-12 mt-5 text-center text-gray-700 bg-white hover:bg-gray-100 border rounded-lg cursor-pointer'
                    }
                    type='submit'
                    value='ورود'
                />
                <div className={'w-4/12 h-auto mt-5'}>
                    {props.messages &&
                    props.messages.map((messege, index) => {
                        return (
                            <Messages key={messege.label + index} select={select} index={index}
                                      message={messege}
                                      onClick={() => setSelect([...select, index])} />
                        );
                    })}
                </div>
                <div className={'flex flex-row '}>
                    <a href='/register' className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                        ایجاد حساب کاربری
                    </a>
                    <a href='/reset_password' className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                        بازیابی رمز عبور
                    </a>
                </div>
                <a href='/' className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                    بازگشت به فروشگاه
                </a>
            </form>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(Login, serverData);
});

import { View } from '@core/View';
import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { VscClose } from 'react-icons/vsc';

export const Login = (props) => {
    const [select, setSelect] = useState<any>([]);

    const createMessageClass = (type: string) => {
        switch (type) {
            case 'E':
                return 'bg-red-50  text-black  rounded';
            case 'W':
                return 'bg-yellow-50 text-black';
            case 'S':
                return 'bg-green-50 text-black';
        }
    };
    
    const renderMesseges = () => {
        return (
            props.messages &&
            props.messages.map((messege, index) => {
                return (
                    <ul
                        dir={'rtl'}
                        className={`${
                            select.includes(index) ? 'hidden' : 'flex'
                        } flex-col  flex-wrap items-center w-full list-disc`}
                    >
                        <li className={`flex flex-row   w-full h-16 p-5 text-md ${createMessageClass(messege.type)}`}>
                            <div className={'w-11/12 '}>{messege.label}</div>
                            <div className={'flex justify-end w-1/12 ml-5 items-center '}>
                                <div onClick={() => setSelect([...select, index])}>
                                    <VscClose
                                        size={18}
                                        className={'text-black border-2 border-black rounded-full fill-current hover:cursor-pointer'}
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                );
            })
        );
    };
    
    return (
        <div className={'w-full bg-white font-shabnam'} suppressHydrationWarning={true}>
            <form
                className={'flex flex-col items-center justify-center w-full h-screen shadow-xl'}
                method="post"
                action="/login"
            >
                <FiUser size={84} className={'p-2 text-gray-500 border-4 rounded-full '} />
                <input
                    className={'w-4/12 h-12 mt-5 text-center border bg-gray-50 '}
                    type="text"
                    name="phone"
                    id="phone"
                    defaultValue={props.body && props.body.phone}
                    placeholder={'شماره موبایل'}
                />
                <input
                    className={' w-4/12 h-12 mt-5 text-center border bg-gray-50'}
                    type="password"
                    name="password"
                    id="password"
                    defaultValue={props.body &&  props.body.password}
                    placeholder={'پسورد'}
                />
                <input
                    className={
                        'w-4/12 h-12 mt-5 text-center text-gray-700 bg-white hover:bg-gray-100 border rounded-lg cursor-pointer'
                    }
                    type="submit"
                    value="ورود"
                />
                <div className={"w-4/12 h-auto mt-5"}>
                    {renderMesseges()}
                </div>
                 <div className={'flex flex-row '}>
                    <a href="/regester" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                        ایجاد حساب کاربری
                    </a>
                    <a href="/" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                        بازیابی رمز عبور
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
    View.render(Login, serverData);
});

import { View } from '@core/View';
import { useEffect, useState } from 'react';
import { FiShield, FiUser } from 'react-icons/fi';
import { VscClose } from 'react-icons/vsc';
import Countdown from 'react-countdown';

export const TOTP = (props) => {
    const [select, setSelect] = useState<any>([]);
    const [localMesseges, setLocalMesseges] = useState<any>([]);

    useEffect(() => {
        setLocalMesseges(
            [{
                type: 'S',
                label: 'کد تایید به موبایل  شما ارسال شده است'
            }]
        )
    }, [])

    const createMessageClass = (type: string) => {
        switch (type) {
            case 'E':
                return 'text-red-500';
            case 'W':
                return 'text-blue-500';
            case 'S':
                return 'text-green-500';
            default:
                return 'text-red-500';
        }
    };

    const renderMesseges = () => {
        return (
            props.messages &&
            props.messages.map((messege, index) => {
                console.log(messege.type);
                return (
                    <ul
                        key={messege.label + index}
                        dir={'rtl'}
                        className={`${select.includes(index) ? 'hidden' : 'flex'
                            } flex-col  flex-wrap items-center w-full list-disc`}
                    >
                        <li className={"w-full h-12 flex flex-row justify-center items-center  p-2 border rounded"} dir={'rtl'}>
                            <div className={`w-11/12 mr-5 text-sm ${createMessageClass(messege.type)}`}>{messege.label}</div>
                            <div className={"w-1/12"}>
                                <div onClick={() => setSelect([...select, index])}>
                                    <VscClose
                                        className={'text-gray-400 border-2 border-gray-300 rounded-full fill-current hover:cursor-pointer'}
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                );
            })
        );
    };

    const renderLocalMesseges = () => {
        return (
            localMesseges &&
            localMesseges.map((messege, index) => {
                return (
                    <ul
                        key={messege.label + index}
                        dir={'rtl'}
                        className={`${select.includes(index) ? 'hidden' : 'flex'
                            } flex-col  flex-wrap items-center w-full list-disc`}
                    >
                        <li className={"w-full h-12 flex flex-row justify-center items-center  p-2 border rounded"} dir={'rtl'}>
                            <div className={`w-11/12 mr-5 text-sm ${createMessageClass(messege.type)}`}>{messege.label}</div>
                            <div className={"w-1/12"}>
                                <div onClick={() => setSelect([...select, index])}>
                                    <VscClose
                                        className={'text-gray-400 border-2 border-gray-300 rounded-full fill-current hover:cursor-pointer'}
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
                <FiShield size={72} className={'p-2 text-blue-700 border-4 rounded-full '} />
                <input
                    className={'w-4/12 h-12 mt-5 text-center border bg-gray-50 tracking-widest text-md'}
                    type="text"
                    name="totp"
                    id="totp"
                    defaultValue={props.body && props.body.phone}
                    placeholder={'کد تایید 6 رقمی'}
                />
                <div className={'flex justify-center items-center tracking-widest w-4/12 h-12 mt-5 text-center text-lg text-gray-500 bg-white  border rounded-lg '}>
                    <Countdown precision={3} date={new Date(props.totpEndTimeout)} />
                </div>
                <div className={"w-4/12 h-auto mt-5"}>
                    {renderMesseges()}
                    {renderLocalMesseges()}
                </div>
                <input
                    className={
                        'w-4/12 h-12 mt-5 text-center text-gray-700 bg-white hover:bg-gray-100 border rounded-lg cursor-pointer'
                    }
                    type="submit"
                    value="تایید"
                />
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
        </div >
    );
};

View.get().then((serverData) => {
    View.render(TOTP, serverData);
});

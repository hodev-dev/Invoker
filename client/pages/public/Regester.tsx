import { View } from '@core/View';
import { useEffect, useState } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { VscClose } from 'react-icons/vsc';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FiCheckCircle, FiAlertCircle, FiUser } from "react-icons/fi";
import { phoneNumberValidator } from "@persian-tools/persian-tools";

export const Regester = (props) => {
    const [localMesseges, setLocalMesseges] = useState<any>([]);
    const [select, setSelect] = useState<any>([]);
    const [phone, setPhone] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [passwordLength, setPasswordLength] = useState<any>(0);
    const [rpassword, setRpassword] = useState<any>('');
    const [isEqeual, setIsEqual] = useState<any>(false);
    const [isValidPhone, setIsValidPhone] = useState<any>(false);
    const [score, setScore] = useState<any>(0);

    const createMessageClass = (type: string) => {
        switch (type) {
            case 'E':
                return 'text-black  rounded';
            case 'W':
                return 'text-red-400';
            case 'S':
                return 'text-black';
        }
    };

    const handlePhone = (event) => {
        setPhone(event.target.value);
        setIsValidPhone(phoneNumberValidator(event.target.value));
    }

    const handleBlurPhone = (event) => {
        if (phoneNumberValidator(event.target.value) === false) {
            setLocalMesseges([
                {
                    type: 'W',
                    label: 'شماره موبایل وارد شده معتبر نمی باشد'
                },
            ]);
        } else {
            setLocalMesseges([]);
            setIsValidPhone(phoneNumberValidator(event.target.value));
        }
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        setPasswordLength(event.target.value.length);
    }

    const handleRepeatPassword = (event) => {
        setRpassword(event.target.value);
    }

    const handleScore = (s) => {
        setScore(s);
    }


    const handleBlurRepeatPassword = () => {
        if (password != rpassword) {
            setLocalMesseges([
                {
                    type: 'W',
                    label: 'رمز عبور و تکرار ان باید برابر باشد'
                }
            ]);
        }
        else if (password.length < 6) {
            setLocalMesseges([
                {
                    type: 'W',
                    label: 'رمز عبور باید حدالاقل 6 کاراکتر باشد'
                }
            ]);
        }
        else if (score < 2) {
            setLocalMesseges([
                {
                    type: 'W',
                    label: 'رمز عبور وارد شده ایمن نیست لطفا از ترکیب عدد و حروف استفاده کنید'
                }
            ]);
        }
        else {
            setLocalMesseges([]);
        }
    }

    const renderMesseges = () => {
        return (
            props.messages &&
            props.messages.map((messege, index) => {
                return (
                    <div
                        dir={'rtl'}
                        className={`${select.includes(index) ? 'hidden' : 'flex'
                            } flex-col h-auto justify-center items-center flex-wrap  w-full `}
                    >
                        <div className={`flex  flex-row justify-center items-center w-full h-auto p-5 text-md ${createMessageClass(messege.type)}`}>
                            <div className={'w-11/12 '}>{messege.label}</div>
                            <div className={'flex justify-center h-12 w-1/12 ml-5 items-center  '}>
                                <div onClick={() => setSelect([...select, index])}>
                                    <VscClose
                                        size={18}
                                        className={'text-gray-300 border-2 border-gray-300 rounded-full fill-current hover:cursor-pointer'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <li className={"w-full h-12 flex flex-row justify-center items-center  p-2 mt-2 border rounded"} dir={'rtl'}>
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
        <div className={'w-full h-auto  bg-white font-shabnam'} suppressHydrationWarning={true}>
            <form
                className={'flex flex-col items-center justify-center w-full min-h-screen h-auto shadow-xl'}
                method="post"
                action="/Regester"
            >
                <div className={"flex w-4/12 h-12 mt-5 text-center items-center justify-end  bg-gray-50"}>
                    <h1 className={"mr-5 text-gray-500"}>ایجاد حساب کابری</h1>
                </div>
                <input
                    className={`w-4/12 h-12 mt-5 text-center border ${!isValidPhone && phone != '' ? 'border-red-500' : ''} bg-gray-50`}
                    type="phone"
                    name="phone"
                    id="phone"
                    defaultValue={props.body && props.body.phone}
                    placeholder={'شماره موبایل'}
                    onChange={handlePhone}
                    onBlur={handleBlurPhone}
                />
                <input
                    className={`w-4/12 h-12 mt-5 text-center border bg-gray-50 ${(passwordLength < 6 || score < 2) && password != '' ? 'border-red-500' : ''}`}
                    type="password"
                    name="password"
                    id="password"
                    defaultValue={props.body && props.body.password}
                    onChange={handlePassword}
                    onBlur={handleBlurRepeatPassword}
                    placeholder={'رمز عبور'}
                />
                <div className={"w-4/12 h-12  text-center  bg-gray-50"}>
                    <PasswordStrengthBar onChangeScore={handleScore} minLength={6} shortScoreWord={'رمز عبور کوتاه'} scoreWords={['خیلی ضعیف', 'ضغیف', 'متوسط', 'خوب', ' قوی']} password={password} />
                </div>
                <input
                    className={`w-4/12 h-12  text-center border bg-gray-50 ${password !== rpassword ? 'border-red-500' : ''}`}
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    defaultValue={props.body && props.body.password}
                    placeholder={'تکرار رمز عبور'}
                    onChange={handleRepeatPassword}
                    onBlur={handleBlurRepeatPassword}
                />
                <div className={' w-4/12 h-auto p-1 mt-5 border bg-white items-center rounded'}>
                    <div className={"w-full flex flex-row p-2 mt-2"} dir={'rtl'}>
                        <div className={"w-11/12 mr-5 text-sm text-gray-500"}>شماره موبایل صحیح</div>
                        <div className={"w-1/12"}>
                            {
                                (isValidPhone) ?
                                    <FiCheckCircle className={'text-green-500'} /> :
                                    <FiCheckCircle className={'text-gray-400'} />
                            }
                        </div>
                    </div>
                    <div className={"w-full flex flex-row p-2 mt-2"} dir={'rtl'}>
                        <div className={"w-11/12 mr-5 text-sm text-gray-500"}>رمز عبور حدالاقل 6 کاراکتر</div>
                        <div className={"w-1/12"}>
                            {
                                (passwordLength >= 6) ?
                                    <FiCheckCircle className={'text-green-500'} /> :
                                    <FiCheckCircle className={'text-gray-400'} />
                            }
                        </div>
                    </div>
                    <div className={"w-full flex flex-row p-2 mt-2"} dir={'rtl'}>
                        <div className={"w-11/12 mr-5 text-sm text-gray-500"}>رمز عبور ایمن</div>
                        <div className={"w-1/12"}>
                            {
                                (score >= 2) ?
                                    <FiCheckCircle className={'text-green-500'} /> :
                                    <FiCheckCircle className={'text-gray-400'} />
                            }
                        </div>
                    </div>
                    <div className={"w-full flex flex-row p-2 mt-2"} dir={'rtl'}>
                        <div className={"w-11/12 mr-5 text-sm text-gray-500"}>رمز عبور برابر تکرار رمز عبور</div>
                        <div className={"w-1/12"}>
                            {
                                (password === rpassword && password != '') ?
                                    <FiCheckCircle className={'text-green-500'} /> :
                                    <FiCheckCircle className={'text-gray-400'} />
                            }
                        </div>
                    </div>
                </div>
                <div className={"w-4/12 h-auto mt-5"}>
                    {renderMesseges()}
                    {renderLocalMesseges()}
                </div>
                <input
                    disabled
                    className={
                        'w-4/12  h-12 mt-5 text-center text-gray-700 bg-white hover:bg-gray-100 border rounded-lg cursor-pointer'
                    }
                    type="submit"
                    value="ثبت نام"
                />
                <div className={'flex flex-row '}>
                    <a href="/login" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                        ورود به حساب کابربری
                    </a>
                    <a href="/" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                        بازیابی رمز عبور
                    </a>
                </div>
                <a href="/" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                    بازگشت به فروشگاه
                </a>
                <div className={'h-10'}></div>
            </form>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(Regester, serverData);
});

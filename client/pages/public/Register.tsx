import { View } from '@core/View';
import { useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FiCheckCircle } from "react-icons/fi";
import { phoneNumberValidator } from "@persian-tools/persian-tools";

export const Register = (props) => {
    const [localMesseges, setLocalMesseges] = useState<any>([]);
    const [select, setSelect] = useState<any>([]);
    const [phone, setPhone] = useState<any>(props.body ? props.body.phone : '');
    const [password, setPassword] = useState<any>(props.body ? props.body.password : '');
    const [rpassword, setRpassword] = useState<any>(props.body ? props.body.password : '');
    const [passwordLength, setPasswordLength] = useState<any>(props.body ? props.body.password.length : 0);
    const [isValidPhone, setIsValidPhone] = useState<any>(props.body ? phoneNumberValidator(props.body.phone) : false);
    const [score, setScore] = useState<any>(props.body ? props.body.score : 0);

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
        <div className={'w-full h-auto  bg-white font-shabnam'} suppressHydrationWarning={true}>
            <form
                className={'flex flex-col items-center justify-center w-full min-h-screen h-auto shadow-xl'}
                method="post"
                action="/Register"
            >
                <div className={"flex w-4/12 h-12 mt-2 text-center items-center justify-end border border-r-0 border-l-0 border-t-0"}>
                    <h1 className={" text-gray-500"}>ایجاد حساب کاربری</h1>
                </div>
                <label className={'w-4/12 mt-2'} htmlFor="phone">
                    <h1 className={"text-right text-xs  text-gray-500"}>
                        : شماره موبایل
                    </h1>
                </label>
                <input
                    required
                    className={`w-4/12 h-12 mt-3 text-center border ${!isValidPhone && phone != '' ? 'border-red-500' : ''} bg-gray-50`}
                    type="phone"
                    name="phone"
                    id="phone"
                    defaultValue={props.body && props.body.phone}
                    placeholder={'09390000000 :مثال'}
                    onChange={handlePhone}
                    onBlur={handleBlurPhone}
                />
                <label className={'w-4/12 mt-2'} htmlFor="phone">
                    <h1 className={"text-right text-xs  text-gray-500"}>
                        : رمز عبور
                    </h1>
                </label>
                <input
                    required
                    className={`w-4/12 h-12 mt-3 text-center border bg-gray-50 ${(passwordLength < 6 || score < 2) && password != '' ? 'border-red-500' : ''}`}
                    type="password"
                    name="password"
                    id="password"
                    defaultValue={props.body && props.body.password}
                    onChange={handlePassword}
                    onFocus={() => props.body ? setPassword(props.body.password) : false}
                    placeholder={'qCTmgL6hfZKH :مثال'}
                />
                <div className={"w-4/12 h-12  text-center"}>
                    <PasswordStrengthBar scoreWordStyle={{ "textAlign": "center" }} onChangeScore={handleScore} minLength={6} shortScoreWord={'رمز عبور کوتاه'} scoreWords={['خیلی ضعیف', 'ضغیف', 'متوسط', 'خوب', ' قوی']} password={password} />
                    <input className={'hidden'} name={'score'} id={'score'} />
                </div>
                <label className={'w-4/12'} htmlFor="phone">
                    <h1 className={"text-right text-xs  text-gray-500"}>
                        : تکرار رمز عبور
                    </h1>
                </label>
                <input
                    required
                    className={`w-4/12 h-12 mt-3  text-center border bg-gray-50 ${password !== rpassword ? 'border-red-500' : ''}`}
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
                    disabled={(isValidPhone && password === rpassword && score >= 2 && password.length >= 6) ? false : true}
                    className={
                        `disabled:bg-gray-200 disabled:cursor-not-allowed  w-4/12  h-12 mt-2 text-center text-gray-700 bg-white hover:bg-gray-100 border rounded-lg cursor-pointer`
                    }
                    type="submit"
                    value="ثبت نام"
                />
                <div className={'flex flex-row '}>
                    <a href="/login" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
                        ورود به حساب کابربری
                    </a>
                    <a href="/reset_password" className={'mt-5 mr-5 text-gray-400 hover:underline'}>
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
    View.render(Register, serverData);
});

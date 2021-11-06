import '@client/css/index.css';
import { useState } from 'react';
import { VscClose } from 'react-icons/vsc';
export const AdminDashboardTemplateView = (props: any) => {
    const [select, setSelect] = useState<any>([]);
    const renderSelect = (selector: string) => {
        if (props.select == selector) {
            return <div className={'w-3 h-3 mr-5 bg-blue-800 rounded-full'}></div>;
        } else {
            return <div className={'w-3 h-3 mr-5 bg-transparent rounded-full'}></div>;
        }
    };
    const createMessageClass = (type: string) => {
        switch (type) {
            case 'E':
                return 'bg-red-50 text-black';
            case 'W':
                return 'bg-yellow-50 text-black';
            case 'S':
                return 'bg-green-50 text-black';
        }
    };
    const renderMesseges = () => {
        console.log(props);
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
                        <li className={`flex flex-row w-full h-auto p-5 text-lg ${createMessageClass(messege.type)}`}>
                            <div className={'w-11/12'}>{messege.label}</div>
                            <div className={'flex justify-end w-1/12 ml-5'}>
                                <button onClick={() => setSelect([...select, index])}>
                                    <VscClose
                                        size={18}
                                        className={'text-black border-2 border-black rounded-full fill-current'}
                                    />
                                </button>
                            </div>
                        </li>
                    </ul>
                );
            })
        );
    };
    return (
        <div className={'w-full h-auto min-h-screen bg-gray-50 font-shabnam'}>
            <header className={'bg-white'}>
                <nav className={'w-full shadow-sm'}>
                    <ul className={'flex flex-row items-center w-6/12 h-12'}>
                        <li className={'ml-10'}>
                            <a href="/logout">خروج</a>
                        </li>
                        <li className={'ml-10'}>
                            <a href="/">فروشگاه</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <section
                className={`w-full h-auto ${
                    props.messages && props.messages.length > 0 ? 'border' : ''
                } border-b-0 rounded-md shadow-sm bg-gray-50`}
            >
                {renderMesseges()}
            </section>
            <div className={'flex flex-row w-full '} dir={'rtl'}>
                <section className={'w-3/12 min-h-screen border rounded-md shadow-sm bg-gray-50'}>
                    <ul className={''}>
                        <li className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>
                            منو اصلی
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0 '
                            }
                        >
                            {renderSelect('dashboard')}
                            <a className={'mr-5'} href="/admin">
                                داشبورد
                            </a>
                        </li>
                    </ul>
                    <ul className={''}>
                        <li className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>
                            کاربران
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0 '
                            }
                        >
                            {renderSelect('manage_users')}
                            <a className={'mr-5'} href="/admin/manage_users">
                                مدریت حساب ها
                            </a>
                        </li>
                    </ul>
                    <ul className={''}>
                        <li className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>مالی</li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0 '
                            }
                        >
                            {renderSelect('payments')}
                            <a className={'mr-5'} href="/admin/payments">
                                گزارش پرداخت
                            </a>
                        </li>
                    </ul>
                    <ul className={''}>
                        <li className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>
                            محصولات
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 '
                            }
                        >
                            {renderSelect('manage_collections')}
                            <a className={'mr-5'} href="/admin/manage_collections">
                                مدریت دسته بندی ها
                            </a>
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 '
                            }
                        >
                            {renderSelect('manage_gifts')}
                            <a className={'mr-5'} href="/admin/manage_gifts">
                                مدریت گیفت کارت
                            </a>
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 '
                            }
                        >
                            {renderSelect('manage_currencies')}
                            <a className={'mr-5'} href="/admin/manage_currencies">
                                مدریت نرخ ارز
                            </a>
                        </li>
                    </ul>
                </section>
                <section className={'w-9/12 min-h-screen border border-r-0 rounded-md shadow-sm bg-gray-50'}>
                    {props.children}
                </section>
            </div>
        </div>
    );
};

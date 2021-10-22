import { View } from '@core/View';
import '@client/css/index.css';

export const UserDashboardView = (props: any) => {
    return (
        <div className={'w-full h-auto bg-gray-50'}>
            <header className={'bg-white'}>
                <nav className={'w-full shadow-sm'}>
                    <ul className={'flex flex-row items-center w-6/12 h-16'}>
                        <li className={'ml-10'}>
                            <a href="/logout">خروج</a>
                        </li>
                        <li className={'ml-10'}>
                            <a href="/">فروشگاه</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className={'flex flex-row w-full '} dir={'rtl'}>
                <section className={'w-3/12 h-screen border rounded-md shadow-sm bg-gray-50'}>
                    <ul className={''}>
                        <li className={'flex items-center w-full h-16 p-4 text-sm text-gray-500 bg-gray-50'}>مالی</li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 '
                            }
                        >
                            <a className={'mr-10'} href="#">
                                کیف پول
                            </a>
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0 '
                            }
                        >
                            <a className={'mr-10'} href="#">
                                گزارش پرداخت
                            </a>
                        </li>
                    </ul>
                    <ul className={''}>
                        <li className={'flex items-center w-full h-16 p-4 text-sm text-gray-500 bg-gray-50'}>
                            محصولات
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 '
                            }
                        >
                            <a className={'mr-10'} href="#">
                                گزارش خرید
                            </a>
                        </li>
                    </ul>
                    <ul className={''}>
                        <li className={'flex items-center w-full h-16 p-4 text-sm text-gray-500 bg-gray-50'}>
                            حساب کاربری
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 '
                            }
                        >
                            <a className={'mr-10'} href="#">
                                اطلاعات حساب
                            </a>
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                            }
                        >
                            <a className={'mr-10'} href="#">
                                تغییر شماره همراه
                            </a>
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                            }
                        >
                            <a className={'mr-10'} href="#">
                                تغییر پسورد
                            </a>
                        </li>
                    </ul>
                    <ul className={''}>
                        <li className={'flex items-center w-full h-16 p-4 text-sm text-gray-500 bg-gray-50'}>
                            پشتیبانی
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 '
                            }
                        >
                            <a className={'mr-10'} href="#">
                                پشتیلانی تلگرام
                            </a>
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0 '
                            }
                        >
                            <a className={'mr-10'} href="#">
                                پشتیبانی واتس اپ
                            </a>
                        </li>
                        <li
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                            }
                        >
                            <a className={'mr-10'} href="#">
                                پشتیبانی تلفنی
                            </a>
                        </li>
                    </ul>
                </section>
                <section className={'w-9/12 h-screen'} dir={'ltr'}></section>
            </div>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(UserDashboardView, serverData);
});

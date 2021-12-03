import '@client/css/index.css';
import { MenuSeparator } from '@client/components/MenuSeparator';
import { MenuItem } from '@client/components/MenuItem';

export const UserDashboardTemplate = (props: { select, children? }) => {

    const renderSelect = (selector: string) => {
        if (props.select == selector) {
            return <div className={'w-3 h-3 mr-5 bg-pink-700 rounded-full'}>{null}</div>;
        } else {
            return <div className={'w-3 h-3 mr-5 bg-transparent rounded-full'}>{null}</div>;
        }
    };

    return (
        <div className={'w-full h-auto min-h-screen bg-gray-50 font-shabnam'}>
            <header className={'bg-white'}>
                <nav className={'w-full shadow-sm'}>
                    <ul className={'flex flex-row items-center w-6/12 h-16'}>
                        <li className={'ml-10'}>
                            <a href='/logout'>خروج</a>
                        </li>
                        <li className={'ml-10'}>
                            <a href='/'>فروشگاه</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className={'flex flex-row w-full '} dir={'rtl'}>
                <section className={'w-3/12 min-h-screen border rounded-md shadow-sm bg-gray-50'}>
                    <MenuSeparator title={'امور مشتریان'} />
                    <MenuItem element={renderSelect('support')} href={'/user/support'} title={'پشتیبانی'} />
                </section>
                <section className={'w-9/12 min-h-screen border border-r-0 rounded-md shadow-sm bg-gray-50'}>
                    {props.children}
                </section>
            </div>
        </div>
    );
};

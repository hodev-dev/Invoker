import { View } from '@core/View';
import React, { Fragment, useEffect, useState } from 'react';
import '@client/css/index.css';
import { AdminDashboardTemplateView } from './AdminDashboardTemplateView';
import { GiftCard } from '@client/components/GiftCard';
import axios from 'axios';
import { FaHandHolding } from 'react-icons/fa';

export const AdminManageGiftsView = (props) => {
    enum STATUS {
        LOADING,
        IDLE,
        FAIL,
    }
    const [gifts, setGifts] = useState([]);
    const [state, setState] = useState(STATUS.LOADING);

    useEffect(() => {
        axios
            .get('/admin/get_gifts')
            .then((response: any) => {
                const { data } = response;
                setGifts(data);
                setState(STATUS.IDLE);
            })
            .catch((err) => {
                setState(STATUS.FAIL);
                console.log(err);
            });
    }, [props]);

    const renderGifts = () => {
        if (state === STATUS.LOADING) {
            return <h1>loading</h1>;
        } else if (state === STATUS.IDLE) {
            return gifts.map((gift: any) => {
                return (
                    <div
                        key={gift.label + gift.price}
                        className={'w-1/6 mt-5 mr-5 content-evenly hover:cursor-pointer'}
                    >
                        <GiftCard
                            onClick={() => 0}
                            selected={false}
                            className={`w-full`}
                            type={gift.type}
                            label={gift.label}
                            price={gift.price + '$'}
                            alter_price={'0'}
                        />
                        <form action={`/admin/delete_gift/${gift.id}`} method="post">
                            <button
                                type={'submit'}
                                className={
                                    'w-full h-12 text-red-500 bg-red-100 border hover:bg-red-400 hover:text-red-900'
                                }
                            >
                                حذف
                            </button>
                        </form>
                    </div>
                );
            });
        } else {
            return <h1>failed</h1>;
        }
    };

    return (
        <AdminDashboardTemplateView select={'manage_gifts'}>
            <div className={'flex flex-col w-full h-auto'}>
                <div className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>افزودن گیفت</div>
                <div
                    className={
                        'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                    }
                >
                    <form className={'flex flex-row w-full'} action="/admin/add_gift" method="post">
                        <select
                            name={'type'}
                            defaultValue={'Apple'}
                            className={'w-4/12 mr-5 text-center border bg-gray-50'}
                        >
                            <option value="Apple">Apple</option>
                            <option value="Steam">Steam</option>
                        </select>
                        <input
                            name={'label'}
                            className={'w-4/12 mr-5 text-sm text-center border bg-gray-50'}
                            type="text"
                            placeholder={'عنوان'}
                        />
                        <input
                            name={'price'}
                            className={'w-4/12 mr-5 text-sm text-center border bg-gray-50'}
                            type="text"
                            placeholder={'قیمت'}
                        />
                        <button
                            type={'submit'}
                            className={
                                'w-2/12 ml-5 text-sm text-center mr-5 bg-white text-blue-500 h-9 border rounded-sm shadow-sm'
                            }
                        >
                            افزودن
                        </button>
                    </form>
                </div>
                <div className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>گیفت ها</div>
                <div className={'flex flex-row flex-wrap justify-center w-full'}>{renderGifts()}</div>
            </div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminManageGiftsView, serverData);
});

import { View } from '@core/View';
import React, { Fragment, useEffect, useState } from 'react';
import '@client/css/index.css';
import { AdminDashboardTemplateView } from './AdminDashboardTemplateView';
import ReactCountryFlag from 'react-country-flag';
import { getCountryName, isoCountries } from '@core/utility/useCountry';

export const AdminManageCurrenciesView = ({ currencies }) => {
    console.log(currencies);
    enum STATE {
        LOADING,
        IDLE,
        FAIL,
    }
    const [selectCountry, setSelectCountry] = useState('us');

    const handleChange = (event) => {
        setSelectCountry(event.target.value);
    };

    const renderCountry = () => {
        return Object.keys(isoCountries).map((key, index) => {
            return (
                <option key={key} value={key}>
                    {isoCountries[key]}
                </option>
            );
        });
    };

    const renderCollections = () => {
        return (
            currencies &&
            currencies.map((currency: any, index: any) => {
                return (
                    <Fragment>
                        <div
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                            }
                        >
                            <div className={'w-4/12'}>{currency.name}</div>
                            <div className={'w-4/12'}>{currency.value}</div>
                            <div className={'flex items-center justify-center w-2/12'}>
                                <ReactCountryFlag
                                    className={'p-1 '}
                                    svg
                                    style={{
                                        width: '2em',
                                        height: '2em',
                                    }}
                                    title={currency.name}
                                    countryCode={currency.name}
                                />
                            </div>
                            <div className={'flex flex-row w-2/12'}>
                                <form
                                    className={
                                        'w-full  ml-5 text-sm text-center bg-white text-red-500 border rounded-sm shadow-sm h-auto'
                                    }
                                    method={'post'}
                                    action={`/admin/delete_currency/${currency.id}`}
                                >
                                    <button
                                        className={'flex items-center justify-center w-full text-center h-9'}
                                        type={'submit'}
                                    >
                                        حذف
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Fragment>
                );
            })
        );
    };

    return (
        <AdminDashboardTemplateView select={'manage_currencies'}>
            <div className={'flex flex-col w-full h-auto'}>
                <div className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>افزودن ارز</div>
                <div
                    className={
                        'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                    }
                >
                    <form className={'flex flex-row w-full'} action="/admin/add_currency" method="post">
                        <input
                            name={'value'}
                            className={'w-4/12 text-sm text-center border bg-gray-50'}
                            type="text"
                            placeholder={'نرخ ارز'}
                        />
                        <select
                            name={'country'}
                            onChange={handleChange}
                            defaultValue={'US'}
                            className={'w-4/12 mr-5 text-center border bg-gray-50'}
                        >
                            {renderCountry()}
                        </select>
                        <div className={'flex items-center justify-center w-2/12 mr-5'}>
                            <ReactCountryFlag
                                className={'p-1 '}
                                svg
                                style={{
                                    width: '2em',
                                    height: '2em',
                                }}
                                title={selectCountry}
                                countryCode={selectCountry}
                            />
                        </div>
                        <button
                            className={
                                'w-2/12 ml-5 text-sm text-center bg-white text-blue-500 h-9 border rounded-sm shadow-sm'
                            }
                        >
                            افزودن
                        </button>
                    </form>
                </div>
                <div className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>کالکشن ها</div>
                {renderCollections()}
            </div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminManageCurrenciesView, serverData);
});

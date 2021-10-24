import { View } from '@core/View';
import React, { Fragment, useEffect, useState } from 'react';
import '@client/css/index.css';
import { AdminDashboardTemplateView } from './AdminDashboardTemplateView';
import { getCountryName, isoCountries } from '@core/utility/useCountry';
import ReactCountryFlag from 'react-country-flag';
import { FaChessKnight } from 'react-icons/fa';
import axios from 'axios';

export const AdminManageCollectionsView = (props) => {
    enum STATE {
        LOADING,
        IDLE,
        FAIL,
    }
    const [collections, setCollections] = useState<any>([]);
    const [status, setStatus] = useState(STATE.LOADING);
    const [select, setSelect] = useState('US');
    const [updateSelect, setUpdateSelect] = useState('US');
    const [updateID, setUpdateID] = useState(-1);

    useEffect(() => {
        axios.get('/admin/get_collections').then((response) => {
            const cols: any = response.data;
            setCollections(cols);
            setStatus(STATE.IDLE);
        });
    }, [props]);

    const renderCountry = () => {
        return Object.keys(isoCountries).map((key, index) => {
            return (
                <option key={key} value={key}>
                    {isoCountries[key]}
                </option>
            );
        });
    };

    const renderUpdateUi = (index) => {
        return (
            <div
                className={
                    'flex flex-col items-center justify-start  w-full h-auto   bg-gray-50  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                }
            >
                <div className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 '}>فرم ویرایش</div>
                <form className={'flex flex-row w-full p-4'} action="" method="post">
                    <input
                        className={'w-4/12 text-sm text-center bg-white border'}
                        type="text"
                        value={collections[index].title}
                        placeholder={'عنوان کالکشن'}
                    />
                    <select
                        defaultValue={collections[index].country}
                        onChange={(event) => setUpdateSelect(event.target.value)}
                        className={'w-4/12 mr-5 text-center bg-white border'}
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
                            title={updateSelect}
                            countryCode={updateSelect}
                        />
                    </div>
                    <button
                        className={
                            'w-2/12 ml-5 text-sm text-center text-blue-500 bg-white border rounded-sm shadow-sm h-9'
                        }
                    >
                        ثبت تغییرات
                    </button>
                </form>
            </div>
        );
    };

    const renderCollections = () => {
        if (status === STATE.LOADING) {
            return <h1>LOADING</h1>;
        } else if (status === STATE.IDLE) {
            return collections.map((collection: any, index: any) => {
                return (
                    <Fragment>
                        <div
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                            }
                        >
                            <div className={'w-8/12'}>{collection.title}</div>
                            <div className={'flex items-center justify-center w-2/12'}>
                                <ReactCountryFlag
                                    className={'p-1 '}
                                    svg
                                    style={{
                                        width: '2em',
                                        height: '2em',
                                    }}
                                    title={collection.country}
                                    countryCode={collection.country}
                                />
                            </div>
                            <div className={'w-2/12'}>
                                <button
                                    className={
                                        'w-16 ml-5 text-sm text-center bg-white text-red-500 border rounded-sm shadow-sm h-9'
                                    }
                                >
                                    حذف
                                </button>
                                <button
                                    onClick={() => setUpdateID(index)}
                                    className={
                                        'w-16 ml-5 text-sm text-center bg-white text-yellow-600 border rounded-sm shadow-sm h-9'
                                    }
                                >
                                    ویرایش
                                </button>
                            </div>
                        </div>
                        {updateID === index ? renderUpdateUi(index) : null}
                    </Fragment>
                );
            });
        } else {
            return <h1>FAIL</h1>;
        }
    };
    const handleSelect = (event) => {
        setSelect(event.target.value);
    };

    return (
        <AdminDashboardTemplateView select={'manage_collections'}>
            <div className={'flex flex-col w-full h-auto'}>
                <div className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>
                    افزودن کالکشن
                </div>
                <div
                    className={
                        'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                    }
                >
                    <form className={'flex flex-row w-full'} action="" method="post">
                        <input
                            className={'w-4/12 text-sm text-center border bg-gray-50'}
                            type="text"
                            placeholder={'عنوان کالکشن'}
                        />
                        <select
                            defaultValue={'US'}
                            onChange={handleSelect}
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
                                title={select}
                                countryCode={select}
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
    View.render(AdminManageCollectionsView, serverData);
});

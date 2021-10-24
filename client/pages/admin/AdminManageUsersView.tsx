import { View } from '@core/View';
import { Fragment, useEffect, useState } from 'react';
import '@client/css/index.css';
import { AdminDashboardTemplateView } from './AdminDashboardTemplateView';
import axios from 'axios';

export const AdminManageUsersView = (props) => {
    enum STATE {
        LOADING,
        IDLE,
        FAIL,
    }

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
    const [status, setStatus] = useState(STATE.LOADING);
    const [query, setQuery] = useState('');
    const [queryStatus, setQueryStatus] = useState(STATE.LOADING);

    useEffect(() => {
        props.init();
        axios
            .get('/admin/list_users')
            .then((response: any) => {
                const { data } = response;
                setUsers(data);
                setStatus(STATE.IDLE);
            })
            .catch((err) => {
                setStatus(STATE.FAIL);
                console.log(err);
            });
    }, [props]);

    const renderUsers = () => {
        if (status === STATE.LOADING) {
            return <h1>Loading</h1>;
        } else if (status === STATE.IDLE) {
            return users.map((user: any) => {
                return (
                    <Fragment key={user.username}>
                        <div
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0 '
                            }
                        >
                            <div className={'flex flex-row w-8/12'}>
                                <div className={'m-5'}>{user.username}</div>
                                <div className={'m-5'}>{user.email}</div>
                            </div>
                            <div className={'w-4/12'}>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className={'flex items-center justify-center w-16 h-8 p-2 text-white bg-red-500'}
                                >
                                    delete
                                </button>
                            </div>
                        </div>
                    </Fragment>
                );
            });
        } else {
            return <h1>FAIL</h1>;
        }
    };

    const renderSearch = () => {
        if (status === STATE.LOADING) {
            return <h1>Loading</h1>;
        } else if (queryStatus === STATE.IDLE) {
            return search.map((user: any) => {
                return (
                    <Fragment key={user.username}>
                        <div
                            className={
                                'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0 '
                            }
                        >
                            <div className={'flex flex-row w-8/12'}>
                                <div className={'m-5'}>{user.username}</div>
                                <div className={'m-5'}>{user.email}</div>
                            </div>
                            <div className={'w-4/12'}>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className={'flex items-center justify-center w-16 h-8 p-2 text-white bg-red-500'}
                                >
                                    delete
                                </button>
                            </div>
                        </div>
                    </Fragment>
                );
            });
        } else {
            return <h1>FAIL</h1>;
        }
    };

    const handleDelete = async (_id: number) => {
        const response = await axios.post(`/admin/delete_user/${_id}`);
        console.log(response.data);
    };

    const handleSearch = async () => {
        try {
            const response: any = await axios.post(`/admin/search_user/${query}`);
            setSearch(response.data);
            setQueryStatus(STATE.IDLE);
        } catch (error) {
            setQueryStatus(STATE.FAIL);
        }
    };

    return (
        <AdminDashboardTemplateView select={'manage_users'}>
            <div className={'flex flex-col w-full h-auto'}>
                <div className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>جست و جو</div>
                <div
                    className={
                        'flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0'
                    }
                >
                    <input
                        required
                        onChange={(event) => setQuery(event.target.value)}
                        className={'w-8/12 ml-5 text-sm text-center border shadow-sm h-9 bg-gray-50'}
                        type="text"
                        placeholder={'نام کاربری | ایمیل | شماره موبایل'}
                    />
                    <div className={'w-4/12'}>
                        <button
                            onClick={handleSearch}
                            className={
                                'flex items-center text-xs pl-4 pr-4 text-center text-gray-500 shadow-sm bg-white border h-9 '
                            }
                        >
                            جست و جو
                        </button>
                    </div>
                </div>
                <div className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>
                    نتیجه جست و جو
                </div>
                {search.length > 0 ? (
                    renderSearch()
                ) : (
                    <div
                        className={
                            'flex w-full items-center justify-center text-center  h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0 '
                        }
                    >
                        <div className={'flex items-center justify-center w-6/12 h-12 '}>نتیجه ای یافت نشد</div>
                    </div>
                )}
                <div className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>کاربران</div>
                {renderUsers()}
            </div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminManageUsersView, serverData);
});

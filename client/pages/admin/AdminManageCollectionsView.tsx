import { View } from "@core/View";
import React, { Fragment, useEffect, useState } from "react";
import { AdminDashboardTemplateView } from "./AdminDashboardTemplateView";
import { isoCountries } from "@core/utility/useCountry";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import { GiftCard } from "@client/components/GiftCard";
import { GiftSeprator } from "@client/components/GiftSeprator";

export const AdminManageCollectionsView = ({ collectionsWithGifts, collections, gifts }) => {
    enum STATE {
        LOADING,
        IDLE,
        FAIL,
    }

    const [collectionArray, setCollectionArray] = useState<any>([]);
    const [status, setStatus] = useState(STATE.LOADING);
    const [select, setSelect] = useState("US");
    const [updateSelect, setUpdateSelect] = useState("US");
    const [updateID, setUpdateID] = useState(-1);

    useEffect(() => {
        axios.get("/admin/get_collections").then((response) => {
            const cols: any = response.data;
            setCollectionArray(cols);
            setStatus(STATE.IDLE);
        });
    }, [collections]);

    const renderCountry = () => {
        return Object.keys(isoCountries).map((key, index) => {
            return (
                <option key={key} value={key}>
                    {isoCountries[key]}
                </option>
            );
        });
    };

    const renderUpdateUi = (index, id) => {
        return (
            <div
                className={
                    "flex flex-col items-center justify-start  w-full h-auto   bg-gray-50  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0"
                }
            >
                <div className={"flex items-center w-full h-12 p-4 text-sm text-gray-500 "}>فرم ویرایش</div>
                <form className={"flex flex-row w-full p-4"} action={`/admin/update_collection/${id}`} method='post'>
                    <input
                        name={"title"}
                        className={"w-4/12 text-sm text-center bg-white border"}
                        type='text'
                        defaultValue={collectionArray[index].title}
                        placeholder={"عنوان کالکشن"}
                    />
                    <select
                        name={"country"}
                        defaultValue={collectionArray[index].country}
                        onChange={(event) => setUpdateSelect(event.target.value)}
                        className={"w-4/12 mr-5 text-center bg-white border"}
                    >
                        {renderCountry()}
                    </select>
                    <div className={"flex items-center justify-center w-2/12 mr-5"}>
                        <ReactCountryFlag
                            className={"p-1 "}
                            svg
                            style={{
                                width: "2em",
                                height: "2em",
                            }}
                            title={updateSelect}
                            countryCode={updateSelect}
                        />
                    </div>
                    <button
                        type={"submit"}
                        className={
                            "w-2/12 ml-5 text-sm text-center text-blue-500 bg-white border rounded-sm shadow-sm h-9"
                        }
                    >
                        ثبت تغییرات
                    </button>
                </form>
            </div>
        );
    };

    const renderGifts = (collection) => {
        return (
            collection &&
            collection.gifts.map((gift, index) => {
                return (
                    <div key={gift.title + index} className={"flex flex-col w-1/5 mt-5 mr-10"}>
                        <GiftCard
                            key={gift.price + index}
                            selected={false}
                            className={` w-full  hover:cursor-pointer`}
                            type={gift.type}
                            label={gift.label}
                            price={gift.price + "$"}
                            alter_price={gift.price * gift.currency}
                        />
                        <form action={`/admin/delete_gift_from_collection/${gift.id}`} method='post'>
                            <button className={"w-full h-12 bg-red-100 hover:bg-red-200"}>حذف</button>
                        </form>
                    </div>
                );
            })
        );
    };

    const renderCollectionsWithGifts = () => {
        return (
            collectionsWithGifts &&
            collectionsWithGifts.map((collection, index) => {
                return (
                    <section key={collection.id * index} className={"flex flex-col flex-wrap w-full"} dir={"rtl"}>
                        <GiftSeprator title={collection.title} country={collection.country} />
                        <div className={"flex flex-row flex-wrap w-full mr-10 content-evenly"}>
                            {renderGifts(collection)}
                        </div>
                    </section>
                );
            })
        );
    };

    const renderCollections = () => {
        if (status === STATE.LOADING) {
            return <h1>LOADING</h1>;
        } else if (status === STATE.IDLE) {
            return collectionArray.map((collection: any, index: any) => {
                return (
                    <Fragment>
                        <div
                            className={
                                "flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0"
                            }
                        >
                            <div className={"w-8/12"}>{collection.title}</div>
                            <div className={"flex items-center justify-center w-2/12"}>
                                <ReactCountryFlag
                                    className={"p-1 "}
                                    svg
                                    style={{
                                        width: "2em",
                                        height: "2em",
                                    }}
                                    title={collection.country}
                                    countryCode={collection.country}
                                />
                            </div>
                            <div className={"flex flex-row w-2/12"}>
                                <form
                                    className={
                                        "w-auto  ml-5 text-sm text-center bg-white text-red-500 border rounded-sm shadow-sm h-auto"
                                    }
                                    method={"post"}
                                    action={`/admin/delete_collection/${collection.id}`}
                                >
                                    <button
                                        className={"flex items-center justify-center w-12 text-center h-9"}
                                        type={"submit"}
                                    >
                                        حذف
                                    </button>
                                </form>
                                <button
                                    onClick={() => setUpdateID(index)}
                                    className={
                                        "w-1/2 ml-5 text-sm text-center bg-white text-yellow-600 border rounded-sm shadow-sm h-9"
                                    }
                                >
                                    ویرایش
                                </button>
                            </div>
                        </div>
                        {updateID === index ? renderUpdateUi(index, collection.id) : null}
                    </Fragment>
                );
            });
        } else {
            return <h1>FAIL</h1>;
        }
    };

    const renderCollectionOptions = () => {
        return collections.map((collection: any, index: any) => {
            return (
                <option key={collection.id + collection.title + index} value={collection.id}>
                    {collection.title}
                </option>
            );
        });
    };

    const renderGiftOptions = () => {
        return gifts.map((gift: any, index) => {
            return (
                <option key={gift.id + gift.label + index} value={gift.id}>
                    {gift.label + " " + gift.price + "$"}
                </option>
            );
        });
    };

    const handleSelect = (event) => {
        setSelect(event.target.value);
    };

    return (
        <AdminDashboardTemplateView select={"manage_collections"}>
            <div className={"flex flex-col w-full h-auto"}>
                <div className={"flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50"}>
                    افزودن کالکشن
                </div>
                <div
                    className={
                        "flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0"
                    }
                >
                    <form className={"flex flex-row w-full"} action='/admin/add_collection' method='post'>
                        <input
                            name={"title"}
                            className={"w-4/12 text-sm text-center border bg-gray-50"}
                            type='text'
                            placeholder={"عنوان کالکشن"}
                        />
                        <select
                            name={"country"}
                            defaultValue={"US"}
                            onChange={handleSelect}
                            className={"w-4/12 mr-5 text-center border bg-gray-50"}
                        >
                            {renderCountry()}
                        </select>
                        <div className={"flex items-center justify-center w-2/12 mr-5"}>
                            <ReactCountryFlag
                                className={"p-1 "}
                                svg
                                style={{
                                    width: "2em",
                                    height: "2em",
                                }}
                                title={select}
                                countryCode={select}
                            />
                        </div>
                        <button
                            className={
                                "w-2/12 ml-5 text-sm text-center bg-white text-blue-500 h-9 border rounded-sm shadow-sm"
                            }
                        >
                            افزودن
                        </button>
                    </form>
                </div>
                <div className={"flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50"}>کالکشن ها</div>
                {renderCollections()}
                <div className={"flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50"}>گیفت کالکشن</div>
                <div
                    className={
                        "flex items-center justify-start  w-full h-12 p-4 bg-white  text-gray-600 text-base font-semibold border border-l-0 border-r-0 border-t-0"
                    }
                >
                    <form className={"flex flex-row w-full"} action='/admin/assign_gift' method='post'>
                        <select
                            name={"collectionID"}
                            onChange={handleSelect}
                            className={"w-4/12 text-center border bg-gray-50"}
                        >
                            {renderCollectionOptions()}
                        </select>
                        <select
                            name={"giftID"}
                            onChange={handleSelect}
                            className={"w-4/12 mr-5 text-center border bg-gray-50"}
                        >
                            {renderGiftOptions()}
                        </select>
                        <div className={"w-2/12"}></div>
                        <button
                            className={
                                "w-2/12 ml-5  text-sm text-center bg-white text-blue-500 h-9 border rounded-sm shadow-sm"
                            }
                        >
                            افزودن
                        </button>
                    </form>
                </div>
                <div className={"flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50"}>گیفت کالکشن</div>
                {renderCollectionsWithGifts()}
            </div>
        </AdminDashboardTemplateView>
    );
};

View.get().then((serverData) => {
    View.render(AdminManageCollectionsView, serverData);
});

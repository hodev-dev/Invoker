import { View } from '@core/View';
import { useEffect, useState } from 'react';
import { IoBagCheckOutline } from 'react-icons/io5';
import { GiftCard } from '../../components/GiftCard';
import { GiftSeprator } from '../../components/GiftSeprator';
import { addCommas, digitsEnToFa, numberToWords } from '@persian-tools/persian-tools';
import ReactCountryFlag from 'react-country-flag';
import { getCountryName, isoCountries } from '@core/utility/useCountry';

export const Landing = ({ isLoggedIn, isAdmin, collectionsWithGifts }) => {
    const [Image, setImage] = useState('');
    const [select, setSelect] = useState(99999999);
    const [collectionID, setCollectionID] = useState(99999999);
    const [count, setCount] = useState(1);
    const [product, setProduct] = useState('');
    const [region, setRegion] = useState('');
    const [priceNumber, setPriceNumber] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    useEffect(() => {
        var canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 30;
        var ctx: any = canvas.getContext('2d');
        ctx.font = '1.25rem Arial';
        ctx.fillStyle = '#00FF';
        var text = randomBetween(999, 99999);
        ctx.fillText(text.toString(), 70, 22, 200);
        var img: any = document.createElement('img');
        img.src = canvas.toDataURL();
        setImage(img.src);
    }, []);

    useEffect(() => {
        setFinalPrice(count * priceNumber);
    }, [count]);

    const randomBetween = (min, max) => {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const handleSelectGift = (gift, collection, index) => {
        setProduct(gift.label + ' ' + gift.price + '$');
        setRegion(collection.country);
        setPriceNumber(gift.price * gift.currency);
        setFinalPrice(count * gift.price * gift.currency);
        setSelect(index);
        setCollectionID(collection.id);
    };

    const handleOption = (event) => {
        setCount(event.target.value);
    };

    const renderMenu = () => {
        if (isLoggedIn) {
            return (
                <>
                    <li className={'ml-5'}>
                        {isAdmin ? <a href="/admin">Dashboard</a> : <a href="/user">Dashboard</a>}
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li className={'ml-5'}>
                        <a href="/login">ورود</a>
                    </li>
                    <li className={'ml-5'}>
                        <a href="/regester">ثبت نام</a>
                    </li>
                </>
            );
        }
    };

    const renderGifts = (collection) => {
        return collection.gifts.map((gift, index) => {
            return (
                <GiftCard
                    onClick={() => handleSelectGift(gift, collection, index)}
                    key={collection.title + gift.price + index}
                    selected={select === index && collection.id === collectionID}
                    className={`mt-5 mr-10 hover:ring-4 hover:ring-black hover:cursor-pointer`}
                    type={gift.type}
                    label={gift.label}
                    price={gift.price + '$'}
                    alter_price={gift.price * gift.currency}
                />
            );
        });
    };

    const renderCollectionsWithGifts = () => {
        return collectionsWithGifts.map((collection, index) => {
            return (
                <section key={collection.title + collection.id * index} className={'flex flex-col flex-wrap'} dir={'rtl'}>
                    <GiftSeprator title={collection.title} country={collection.country} />
                    <div className={'flex flex-row flex-wrap w-full'}>{renderGifts(collection)}</div>
                </section>
            );
        });
    };
    return (
        <div className={'w-full min-h-screen bg-gray-50 font-shabnam'} suppressHydrationWarning={true}>
            <header>
                <nav className={'w-full bg-white shadow-sm'}>
                    <ul className={'flex flex-row items-center w-6/12 h-16'}>{renderMenu()}</ul>
                </nav>
            </header>
            <main className={'flex flex-col w-full h-auto'}>
                <section>{renderCollectionsWithGifts()}</section>
                <section className={'flex flex-row items-center w-full h-10 mt-5'} dir={'rtl'}>
                    <IoBagCheckOutline size={28} className={'text-lg font-medium text-blue-700 fill-current mr-14'} />
                    <h1 className={'mr-5 font-medium text-gray-700 text-md'}>{'پرداخت هزینه'}</h1>
                </section>
                <section className={'flex flex-row justify-center w-full content-evenly'}>
                    <div className={'flex flex-row w-full h-auto p-4 m-12 mt-5 bg-white border divide-x-2 rounded-xl'}>
                        <div className={'w-6/12 h-64'}></div>
                        <div className={'flex flex-col w-6/12 h-auto '} dir={'rtl'}>
                            <div className={'flex items-center w-full h-8'}>
                                <h1 className={'w-4/12 text-gray-500'}>تعداد</h1>
                                <select
                                    onChange={handleOption}
                                    className={'flex items-center justify-center w-8/12 h-10 ml-10 border bg-gray-50 '}
                                    name="count"
                                    id=""
                                >
                                    <option className={'h-10 p-2 text-lg text-center'} value="1">
                                        1
                                    </option>
                                    <option className={'h-10 p-2 text-lg text-center'} value="2">
                                        2
                                    </option>
                                    <option className={'h-10 p-2 text-lg text-center'} value="3">
                                        3
                                    </option>
                                    <option className={'h-10 p-2 text-lg text-center'} value="4">
                                        4
                                    </option>
                                    <option className={'h-10 p-2 text-lg text-center'} value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                            <div className={'flex items-center w-full h-10 mt-5 '}>
                                <h1 className={'w-4/12 text-gray-500'}>نام محصول</h1>
                                <div
                                    className={
                                        ' flex justify-center items-center w-8/12 h-10 ml-10 text-center leading-none bg-gray-100 border'
                                    }
                                    id="count"
                                >
                                    {product}
                                </div>
                            </div>
                            <div className={'flex items-center justify-center w-full h-10 mt-5 '}>
                                <h1 className={'w-4/12 text-gray-500'}>ریجن محصول</h1>
                                <div
                                    className={
                                        'flex justify-center items-center  w-8/12 h-10 ml-10 text-center bg-gray-100 border'
                                    }
                                    id="count"
                                >
                                    {region !== '' ? (
                                        <ReactCountryFlag
                                            className={'p-1 ml-2'}
                                            svg
                                            style={{
                                                width: '2em',
                                                height: '2em',
                                            }}
                                            title={region}
                                            countryCode={region}
                                        />
                                    ) : (
                                        ''
                                    )}

                                    {getCountryName(region)}
                                </div>
                            </div>
                            <div className={'flex items-center w-full h-10 mt-5 '}>
                                <h1 className={'w-4/12 text-gray-500'}>قیمت به عدد</h1>
                                <div
                                    className={
                                        'flex justify-center items-center  w-8/12 h-10 ml-10 text-center bg-gray-100 border'
                                    }
                                    id="count"
                                >
                                    {digitsEnToFa(addCommas(finalPrice)) + ' ' + 'تومان'}
                                </div>
                            </div>
                            <div className={'flex items-center w-full h-10 mt-5'}>
                                <h1 className={'w-4/12 text-gray-500'}>قیمت به حروف</h1>
                                <div
                                    className={
                                        'flex justify-center items-center w-8/12 h-10 ml-10 text-center bg-gray-100 border'
                                    }
                                    id="count"
                                >
                                    {numberToWords(finalPrice) + ' ' + 'تومان'}
                                </div>
                            </div>
                            <div className={'flex items-center w-full h-16 mt-5'}>
                                <h1 className={'w-4/12 text-gray-500'}>کد امنیتی</h1>
                                <img className={'w-8/12 h-16 ml-10 text-center bg-white border'} src={Image} alt="" />
                            </div>
                            <div className={'flex items-center w-full h-10 mt-5'}>
                                <h1 className={'w-4/12 text-gray-500'}></h1>
                                <input
                                    className={
                                        ' flex justify-center font-semibold items-center w-8/12 h-10 p-2  ml-10 text-sm text-center rounded-lg  border'
                                    }
                                    type="text"
                                    name="count"
                                    id="count"
                                    placeholder={'کد امنیتی'}
                                />
                            </div>
                            <div className={'flex items-center w-full h-10 mt-5'}>
                                <h1 className={'w-4/12 text-gray-500'}></h1>
                                <input
                                    className={
                                        ' flex justify-center font-semibold items-center w-8/12 h-10 p-2  ml-10 text-sm text-center rounded-lg text-white bg-green-500 border'
                                    }
                                    type="submit"
                                    name="count"
                                    id="count"
                                    value={'پرداخت'}
                                    placeholder={'پرداخت نهایی'}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <ul className={'w-full h-16 mt-10'} dir={'rtl'}>
                    <li></li>
                </ul>
            </footer>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(Landing, serverData);
});

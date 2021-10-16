import { View } from '@core/View';
import { GiftCard } from './GiftCard';
import { GiftSeprator } from './GiftSeprator';

export const Landing = ({ isLoggedIn, collectionsWithGifts }) => {
    const renderMenu = () => {
        if (isLoggedIn) {
            return (
                <>
                    <li className={'ml-5'}>
                        <a href="/user">Dashboard</a>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li className={'ml-5'}>
                        <a href="/login">Login</a>
                    </li>
                    <li className={'ml-5'}>
                        <a href="/regester">Regester</a>
                    </li>
                </>
            );
        }
    };

    const renderGifts = (collection) => {
        return collection.gifts.map((gift, index) => {
            return (
                <GiftCard
                    className={'mt-5 mr-10 hover:ring-4 hover:ring-black hover:cursor-pointer'}
                    type={gift.type}
                    label={gift.label}
                    price={gift.price + '$'}
                    alter_price={gift.price * gift.currency}
                />
            );
        });
    };

    const renderCollectionsWithGifts = () => {
        return collectionsWithGifts.map((collection) => {
            return (
                <section className={'flex flex-col flex-wrap'} dir={'rtl'}>
                    <GiftSeprator title={collection.title} />
                    <div className={'flex flex-row flex-wrap w-full'}>{renderGifts(collection)}</div>
                </section>
            );
        });
    };
    return (
        <div className={'w-full min-h-screen bg-gray-50'} suppressHydrationWarning={true}>
            <header>
                <nav className={'w-full bg-white shadow'}>
                    <ul className={'flex flex-row items-center w-6/12 h-16'}>{renderMenu()}</ul>
                </nav>
            </header>
            <main className={'flex flex-col w-full h-auto'}>{renderCollectionsWithGifts()}</main>
            <footer>
                <div className={'w-full h-16 mt-10'}></div>
            </footer>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(Landing, serverData);
});

import { View } from '@core/View';
import { GiftCard } from './GiftCard';
import { GiftSeprator } from './GiftSeprator';

export const Landing = ({ isLoggedIn }) => {
    console.log(isLoggedIn);

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
    return (
        <div className={'w-full min-h-screen bg-gray-50'} suppressHydrationWarning={true}>
            <header>
                <nav className={'w-full bg-white shadow'}>
                    <ul className={'flex flex-row items-center w-6/12 h-16'}>{renderMenu()}</ul>
                </nav>
            </header>
            <main className={'w-full h-auto'}>
                <GiftSeprator title={'گیفت کارت های اپل'} />
                <article className={'flex flex-wrap w-full justify-evenly '} dir={'rtl'}>
                    <GiftCard
                        className={''}
                        type={'Apple'}
                        label={'Apple Gift Card'}
                        price={'5$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Apple'}
                        label={'Apple Gift Card'}
                        price={'10$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Apple'}
                        label={'Apple Gift Card'}
                        price={'15$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Apple'}
                        label={'Apple Gift Card'}
                        price={'25$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Apple'}
                        label={'Apple Gift Card'}
                        price={'50$'}
                        alter_price={'27000'}
                    />
                </article>
                <GiftSeprator title={'گیفت کارت های استیم'} />
                <article className={'flex flex-wrap w-full justify-evenly '} dir={'rtl'}>
                    <GiftCard
                        className={''}
                        type={'Steam'}
                        label={'Steam Gift Card'}
                        price={'5$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Steam'}
                        label={'Steam Gift Card'}
                        price={'10$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Steam'}
                        label={'Steam Gift Card'}
                        price={'15$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Steam'}
                        label={'Steam Gift Card'}
                        price={'25$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Steam'}
                        label={'Steam Gift Card'}
                        price={'50$'}
                        alter_price={'27000'}
                    />
                </article>
                <GiftSeprator title={'گیفت کارت های پلی استیشن'} />
                <article className={'flex flex-wrap w-full justify-evenly '} dir={'rtl'}>
                    <GiftCard
                        className={''}
                        type={'PlayStation'}
                        label={'PlayStation Gift Card'}
                        price={'5$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'PlayStation'}
                        label={'PlayStation Gift Card'}
                        price={'10$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'PlayStation'}
                        label={'PlayStation Gift Card'}
                        price={'15$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'PlayStation'}
                        label={'PlayStation Gift Card'}
                        price={'25$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'PlayStation'}
                        label={'PlayStation Gift Card'}
                        price={'50$'}
                        alter_price={'27000'}
                    />
                </article>
                <GiftSeprator title={'گیفت کارت های اسپاتیفای'} />
                <article className={'flex flex-wrap w-full justify-evenly '} dir={'rtl'}>
                    <GiftCard
                        className={''}
                        type={'Spotify'}
                        label={'Spotify Gift Card'}
                        price={'5$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Spotify'}
                        label={'Spotify Gift Card'}
                        price={'10$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Spotify'}
                        label={'Spotify Gift Card'}
                        price={'15$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Spotify'}
                        label={'Spotify Gift Card'}
                        price={'25$'}
                        alter_price={'27000'}
                    />
                    <GiftCard
                        className={''}
                        type={'Spotify'}
                        label={'Steam Gift Card'}
                        price={'50$'}
                        alter_price={'27000'}
                    />
                </article>
            </main>
        </div>
    );
};

View.get().then((serverData) => {
    View.render(Landing, serverData);
});

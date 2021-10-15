import { FaApple, FaPlaystation, FaSpotify, FaSteam } from 'react-icons/fa';

export const GiftCard = (props) => {
    const renderLogo = () => {
        switch (props.type) {
            case 'Apple':
                return <FaApple size={64} className={'mt-5 text-gray-700 fill-current'} />;
            case 'Steam':
                return <FaSteam size={64} className={'mt-5 text-indigo-800 fill-current'} />;
            case 'Spotify':
                return <FaSpotify size={64} className={'mt-5 text-green-400 fill-current'} />;
            case 'PlayStation':
                return <FaPlaystation size={64} className={'mt-5 text-blue-700 fill-current'} />;
            default:
                return <h1>test</h1>;
        }
    };
    return (
        <section
            suppressHydrationWarning={true}
            className={'flex flex-col items-center w-1/6 bg-white rounded-lg shadow-lg h-72' + ' ' + props.className}
        >
            {renderLogo()}
            <h1 className={'mt-5 text-xl font-semibold'}>{props.label}</h1>
            <h1 className={'mt-5 text-4xl font-semibold'}>{props.price}</h1>
            <h1 className={'mt-5 text-2xl font-semibold text-green-500'}>{props.alter_price}</h1>
        </section>
    );
};

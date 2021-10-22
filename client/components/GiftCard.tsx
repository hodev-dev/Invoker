import { FaApple, FaPlaystation, FaSpotify, FaSteam } from 'react-icons/fa';
import { addCommas, digitsEnToFa, numberToWords } from '@persian-tools/persian-tools';

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
            {...props}
            suppressHydrationWarning={true}
            className={
                `flex flex-col items-center w-1/6 bg-white rounded-lg shadow-xl h-80 ${
                    props.selected ? 'ring-4 ring-black' : ''
                }` +
                ' ' +
                props.className
            }
        >
            {renderLogo()}
            <h1 className={'mt-5 text-xl font-semibold'}>{props.label}</h1>
            <h1 className={'mt-5 text-4xl font-semibold'}>{props.price}</h1>
            <h1 className={'mt-5 text-xl font-semibold text-center text-green-600 '}>
                {digitsEnToFa(addCommas(props.alter_price)) + ' ' + 'تومان'}
            </h1>
            <h1 className={'mt-5 text-xs font-medium text-center text-gray-500'}>
                {numberToWords(props.alter_price) + ' ' + 'تومان'}
            </h1>
        </section>
    );
};

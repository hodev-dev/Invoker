import ReactCountryFlag from 'react-country-flag';

export const GiftSeprator = (props) => {
    return (
        <div>
            <section className={'flex flex-row items-center w-full h-10 mt-5'} dir={'rtl'}>
                <ReactCountryFlag
                    className={'p-1 mr-12 '}
                    svg
                    style={{
                        width: '2em',
                        height: '2em',
                    }}
                    title="US"
                    countryCode="US"
                />
                <h1 className={'mr-5 text-lg font-medium'}>{props.title}</h1>
            </section>
        </div>
    );
};
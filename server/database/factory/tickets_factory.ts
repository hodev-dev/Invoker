import faker from 'faker';

let tickets_factory = () => {

    const count = 1000;

    const table = {
        name: 'tickets',
        columns: {
            id: {
                quote: 'none',
                generate: () => {
                    return 'DEFAULT';
                },
            },
            title: {
                quote: 'single',
                generate: () => {
                    return faker.lorem.words();
                },
            },
            status: {
                quote: 'none',
                generate: () => {
                    return faker.datatype.number(999);
                },
            },
        },
    };

    return {
        count,
        table,
    };
};

export default tickets_factory();



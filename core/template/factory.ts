let FACTORY_NAME = () => {

    const count = 100;

    const table = {
        name: 'TABLE',
        columns: {
            id: {
                quote: 'none',
                generate: () => {
                    return 'DEFAULT';
                },
            },
        },
    };

    return {
        count,
        table,
    };
};

export default FACTORY_NAME();



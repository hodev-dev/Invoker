let tests_factory = () => {

    const count = 100;

    const table = {
        name: 'tests',
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

export default tests_factory();



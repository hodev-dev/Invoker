let user_ticket_factory = () => {

    const count = 100;

    const table = {
        name: "user_ticket",
        columns: {
            id: {
                quote: "none",
                generate: () => {
                    return "DEFAULT";
                },
            },
            user_id: {
                quote: "single",
                generate: () => {
                    return Math.floor(Math.random() * 2) + 1;
                },
            },
            ticket_id: {
                quote: "single",
                generate: (index: number) => {
                    return index;
                },
            },
        },
    };

    return {
        count,
        table,
    };
};

export default user_ticket_factory();



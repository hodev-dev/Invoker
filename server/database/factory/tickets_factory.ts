import faker from "faker";

faker.locale = "fa";

let tickets_factory = () => {

    const count = 100;

    const table = {
        name: "tickets",
        columns: {
            id: {
                quote: "none",
                generate: () => {
                    return "DEFAULT";
                },
            },
            title: {
                quote: "single",
                generate: () => {
                    return faker.lorem.words();
                },
            },
            status: {
                quote: "none",
                generate: () => {
                    return Math.floor(Math.random() * 3) + 1;
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



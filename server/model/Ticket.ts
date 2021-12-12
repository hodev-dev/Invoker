import Database from "@config/database";
import useRawQuery from "@core/database/query/useRawQuery";

let Ticket = () => {
    const [pg] = Database();
    const rawQuery = useRawQuery();

    const userWithTicket = async () => {
        try {
            const sql = await rawQuery.get(["ticket", "get"], "user_with_ticket");
            return await pg.query(sql);
        } catch (error) {
            console.log({ error });
        }
    };

    return {
        userWithTicket,
    };
};

export default Ticket;

import useRawQuery from "@core/database/query/useRawQuery";
import Database from "@config/database";

const [pg] = Database();

const User = () => {
    const rawQuery = useRawQuery();

    const findById = async () => {
        try {
            const queryString = await rawQuery.get("FindUserById");
            const results = await pg.query({
                name: "FindUserById",
                text: queryString,
                values: [1],
            });
            return results.rows[0];
        } catch (error) {
            console.log({ error });
        }
    };
    const exists = async (phone: number) => {
        try {
            const queryString = await rawQuery.get("UserExists");
            const results = await pg.query({
                name: "UserExists",
                text: queryString,
                values: [phone],
            });
            if (results.rowCount === 0) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        } finally {
            await pg.end();
        }
    };

    const update_password = async (phone: number, password: string) => {
        try {
            const queryString = await rawQuery.get("UpdatePassword");
            const results = await pg.query({
                name: "UpdatePassword",
                text: queryString,
                values: [phone, password],
            });
            if (results.rowCount === 0) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            await pg.end();
        }
    };

    const findUserByEmailPassword = async (username, password) => {
        try {
            const queryString = await rawQuery.get("FindUserByEmailPassword");
            const results = await pg.query({
                name: "FindByUsernamePassword",
                text: queryString,
                values: [username, password],
            });
            return results.rows[0];
        } catch (error) {
            return false;
            console.log({ error });
        } finally {
            await pg.end();
        }
    };
    const findUserWithRolePermission = async (phone) => {
        const client = await pg.connect();
        try {
            const queryString = await rawQuery.get("FindUserWIithRolePermissin");
            const results = await client.query(queryString, [phone]);
            return results.rows[0];
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await client.release();
        }
    };
    const getAllAdminUsers = async () => {
        const client = await pg.connect();
        try {
            const queryString = await rawQuery.get("GetAllAdminUsers");
            const results = await client.query(queryString);
            return results.rows;
        } catch (error) {
            return false;
        } finally {
            await client.release();
        }
    };
    const searchUserByUsernameOrEmail = async (query) => {
        const client = await pg.connect();
        try {
            const queryString = await rawQuery.get("SearchUserByUsernameOrEmail");
            const results = await client.query(queryString, [query]);
            return results.rows;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            await client.release();
        }
    };
    const insertUser = async (username, email, password) => {
        const client = await pg.connect();
        try {
            const queryString = await rawQuery.get("InsertUsers");
            const results = await client.query(queryString, [username, email, password]);
            return results.rows[0];
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await client.release();
        }
    };
    const assignRole = async (userID, roleID) => {
        const client = await pg.connect();
        try {
            const queryString = await rawQuery.get("AssignRole");
            const results = await client.query(queryString, [userID, roleID]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            await client.end();
        }
    };
    const insertUserAndAssignRole = async (phone, password, roleID) => {
        const client = await pg.connect();
        try {
            await pg.query("BEGIN");
            const insertQuery = await rawQuery.get("InsertUsers");
            const insertResult = await client.query({
                name: "InsertUsers",
                text: insertQuery,
                values: [phone, password],
            });
            const insert = insertResult.rows[0];
            const assignUserQuery = await rawQuery.get("AssignRole");
            const AssignQueryResult = await client.query(assignUserQuery, [insert.id, roleID]);
            await client.query("COMMIT");
            return true;
        } catch (error) {
            await client.query("ROLLBACK");
            console.log(error);
            return false;
        } finally {
            await client.release();
        }
    };
    const getCollectionWithGifts = async () => {
        const client = await pg.connect();
        try {
            const queryString = await rawQuery.get("GetCollectionWithGifts");
            const results = await client.query(queryString);
            return results.rows;
        } catch (error) {
            return false;
        } finally {
            await client.release();
        }
    };

    const confirm = async (userID) => {
        const client = await pg.connect();
        try {
            const queryString = await rawQuery.get("ConfirmUser");
            const results = await client.query(queryString, [userID]);
            return results.rows;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await client.release();
        }
    };

    const tickets = async (id: number, offset: number, per_page: number) => {
        const client = await pg.connect();
        try {
            const sql = await rawQuery.get(["user", "get"], "tickets");
            const result = await client.query(sql, [id, offset, per_page]);
            return result.rows[0];
        } catch (error) {
            console.log({ error });
        } finally {
            await client.release();
        }
    };

    return {
        findById,
        exists,
        findUserByEmailPassword,
        findUserWithRolePermission,
        assignRole,
        insertUser,
        insertUserAndAssignRole,
        getCollectionWithGifts,
        getAllAdminUsers,
        searchUserByUsernameOrEmail,
        confirm,
        update_password,
        tickets,
    };
};

export { User };

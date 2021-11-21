import useDatabase from '@config/database';
import useRawQuery from '@core/database/query/useRawQuery';

var User = () => {
    const [pg] = useDatabase();
    const rawQuery = useRawQuery();

    const findById = async () => {
        try {
            const queryRaw = await rawQuery.get('FindUserById');
            const results = await pg.query({
                name: 'FindUserById',
                text: queryRaw,
                values: [1],
            });
            return results.rows[0];
        } catch (error) {
            console.log({ error });
        }
    };
    const exists = async (phone: number) => {
        try {
            const queryRaw = await rawQuery.get('UserExists');
            const results = await pg.query({
                name: 'UserExists',
                text: queryRaw,
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
            const queryRaw = await rawQuery.get('UpdatePassword');
            const results = await pg.query({
                name: 'UpdatePassword',
                text: queryRaw,
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
            const queryRaw = await rawQuery.get('FindUserByEmailPassword');
            const results = await pg.query({
                name: 'FindByUsernamePassword',
                text: queryRaw,
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
        try {
            const queryRaw = await rawQuery.get('FindUserWIithRolePermissin');
            const results = await pg.query({
                name: 'FindUserWIithRolePermissin',
                text: queryRaw,
                values: [phone],
            });
            return results.rows[0];
        } catch (error) {
            return false;
            console.log({ error });
        } finally {
            await pg.end();
        }
    };
    const getAllAdminUsers = async () => {
        try {
            const queryRaw = await rawQuery.get('GetAllAdminUsers');
            const results = await pg.query({
                name: 'GetAllAdminUsers',
                text: queryRaw,
                values: [],
            });
            return results.rows;
        } catch (error) {
            return false;
        } finally {
            await pg.end();
        }
    };
    const searchUserByUsernameOrEmail = async (query) => {
        try {
            const queryRaw = await rawQuery.get('SearchUserByUsernameOrEmail');
            const results = await pg.query({
                name: 'SearchUserByUsernameOrEmail',
                text: queryRaw,
                values: [query],
            });
            return results.rows;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            await pg.end();
        }
    };
    const insertUser = async (username, email, password) => {
        try {
            const queryRaw = await rawQuery.get('InsertUsers');
            const results = await pg.query({
                name: 'InsertUsers',
                text: queryRaw,
                values: [username, email, password],
            });
            return results.rows[0];
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await pg.end();
        }
    };
    const assignRole = async (userID, roleID) => {
        try {
            const queryRaw = await rawQuery.get('AssignRole');
            const results = await pg.query({
                name: 'AssignRole',
                text: queryRaw,
                values: [userID, roleID],
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            await pg.end();
        }
    };
    const insertUserAndAssignRole = async (phone, password, roleID) => {
        try {
            await pg.query('BEGIN');
            const insertQuery = await rawQuery.get('InsertUsers');
            const insertResult = await pg.query({
                name: 'InsertUsers',
                text: insertQuery,
                values: [phone, password],
            });
            const insert = insertResult.rows[0];
            const assignUserQuery = await rawQuery.get('AssignRole');
            const AssignQueryResult = await pg.query({
                name: 'AssignRole',
                text: assignUserQuery,
                values: [insert.id, roleID],
            });
            await pg.query('COMMIT');
            return true;
        } catch (error) {
            await pg.query('ROLLBACK');
            console.log(error);
            return false;
        } finally {
            await pg.end();
        }
    };
    const getCollectionWithGifts = async () => {
        try {
            const queryRaw = await rawQuery.get('GetCollectionWithGifts');
            const results = await pg.query({
                name: 'GetCollectionWithGifts',
                text: queryRaw,
            });
            return results.rows;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await pg.end();
        }
    };

    const confirm = async (userID) => {
        try {
            const queryRaw = await rawQuery.get('ConfirmUser');
            const results = await pg.query({
                name: 'ConfirmUser',
                text: queryRaw,
                values: [userID],
            });
            return results.rows;
        } catch (error) {
            console.log({ error });
            return false;
        } finally {
            await pg.end();
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
        update_password
    };
};

export { User };

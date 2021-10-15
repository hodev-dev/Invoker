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
        }
    };
    const findUserWithRolePermission = async (username) => {
        try {
            const queryRaw = await rawQuery.get('FindUserWIithRolePermissin');
            const results = await pg.query({
                name: 'FindUserWIithRolePermissin',
                text: queryRaw,
                values: [username],
            });
            return results.rows[0];
        } catch (error) {
            return false;
            console.log({ error });
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
        }
    };
    const insertUserAndAssignRole = async (username, email, password, roleID) => {
        try {
            await pg.query('BEGIN');
            const insertQuery = await rawQuery.get('InsertUsers');
            const insertResult = await pg.query({
                name: 'InsertUsers',
                text: insertQuery,
                values: [username, email, password],
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
        }
    };
    return {
        findById,
        findUserByEmailPassword,
        findUserWithRolePermission,
        assignRole,
        insertUser,
        insertUserAndAssignRole,
        getCollectionWithGifts,
    };
};

export { User };

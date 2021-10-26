SELECT *
FROM users
    INNER JOIN user_role ON users.id = user_role.user_id
    AND user_role.role_id = 1;
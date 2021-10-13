SELECT users.id,
    users.username,
    users.email,
    ARRAY_AGG(DISTINCT roles.role_name) as roles,
    ARRAY_AGG(DISTINCT permissions.permission_name) as permissions
FROM users
    INNER JOIN user_role ON users.id = user_role.user_id
    INNER JOIN roles ON roles.id = user_role.role_id
    INNER JOIN role_permission ON roles.id = role_permission.role_id
    INNER JOIN permissions ON permissions.id = role_permission.permission_id
GROUP BY users.id;